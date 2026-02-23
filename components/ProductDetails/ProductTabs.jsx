"use client";
import { useState } from "react";
import ProductDescription from "./ProductDescription";

export default function ProductTabs({ product }) {
    const [activeTab, setActiveTab] = useState("description");
    return (
        <div className="w-full">
            {/* Tabs */}
            <div className="flex  gap-8 border-gray-300 border-b-2 text-sm font-medium w-1/2">
                <button
                    onClick={() => setActiveTab("description")}
                    className={`pb-3 ${activeTab === "description"
                        ? "text-black border-b-2 border-green-500"
                        : "text-gray-400"
                        }`}
                >
                    DESCRIPTION
                </button>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`pb-3 ${activeTab === "reviews"
                        ? "text-red-500 border-b-2 border-green-500"
                        : "text-gray-400"
                        }`}
                >
                    REVIEWS
                </button>

                <button
                    onClick={() => setActiveTab("questions")}
                    className={`pb-3 ${activeTab === "questions"
                        ? "text-black border-b-2 border-green-500"
                        : "text-gray-400"
                        }`}
                >
                    Product Questions
                </button>
            </div>

            {/* Content */}
            <div className="mt-6">
                {activeTab === "description" && (
                    <div>
                        <ProductDescription html={product.description} />
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div>
                        <h3 className="font-semibold mb-2">Customer Reviews</h3>
                        <p className="text-gray-600">
                            ⭐⭐⭐⭐☆ Very good product!
                        </p>
                    </div>
                )}

                {activeTab === "questions" && (
                    <div>
                        <h3 className="font-semibold mb-2">Product Questions</h3>
                        <p className="text-gray-600">
                            Q: Does it support fast charging?
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
