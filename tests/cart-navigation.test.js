const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const React = require("react");
const { createRoot } = require("react-dom/client");
const { JSDOM } = require("jsdom");
const { transformSync } = require("next/dist/build/swc");

global.IS_REACT_ACT_ENVIRONMENT = true;
const item = { id: "test", productId: "product", variantId: "variant", name: "Test product", quantity: 1, unitPrice: 200 };
const address = { id: "address", isDefault: true, contactName: "Test", mobileNumber: "01700000000", fullAddress: "Dhaka" };
const stub = () => React.createElement("div", { "data-page-content": true });

async function mount(page, { cart = [], buyNow = null, query = "" } = {}) {
  const dom = new JSDOM('<div id="root"></div>', { url: `http://localhost/${page}${query}` });
  global.window = dom.window;
  global.document = dom.window.document;
  window.localStorage.setItem("pinwheel_delivery_addresses", JSON.stringify([address]));
  const redirects = [], pushes = [], refreshes = [], requests = [];
  let sidebar;
  const router = { replace: (path) => redirects.push(path), push: (path) => pushes.push(path) };
  const utils = {
    cartEventName: "cart:updated",
    readCart: () => cart,
    readBuyNowItem: () => buyNow,
    clearBuyNowItem: () => { buyNow = null; },
    calculateShippingFeeBySeller: () => 0,
    refreshCartShopNames: (items) => new Promise((resolve) => refreshes.push(() => resolve(items.map((entry) => ({ ...entry, shopName: "Updated shop" }))))),
    writeCart: (items) => { cart = items; window.dispatchEvent(new window.Event("cart:updated")); },
  };
  global.fetch = async (_url, options) => {
    requests.push(JSON.parse(options.body));
    return { ok: true, json: async () => ({ order: { _id: "test-order", invoiceAccessToken: "test-token" } }) };
  };
  const source = fs.readFileSync(`app/${page}/page.js`, "utf8");
  const { code } = transformSync(source, {
    filename: `app/${page}/page.js`,
    jsc: { parser: { syntax: "ecmascript", jsx: true }, transform: { react: { runtime: "automatic" } } },
    module: { type: "commonjs" },
  });
  const compiledModule = { exports: {} };
  const mockRequire = (name) => {
    if (name === "next/navigation") return { useRouter: () => router };
    if (name === "@/utils/cart") return utils;
    if (name === "@/utils/payment") return { paymentRequest: async () => ({ bkash: { enabled: false } }), startBkashPayment: () => { throw new Error("Unexpected bKash payment"); } };
    if (name.endsWith("CheckoutSidebar")) return { __esModule: true, default: (props) => { sidebar = props; return stub(); } };
    if (name.startsWith("@/components/")) return { __esModule: true, default: stub };
    return require(name);
  };
  new Function("require", "module", "exports", code)(mockRequire, compiledModule, compiledModule.exports);
  const root = createRoot(document.getElementById("root"));
  await React.act(async () => root.render(React.createElement(compiledModule.exports.default)));
  return {
    redirects, pushes, requests,
    hasContent: () => Boolean(document.querySelector("[data-page-content]")),
    clear: async () => React.act(async () => utils.writeCart([])),
    clearBuyNow: async () => React.act(async () => { buyNow = null; window.dispatchEvent(new window.Event("storage")); }),
    finishRefresh: async () => React.act(async () => refreshes.forEach((resolve) => resolve())),
    submit: async () => React.act(async () => sidebar.onPlaceOrder()),
    close: async () => { await React.act(async () => root.unmount()); dom.window.close(); },
  };
}

test("cart and checkout redirect only when their product selection is empty", async () => {
  for (const page of ["cart", "checkout"]) {
    let view = await mount(page);
    assert.deepEqual(view.redirects, ["/"], `${page}: empty cart redirects home`);
    assert.equal(view.hasContent(), false, `${page}: no empty form flash`);
    await view.close();

    view = await mount(page, { cart: [item] });
    assert.deepEqual(view.redirects, [], `${page}: populated cart stays open`);
    assert.equal(view.hasContent(), true);
    await view.clear();
    assert.deepEqual(view.redirects, ["/"], `${page}: removing last product redirects`);
    await view.finishRefresh();
    assert.equal(view.hasContent(), false, `${page}: delayed refresh cannot restore removed product`);
    await view.close();
  }

  let view = await mount("checkout", { query: "?buyNow=1" });
  assert.deepEqual(view.redirects, ["/"], "missing Buy Now and cart redirects");
  await view.close();

  view = await mount("checkout", { buyNow: item, query: "?buyNow=1" });
  assert.deepEqual(view.redirects, [], "Buy Now works without cart products");
  assert.equal(view.hasContent(), true);
  await view.clear();
  assert.deepEqual(view.redirects, [], "cart changes do not discard Buy Now selection");
  await view.clearBuyNow();
  assert.deepEqual(view.redirects, ["/"], "removing Buy Now selection redirects");
  await view.close();

  view = await mount("checkout", { cart: [item], query: "?buyNow=1" });
  assert.deepEqual(view.redirects, [], "missing Buy Now falls back to populated cart");
  await view.clear();
  assert.deepEqual(view.redirects, ["/"], "fallback cart keeps listening for removal");
  await view.close();

  for (const buyNowCheckout of [false, true]) {
    view = await mount("checkout", buyNowCheckout ? { buyNow: item, query: "?buyNow=1" } : { cart: [item] });
    await view.submit();
    assert.deepEqual(view.redirects, [], "successful order does not redirect home when cart clears");
    assert.deepEqual(view.pushes, ["/order-success"], "successful order reaches confirmation");
    assert.equal(view.requests.length, 1);
    assert.equal(view.requests[0].paymentMethod, "Cash on Delivery");
    await view.close();
  }
});

test("a pending shop refresh cannot put deleted products back into storage", async () => {
  const dom = new JSDOM("", { url: "http://localhost/" });
  global.window = dom.window;
  global.document = dom.window.document;
  global.CustomEvent = dom.window.CustomEvent;
  const { code } = transformSync(fs.readFileSync("utils/cart.js", "utf8"), {
    filename: "utils/cart.js", module: { type: "commonjs" },
  });
  const compiledModule = { exports: {} };
  new Function("module", "exports", code)(compiledModule, compiledModule.exports);
  const utils = compiledModule.exports;
  let finishRequest;
  global.fetch = () => new Promise((resolve) => { finishRequest = () => resolve({ ok: true, json: async () => ({ product: { creator: { _id: "seller", shopName: "Updated shop" } } }) }); });
  utils.writeCart([item]);
  const refresh = utils.refreshCartShopNames(utils.readCart());
  utils.writeCart([]);
  finishRequest();
  await refresh;
  assert.deepEqual(utils.readCart(), []);

  utils.writeCart([item]);
  const currentRefresh = utils.refreshCartShopNames(utils.readCart());
  finishRequest();
  await currentRefresh;
  assert.equal(utils.readCart()[0].shopName, "Updated shop");
  dom.window.close();
});
