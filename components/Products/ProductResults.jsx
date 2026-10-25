"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

const PRODUCTS_PER_PAGE = 20;

const ProductResults = ({ categoryId = "", categoryName = "", searchQuery = "" }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const loaderRef = useRef(null);
  const loadingRequestRef = useRef("");
  const filterKey = `${categoryId}:${searchQuery}`;
  const activeFilterRef = useRef(filterKey);
  const hasMore = totalProducts === null || products.length < totalProducts;

  const loadProducts = useCallback(
    async (pageToLoad, replace = false) => {
      const requestKey = `${filterKey}:${pageToLoad}`;
      if (loadingRequestRef.current === requestKey) return;

      loadingRequestRef.current = requestKey;
      setIsLoading(true);
      setErrorMessage("");

      const params = new URLSearchParams({
        page: String(pageToLoad),
        limit: String(PRODUCTS_PER_PAGE),
      });
      if (categoryId) params.set("category", categoryId);
      if (searchQuery) params.set("search", searchQuery);

      try {
        const response = await fetch(
          `/api/catalog/products?${params.toString()}`,
          { cache: "no-store" }
        );
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load products");
        }

        if (activeFilterRef.current !== filterKey) return;

        const nextProducts = Array.isArray(data?.products) ? data.products : [];
        setTotalProducts(Number(data?.totalProducts || 0));
        setProducts((currentProducts) => {
          const productMap = new Map(
            (replace ? [] : currentProducts).map((product) => [product._id, product])
          );
          nextProducts.forEach((product) => productMap.set(product._id, product));
          return Array.from(productMap.values());
        });
        setPage(pageToLoad);
      } catch (error) {
        if (activeFilterRef.current === filterKey) {
          setErrorMessage(error.message || "Failed to load products");
        }
      } finally {
        if (activeFilterRef.current === filterKey) {
          loadingRequestRef.current = "";
          setIsLoading(false);
        }
      }
    },
    [categoryId, filterKey, searchQuery]
  );

  useEffect(() => {
    activeFilterRef.current = filterKey;
    loadingRequestRef.current = "";
    setProducts([]);
    setPage(0);
    setTotalProducts(null);
    setErrorMessage("");
    loadProducts(1, true);
  }, [filterKey, loadProducts]);

  useEffect(() => {
    const loaderElement = loaderRef.current;
    if (!loaderElement || !hasMore || page === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoading) {
          loadProducts(page + 1);
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(loaderElement);
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadProducts, page]);

  const heading = searchQuery
    ? `Search results for “${searchQuery}”${categoryName ? ` in ${categoryName}` : ""}`
    : categoryName
    ? `${categoryName} Products`
    : "All Products";

  return (
    <section className="mx-auto w-full max-w-[1440px] px-3 py-8 sm:px-5 lg:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">{heading}</h1>
          {!isLoading || products.length > 0 ? (
            <p className="mt-1 text-sm text-gray-500">
              {totalProducts || 0} product{totalProducts === 1 ? "" : "s"} found
            </p>
          ) : null}
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} priority={index < 2} />
          ))}
        </div>
      ) : null}

      <div ref={loaderRef} className="flex min-h-28 items-center justify-center py-6">
        {isLoading ? (
          <span className="text-sm font-medium text-gray-500">Loading products...</span>
        ) : null}
        {!isLoading && errorMessage ? (
          <button
            type="button"
            onClick={() => loadProducts(page || 1, page === 0)}
            className="rounded bg-[#ff3300] px-4 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        ) : null}
        {!isLoading && !errorMessage && products.length === 0 ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">No products found</p>
            <p className="mt-1 text-sm text-gray-500">
              Try another search or choose a different category.
            </p>
          </div>
        ) : null}
        {!isLoading && !errorMessage && products.length > 0 && !hasMore ? (
          <span className="text-sm font-medium text-gray-400">All products loaded</span>
        ) : null}
      </div>
    </section>
  );
};

export default ProductResults;
