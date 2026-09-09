import Link from "next/link";

export const metadata = {
  title: "404 Not Found | CartOut",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[1440px] items-center justify-center px-4 py-16">
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#FF3300]">
          Page not found
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950 md:text-5xl">
          404 Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded bg-[#FF3300] px-5 py-3 text-sm font-semibold text-white"
        >
          Go Home
        </Link>
      </section>
    </main>
  );
}
