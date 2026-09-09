import Link from "next/link";
import { notFound } from "next/navigation";

const pages = {
  "terms-and-conditions": {
    title: "Terms & Conditions",
    updatedAt: "Last updated: September 9, 2026",
    sections: [
      {
        heading: "Use of CartOut",
        body: "By using CartOut, customers agree to provide accurate account, delivery, and payment information and to use the platform only for lawful purchases.",
      },
      {
        heading: "Orders",
        body: "All orders are subject to product availability, seller confirmation, and successful verification of delivery details. CartOut may cancel an order if required information is invalid or the item is unavailable.",
      },
      {
        heading: "Pricing",
        body: "Product prices, offers, and delivery charges may change over time. The payable amount shown at checkout is the amount applicable when the order is placed.",
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    updatedAt: "Last updated: September 9, 2026",
    sections: [
      {
        heading: "Information We Collect",
        body: "CartOut collects the information needed to process orders, including name, phone number, email address, delivery address, and order history.",
      },
      {
        heading: "How We Use Information",
        body: "We use customer information to confirm orders, arrange delivery, send invoices, provide support, and improve shopping services.",
      },
      {
        heading: "Data Protection",
        body: "We take reasonable steps to protect customer information and do not sell personal information to third parties.",
      },
    ],
  },
  "returns-and-refunds": {
    title: "Return & Refund Policy",
    updatedAt: "Last updated: September 9, 2026",
    sections: [
      {
        heading: "Return Requests",
        body: "Customers should contact CartOut support as soon as possible if an item is damaged, defective, incorrect, or not as described.",
      },
      {
        heading: "Eligibility",
        body: "Returned products should be unused, complete, and include original packaging where applicable. Some products may not be eligible for return due to hygiene, warranty, or seller policy restrictions.",
      },
      {
        heading: "Refunds",
        body: "Approved refunds are processed after the returned product is received and checked. Refund timing may vary depending on payment method and operational processing time.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) {
    return {
      title: "Content | CartOut",
    };
  }

  return {
    title: `${page.title} | CartOut`,
    description: `${page.title} for CartOut customers`,
  };
}

export default async function ContentPage({ params }) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) {
    notFound();
  }

  return (
    <main className="bg-gray-50 px-4 py-8">
      <article className="mx-auto max-w-3xl rounded-md bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-8">
        <Link className="text-sm font-semibold text-[#ff3300]" href="/checkout">
          Back to checkout
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-[#101828] sm:text-3xl">
          {page.title}
        </h1>
        <p className="mt-2 text-sm text-[#667085]">{page.updatedAt}</p>

        <div className="mt-7 space-y-6">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-[#101828]">{section.heading}</h2>
              <p className="mt-2 text-sm leading-6 text-[#475467] sm:text-base">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
