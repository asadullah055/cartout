const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const React = require("react");
const { JSDOM } = require("jsdom");
const { createRoot } = require("react-dom/client");
const { renderToStaticMarkup } = require("react-dom/server");
const { transformSync } = require("next/dist/build/swc");

global.IS_REACT_ACT_ENVIRONMENT = true;

function compile(filename, mocks = {}) {
  const { code } = transformSync(fs.readFileSync(filename, "utf8"), {
    filename,
    jsc: { parser: { syntax: "ecmascript", jsx: true }, transform: { react: { runtime: "automatic" } } },
    module: { type: "commonjs" },
  });
  const compiledModule = { exports: {} };
  new Function("require", "module", "exports", code)((name) => mocks[name] || require(name), compiledModule, compiledModule.exports);
  return compiledModule.exports;
}

const ProductCard = ({ product }) => React.createElement("a", { href: `/product/${product.slug}` }, product.productName);
const FeaturedProducts = compile("components/Products/FeaturedProducts.jsx", {
  "./ProductCard": { __esModule: true, default: ProductCard },
}).default;
const product = (id) => ({ _id: id, slug: id, productName: `Product ${id}` });

async function mount(initialData, fetcher) {
  const dom = new JSDOM('<div id="root"></div>', { url: "http://localhost/" });
  global.window = dom.window;
  global.document = dom.window.document;
  const observers = [];
  global.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; this.active = true; observers.push(this); }
    observe() {}
    disconnect() { this.active = false; }
  };
  const requests = [];
  const previousFetch = global.fetch;
  global.fetch = async (url) => { requests.push(url); return fetcher(url); };
  const root = createRoot(document.getElementById("root"));
  await React.act(async () => root.render(React.createElement(FeaturedProducts, { initialData })));
  return {
    requests, observers,
    cards: () => [...document.querySelectorAll('a[href^="/product/"]')],
    loadMore: () => [...document.querySelectorAll("button")].find((button) => button.textContent.includes("Load more")),
    close: async () => {
      await React.act(async () => root.unmount());
      dom.window.close();
      global.fetch = previousFetch;
    },
  };
}

test("initial products are in server HTML and hydration does not request page one or page two", async () => {
  const initialData = { products: [product("one")], totalProducts: 2 };
  const html = renderToStaticMarkup(React.createElement(FeaturedProducts, { initialData }));
  assert.match(html, /href="\/product\/one"/);
  const view = await mount(initialData, () => { throw new Error("Unexpected initial fetch"); });
  try {
    assert.equal(view.cards().length, 1);
    assert.equal(view.requests.length, 0);
    assert.equal(view.observers.length, 0);
  } finally { await view.close(); }
});

test("load more requests page two once, appends cards, and stops at the total", async () => {
  const view = await mount({ products: [product("one")], totalProducts: 2 }, async () => ({
    ok: true, json: async () => ({ products: [product("two")], totalProducts: 2 }),
  }));
  try {
    const button = view.loadMore();
    await React.act(async () => { button.click(); button.click(); });
    assert.deepEqual(view.requests, ["/api/catalog/products?page=2&limit=10"]);
    assert.equal(view.cards().length, 2);
    assert.equal(view.loadMore(), undefined);
  } finally { await view.close(); }
});

test("a failed server fetch falls back to page one and infinite scroll waits for user scroll", async () => {
  const view = await mount(null, async (url) => ({ ok: true, json: async () => ({
    products: [product(url.includes("page=2") ? "two" : "one")], totalProducts: 2,
  }) }));
  try {
    assert.deepEqual(view.requests, ["/api/catalog/products?page=1&limit=10"]);
    assert.equal(view.observers.length, 0);
    await React.act(async () => window.dispatchEvent(new window.Event("scroll")));
    const observer = view.observers.findLast((entry) => entry.active);
    assert.ok(observer);
    await React.act(async () => observer.callback([{ isIntersecting: true }]));
    assert.deepEqual(view.requests, ["/api/catalog/products?page=1&limit=10", "/api/catalog/products?page=2&limit=10"]);
    assert.equal(view.cards().length, 2);
  } finally { await view.close(); }
});

test("responsive thumbnails preserve the original asset and leave local images alone", () => {
  const { productImageUrl, productImageSrcSet } = compile("utils/productImage.js");
  const original = "https://res.cloudinary.com/shop/image/upload/v123/products/item.webp";
  assert.equal(productImageUrl(original, 320), "https://res.cloudinary.com/shop/image/upload/f_auto,q_auto,c_limit,w_320/v123/products/item.webp");
  assert.match(productImageSrcSet(original), /w_160.*160w, .*w_320.*320w, .*w_640.*640w/);
  assert.equal(productImageUrl("/images/001.jpg", 320), "/images/001.jpg");
  assert.equal(productImageSrcSet("/images/001.jpg"), undefined);
});

test("cache revalidation rejects unauthorized and invalid requests before expiring allowed tags", async () => {
  const calls = [];
  const { POST } = compile("app/api/catalog/revalidate/route.js", {
    "next/cache": { revalidateTag: (...args) => calls.push(args) },
  });
  const previous = process.env.CATALOG_REVALIDATE_SECRET;
  const request = (token, tags) => new Request("http://localhost/api/catalog/revalidate", {
    method: "POST", headers: { Authorization: token, "Content-Type": "application/json" }, body: JSON.stringify({ tags }),
  });
  try {
    delete process.env.CATALOG_REVALIDATE_SECRET;
    assert.equal((await POST(request("Bearer undefined", ["catalog-products"]))).status, 401);
    process.env.CATALOG_REVALIDATE_SECRET = "local-cache-test";
    assert.equal((await POST(request("Bearer wrong", ["catalog-products"]))).status, 401);
    assert.equal((await POST(request("Bearer local-cache-test", ["private-data"]))).status, 400);
    assert.equal(calls.length, 0);
    assert.equal((await POST(request("Bearer local-cache-test", ["catalog-products", "catalog-products"]))).status, 200);
    assert.deepEqual(calls, [["catalog-products", { expire: 0 }]]);
  } finally {
    if (previous === undefined) delete process.env.CATALOG_REVALIDATE_SECRET;
    else process.env.CATALOG_REVALIDATE_SECRET = previous;
  }
});
