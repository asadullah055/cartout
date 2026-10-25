"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

const PRODUCTS_PER_PAGE = 10;
const FeaturedProducts = ({ initialData = null }) => {
  const [products, setProducts] = useState(initialData?.products || []);
  const [page, setPage] = useState(initialData ? 1 : 0);
  const [totalProducts, setTotalProducts] = useState(initialData ? Number(initialData.totalProducts || 0) : null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const loaderRef = useRef(null);
  const loadingPageRef = useRef(null);
  const hasMore = totalProducts === null || products.length < totalProducts;

  const loadProducts = useCallback(async (pageToLoad) => {
    if (loadingPageRef.current !== null) return;

    loadingPageRef.current = pageToLoad;
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/catalog/products?page=${pageToLoad}&limit=${PRODUCTS_PER_PAGE}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load products");
      }

      const nextProducts = Array.isArray(data?.products) ? data.products : [];
      const nextTotalProducts = Number(data?.totalProducts || 0);

      setTotalProducts(nextTotalProducts);
      setProducts((currentProducts) => {
        const productMap = new Map(
          currentProducts.map((product) => [product._id, product])
        );

        nextProducts.forEach((product) => {
          productMap.set(product._id, product);
        });

        return Array.from(productMap.values());
      });
      setPage(pageToLoad);
    } catch (error) {
      setErrorMessage(error.message || "Failed to load products");
    } finally {
      loadingPageRef.current = null;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialData) loadProducts(1);
  }, [initialData, loadProducts]);

  useEffect(() => {
    const onScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", onScroll, { once: true, passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const loaderElement = loaderRef.current;
    if (!loaderElement || !hasMore || !hasScrolled || page === 0 || errorMessage) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoading) {
          loadProducts(page + 1);
        }
      },
      {
        rootMargin: "300px 0px",
      }
    );

    observer.observe(loaderElement);

    return () => observer.disconnect();
  }, [hasMore, hasScrolled, isLoading, loadProducts, page, errorMessage]);

  return (
    <section className="mx-auto max-w-[1440px] px-1.5 py-3 sm:px-2 lg:px-3">
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} priority={index < 2} />
        ))}
      </div>

      <div ref={loaderRef} className="flex min-h-16 items-center justify-center py-4">
        {isLoading ? (
          <span className="text-sm font-medium text-gray-500">Loading products...</span>
        ) : null}
        {!isLoading && errorMessage ? (
          <button
            className="rounded bg-[#ff3300] px-4 py-2 text-sm font-semibold text-white"
            onClick={() => loadProducts(products.length ? page + 1 : 1)}
            type="button"
          >
            Try again
          </button>
        ) : null}
        {!isLoading && !errorMessage && products.length > 0 && !hasMore ? (
          <span className="text-sm font-medium text-gray-400">No more products</span>
        ) : null}
        {!isLoading && !errorMessage && hasMore && page > 0 ? (
          <button type="button" onClick={() => loadProducts(page + 1)} className="text-sm font-semibold text-[#ff3300]">
            Load more products
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default FeaturedProducts;
