"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa6";

const BKASH_NUMBER = "01841151425";

export default function AdvancePaymentNotice() {
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (copyStatus !== "copied") return;
    const timeout = setTimeout(() => setCopyStatus(""), 2000);
    return () => clearTimeout(timeout);
  }, [copyStatus]);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(BKASH_NUMBER);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <section lang="bn" aria-label="অগ্রিম পেমেন্টের নির্দেশনা" className="rounded-lg border border-pink-200 border-l-[3px] border-l-[#e2136e] bg-[#fff8fb] p-3">
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <h4 className="text-[13px] font-semibold leading-5 text-gray-900">অর্ডার কনফার্ম করতে</h4>
        <p className="rounded bg-[#e2136e] px-2 py-1 text-xs font-semibold leading-5 text-white">
          ন্যূনতম <strong className="text-base font-bold">৳১০০</strong> অগ্রিম
        </p>
      </div>
      <p className="mt-1 text-xs font-medium leading-5 text-gray-700">অগ্রিম ছাড়া অর্ডার কনফার্ম হবে না।</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 rounded-md border border-pink-100 bg-white px-2.5 py-1.5">
        <span className="text-xs font-semibold text-[#be185d]">বিকাশ</span>
        <div className="flex flex-wrap items-center gap-2">
          <span dir="ltr" className="select-all text-base font-bold tracking-wide text-gray-900">{BKASH_NUMBER}</span>
          <button
            type="button"
            onClick={copyNumber}
            aria-label="বিকাশ নম্বর কপি করুন"
            className="inline-flex min-h-8 w-[76px] shrink-0 items-center justify-center gap-1.5 rounded bg-pink-50 px-1.5 py-1 text-xs font-semibold text-[#be185d] hover:bg-pink-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2136e]"
          >
            {copyStatus === "copied" ? <FaCheck aria-hidden="true" /> : <FaRegCopy aria-hidden="true" />}
            {copyStatus === "copied" ? "কপি হয়েছে" : "কপি"}
          </button>
        </div>
      </div>
      <p role="status" className={copyStatus === "error" ? "mt-2 text-xs leading-5 text-red-700" : "sr-only"}>
        {copyStatus === "copied" ? "বিকাশ নম্বর কপি হয়েছে।" : copyStatus === "error" ? "কপি করা যায়নি। নম্বরটি সিলেক্ট করে কপি করুন।" : ""}
      </p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs leading-5">
        <p className="rounded bg-pink-100 px-1.5 font-semibold text-[#9d174d]">অগ্রিম ফেরতযোগ্য নয়</p>
        <p className="text-gray-700">বাকি টাকা পণ্য হাতে পেয়ে দিন।</p>
      </div>
    </section>
  );
}
