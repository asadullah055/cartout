"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ProductDescription from "./ProductDescription";

const getItemText = (item, fields) => {
  if (typeof item === "string") return item.trim();

  for (const field of fields) {
    if (typeof item?.[field] === "string" && item[field].trim()) {
      return item[field].trim();
    }
  }

  return "";
};

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const reviews = (Array.isArray(product?.reviews) ? product.reviews : [])
    .map((review, index) => ({
      id: review?._id || review?.id || index,
      author:
        review?.user?.name ||
        review?.customer?.name ||
        review?.author?.name ||
        review?.name ||
        "Customer",
      rating: Number(review?.rating),
      text: getItemText(review, ["comment", "review", "message", "content", "body"]),
    }))
    .filter((review) => review.text);
  const rawQuestions = Array.isArray(product?.productQuestions)
    ? product.productQuestions
    : Array.isArray(product?.questions)
      ? product.questions
      : [];
  const questions = rawQuestions
    .map((item, index) => ({
      id: item?._id || item?.id || index,
      question: getItemText(item, ["question", "text", "content", "message"]),
      answer: getItemText(item, ["answer", "reply", "response"]),
    }))
    .filter((item) => item.question);

  return (
    <div className="w-full px-2 pt-4 sm:px-3">
      <div className="overflow-x-auto border-b border-gray-300">
        <div className="flex min-w-max gap-5 text-[12px] font-semibold uppercase sm:gap-8 sm:text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("description")}
          className={`whitespace-nowrap border-b-2 px-0.5 pb-3 ${
            activeTab === "description"
              ? "border-green-500 text-black"
              : "border-transparent text-gray-400"
          }`}
        >
          DESCRIPTION
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`whitespace-nowrap border-b-2 px-0.5 pb-3 ${
            activeTab === "reviews"
              ? "border-green-500 text-black"
              : "border-transparent text-gray-400"
          }`}
        >
          REVIEWS
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("questions")}
          className={`whitespace-nowrap border-b-2 px-0.5 pb-3 normal-case sm:uppercase ${
            activeTab === "questions"
              ? "border-green-500 text-black"
              : "border-transparent text-gray-400"
          }`}
        >
          Product Questions
        </button>
        </div>
      </div>

      <div className="mt-4 min-w-0 sm:mt-6">
        {activeTab === "description" && (
          <ProductDescription html={product.description} />
        )}

        {activeTab === "reviews" && (
          <section>
            <h3 className="mb-3 font-semibold text-gray-900">Customer Reviews</h3>
            {reviews.length > 0 ? (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <article key={review.id} className="rounded-md border border-gray-200 p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-semibold text-gray-900">{review.author}</p>
                      {Number.isFinite(review.rating) && review.rating > 0 && (
                        <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <FaStar
                              key={index}
                              size={12}
                              className={index < Math.round(review.rating) ? "text-amber-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{review.text}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="rounded-md border border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center text-sm text-gray-500">
                No reviews yet
              </p>
            )}
          </section>
        )}

        {activeTab === "questions" && (
          <section>
            <h3 className="mb-3 font-semibold text-gray-900">Product Questions</h3>
            {questions.length > 0 ? (
              <div className="space-y-3">
                {questions.map((item) => (
                  <article key={item.id} className="rounded-md border border-gray-200 p-4 text-sm">
                    <p className="font-semibold leading-6 text-gray-900">Q: {item.question}</p>
                    {item.answer && (
                      <p className="mt-2 leading-6 text-gray-600">A: {item.answer}</p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <p className="rounded-md border border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center text-sm text-gray-500">
                No product questions yet
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
