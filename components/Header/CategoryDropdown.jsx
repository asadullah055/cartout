"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    const loadCategories = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/category/dropdownCategories`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        if (!ignore) {
          const nextCategories = Array.isArray(data?.categories)
            ? data.categories.filter(
                (category) => !category?.status || category.status === "active"
              )
            : [];
          setCategories(nextCategories);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message || "Failed to load categories");
          setCategories([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-full shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-full min-w-[160px] items-center justify-center gap-2 border-r border-gray-200 px-4 text-[13px] font-semibold leading-none text-gray-800 lg:min-w-[220px] lg:gap-3 lg:px-6 lg:text-[14px]"
      >
        <AiOutlineMenu size={20} />
        <span>All Categories</span>
        <FiChevronDown
          className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={18}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-50 mt-3 w-[270px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-semibold text-gray-900">Shop by category</p>
            <p className="text-xs text-gray-500">Live data from backend</p>
          </div>

          <div className="max-h-[360px] overflow-y-auto py-2">
            {isLoading ? (
              <p className="px-4 py-3 text-sm text-gray-500">Loading categories...</p>
            ) : null}

            {!isLoading && error ? (
              <p className="px-4 py-3 text-sm text-red-500">{error}</p>
            ) : null}

            {!isLoading && !error && categories.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-500">No categories found</p>
            ) : null}

            {!isLoading && !error
              ? categories.map((category) => (
                  <button
                    key={category._id}
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#fff7e8]"
                  >
                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f5f7fb]">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-xs font-bold uppercase text-gray-500">
                          {category.name?.slice(0, 2)}
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">
                      {category.name}
                    </span>
                  </button>
                ))
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CategoryDropdown;
