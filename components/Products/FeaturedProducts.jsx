"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

const PRODUCTS_PER_PAGE = 10;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://pinwheel-server.vercel.app/api"
    : "http://localhost:8000/api");

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const loaderRef = useRef(null);
  const loadingPageRef = useRef(null);
  const hasMore = totalProducts === null || products.length < totalProducts;

  const loadProducts = useCallback(async (pageToLoad) => {
    if (loadingPageRef.current === pageToLoad) return;

    loadingPageRef.current = pageToLoad;
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/product/publicProducts?page=${pageToLoad}&limit=${PRODUCTS_PER_PAGE}`
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
    loadProducts(1);
  }, [loadProducts]);

  useEffect(() => {
    const loaderElement = loaderRef.current;
    if (!loaderElement || !hasMore) return undefined;

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
  }, [hasMore, isLoading, loadProducts, page]);

  return (
    <section className="mx-auto max-w-[1440px] px-1.5 py-3 sm:px-2 lg:px-3">
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
