import DOMPurify from "isomorphic-dompurify";

const ProductDescription = ({ html }) => {
    const cleanHTML = DOMPurify.sanitize(html);

    return (
        <div
            className="list-disc px-3 customs"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
    );
};

export default ProductDescription;
