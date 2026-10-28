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
const ProductResults = compile("components/Products/ProductResults.jsx", {
  "./ProductCard": { __esModule: true, default: ProductCard },
}).default;
const product = (id) => ({ _id: id, slug: id, productName: `Product ${id}` });

async function mount(initialData, fetcher, Component = FeaturedProducts, props = { initialData }) {
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
  await React.act(async () => root.render(React.createElement(Component, props)));
  return {
    requests, observers,
    render: async (nextProps) => React.act(async () => root.render(React.createElement(Component, nextProps))),
    cards: () => [...document.querySelectorAll('a[href^="/product/"]')],
    loadMore: () => [...document.querySelectorAll("button")].find((button) => button.textContent.includes("Load more")),
    close: async () => {
      await React.act(async () => root.unmount());
      dom.window.close();
      global.fetch = previousFetch;
    },
  };
}

for (const filter of ["brand", "seller", "category"]) {
test(`product ${filter} links open the filtered listing and missing details stay unlinked`, async () => {
  const SellerInfo = compile("components/ProductDetails/SellerInfo.jsx").default;
  const ProductsPage = compile("app/products/page.js", {
    "@/components/Products/ProductResults": { __esModule: true, default: ProductResults },
  }).default;
  const detail = { _id: "507f1f77bcf86cd799439011", name: "AI Craft & Decor" };
  const product = filter === "seller"
    ? { creator: { ...detail, name: "Seller Owner", shopName: detail.name } }
    : { [filter]: detail };
  const html = renderToStaticMarkup(React.createElement(SellerInfo, { product }));
  const dom = new JSDOM(html, { url: "http://localhost" });
  try {
    const link = dom.window.document.querySelector('a[href^="/products?"]');
    assert.ok(link);
    const params = new URL(link.href).searchParams;
    assert.equal(params.get(filter), detail._id);
    assert.equal(params.get(`${filter}Name`), detail.name);
    const page = await ProductsPage({ searchParams: Promise.resolve(Object.fromEntries(params)) });
    assert.equal(page.props.children.props[`${filter}Id`], detail._id);
    assert.equal(page.props.children.props[`${filter}Name`], detail.name);
    assert.doesNotMatch(renderToStaticMarkup(React.createElement(SellerInfo, { product: {} })), /<a /);
  } finally { dom.window.close(); }
});

test(`${filter} listings preserve filters across pages and reset products when the ${filter} changes`, async () => {
  const calls = [];
  const { GET } = compile("app/api/catalog/products/route.js", {
    "@/utils/catalog": { getProducts: async (params) => {
      calls.push(Object.fromEntries(params));
      const selected = params.get(filter);
      return { products: [product(`${selected}-${params.get("page")}`)], totalProducts: selected === "first" ? 2 : 1 };
    } },
  });
  const view = await mount(null, (url) => GET(new Request(`http://localhost${url}`)), ProductResults, {
    categoryId: "category", [`${filter}Id`]: "first", [`${filter}Name`]: "AI Craft", searchQuery: "chair",
  });
  try {
    assert.match(document.querySelector("h1").textContent, filter === "category" ? /in AI Craft/ : /AI Craft Products/);
    const observer = view.observers.findLast((entry) => entry.active);
    assert.ok(observer);
    await React.act(async () => observer.callback([{ isIntersecting: true }]));
    assert.deepEqual(calls.map(({ [filter]: selected, category, search, page }) => ({ selected, category, search, page })), [
      { selected: "first", category: filter === "category" ? "first" : "category", search: "chair", page: "1" },
      { selected: "first", category: filter === "category" ? "first" : "category", search: "chair", page: "2" },
    ]);
    assert.equal(view.cards().length, 2);
    await view.render({ [`${filter}Id`]: "second", [`${filter}Name`]: "Another Shop" });
    assert.equal(calls.at(-1)[filter], "second");
    assert.equal(calls.at(-1).page, "1");
    assert.deepEqual(view.cards().map((card) => card.textContent), ["Product second-1"]);
  } finally { await view.close(); }
});
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

test("related products request the current category, exclude the current product and limit the slider", async () => {
  const requests = [];
  const RelatedProducts = compile("components/ProductDetails/RelatedProducts.jsx", {
    "@/utils/catalog": { getProducts: async (params) => {
      requests.push(Object.fromEntries(params));
      return { products: [product("current"), ...Array.from({ length: 12 }, (_, index) => product(`related-${index}`))] };
    } },
    "./RelatedProductsSlider": { __esModule: true, default: () => null },
  }).default;
  const result = await RelatedProducts({ product: {
    _id: "current", category: { _id: "category-id", name: "Furniture & Decor" },
  } });
  assert.deepEqual(requests, [{ category: "category-id", page: "1", limit: "13" }]);
  assert.equal(result.props.products.length, 12);
  assert.ok(result.props.products.every((item) => item._id !== "current"));
  assert.equal(result.props.categoryId, "category-id");
  assert.equal(result.props.categoryName, "Furniture & Decor");
});

test("related products stay hidden without a category, other products or an available catalog", async () => {
  let calls = 0;
  let response = { products: [product("current")] };
  const RelatedProducts = compile("components/ProductDetails/RelatedProducts.jsx", {
    "@/utils/catalog": { getProducts: async () => {
      calls += 1;
      if (response instanceof Error) throw response;
      return response;
    } },
    "./RelatedProductsSlider": { __esModule: true, default: () => null },
  }).default;
  assert.equal(await RelatedProducts({ product: { _id: "current" } }), null);
  assert.equal(calls, 0);
  const props = { product: { _id: "current", category: { _id: "category-id" } } };
  assert.equal(await RelatedProducts(props), null);
  response = { products: [] };
  assert.equal(await RelatedProducts(props), null);
  response = new Error("Catalog unavailable");
  assert.equal(await RelatedProducts(props), null);
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
