import DOMPurify from "isomorphic-dompurify";

const ProductDescription = ({ html, showAsFeatures = false }) => {
    const cleanHTML = DOMPurify.sanitize(html || "");

    if (!cleanHTML.trim()) return null;

    if (!showAsFeatures) {
      return (
        <div
          className="text-[14px] leading-6 text-[#475467] [&_li]:mb-2 [&_li]:list-none [&_ol]:m-0 [&_ol]:list-none [&_ol]:p-0 [&_p]:mb-3 [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0"
          dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
      );
    }

    return (
      <section className="mt-4 max-w-2xl">
        <div className="mb-2.5 flex items-center gap-3">
          <h2 className="shrink-0 text-[14px] font-semibold text-[#101828]">
            Key Features
          </h2>
          <span className="h-px flex-1 bg-[#e4e7ec]" />
        </div>
        <div
          className="space-y-1.5 text-[13px] leading-5 text-[#475467] [&_ol]:m-0 [&_ol]:list-none [&_ol]:space-y-1.5 [&_ol]:p-0 [&_ul]:m-0 [&_ul]:list-none [&_ul]:space-y-1.5 [&_ul]:p-0 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-1 [&_li]:before:flex [&_li]:before:h-3 [&_li]:before:w-3 [&_li]:before:items-center [&_li]:before:justify-center [&_li]:before:rounded-full [&_li]:before:bg-[#ff5a1f] [&_li]:before:text-[8px] [&_li]:before:font-bold [&_li]:before:leading-none [&_li]:before:text-white [&_li]:before:content-['✓'] [&>p]:relative [&>p]:pl-5 [&>p]:before:absolute [&>p]:before:left-0 [&>p]:before:top-1 [&>p]:before:flex [&>p]:before:h-3 [&>p]:before:w-3 [&>p]:before:items-center [&>p]:before:justify-center [&>p]:before:rounded-full [&>p]:before:bg-[#ff5a1f] [&>p]:before:text-[8px] [&>p]:before:font-bold [&>p]:before:leading-none [&>p]:before:text-white [&>p]:before:content-['✓']"
          dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
      </section>
    );
};

export default ProductDescription;
