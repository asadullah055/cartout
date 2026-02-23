"use client";

const VariantSelector = ({
  variants,
  selectedVariant,
  setSelectedVariant,
}) => {
  if (!variants || variants.length === 0) return null;

  const attributeKeys = Object.keys(variants[0]?.attributes || {});
  if (attributeKeys.length === 0) return null;

  // 🔹 helper: find best matching variant
  const findMatchingVariant = (attrKey, attrValue) => {
    // try to keep other attributes same
    const matched = variants.find(v =>
      Object.entries(selectedVariant.attributes || {}).every(
        ([key, value]) =>
          key === attrKey
            ? v.attributes?.[key] === attrValue
            : v.attributes?.[key] === value
      )
    );

    // fallback: any variant with this attribute
    return (
      matched ||
      variants.find(v => v.attributes?.[attrKey] === attrValue)
    );
  };

  return (
    <div className="mt-4 space-y-4">
      {attributeKeys.map(attrKey => {
        const options = [
          ...new Set(
            variants
              .map(v => v.attributes?.[attrKey])
              .filter(Boolean)
          ),
        ];

        if (options.length <= 1) return null;

        return (
          <div key={attrKey}>
            <label className="block font-medium mb-2">
              {attrKey}
            </label>

            <div className="flex gap-2 flex-wrap">
              {options.map(option => {
                const isActive =
                  selectedVariant.attributes?.[attrKey] === option;

                return (
                  <button
                    key={option}
                    onClick={() => {
                      const nextVariant = findMatchingVariant(
                        attrKey,
                        option
                      );
                      nextVariant && setSelectedVariant(nextVariant);
                    }}
                    className={`px-3 py-1 border rounded
                      ${
                        isActive
                          ? "border-black bg-gray-100"
                          : "border-gray-300"
                      }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantSelector;
