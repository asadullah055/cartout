import DOMPurify from "isomorphic-dompurify";
import styles from "./ProductDescription.module.css";

const ProductDescription = ({ html, showAsFeatures = false }) => {
    const cleanContent = DOMPurify.sanitize(html || "", {
      ALLOWED_TAGS: ["p", "br", "div", "span", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "blockquote", "h2", "h3", "h4", "table", "thead", "tbody", "tr", "th", "td", "a", "hr"],
      ALLOWED_ATTR: ["href", "title", "colspan", "rowspan"],
      ADD_URI_SAFE_ATTR: ["colspan", "rowspan"],
      ALLOW_DATA_ATTR: false,
      ALLOW_ARIA_ATTR: false,
      ALLOWED_URI_REGEXP: /^(?:https:\/\/|mailto:|\/(?!\/)|#)/i,
      RETURN_DOM: true,
    });

    if (!cleanContent.innerHTML.trim()) return null;

    if (!showAsFeatures) {
      // Keep real table layout and contain horizontal scrolling to each table.
      for (const table of cleanContent.querySelectorAll("table")) {
        if (table.parentElement.closest("table")) continue;
        const wrapper = table.ownerDocument.createElement("div");
        wrapper.className = styles.tableScroll;
        wrapper.setAttribute("tabindex", "0");
        wrapper.setAttribute("role", "region");
        wrapper.setAttribute("aria-label", "Product description table");
        table.replaceWith(wrapper);
        wrapper.append(table);
      }
      return (
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: cleanContent.innerHTML }}
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
          dangerouslySetInnerHTML={{ __html: cleanContent.innerHTML }}
        />
      </section>
    );
};

export default ProductDescription;
