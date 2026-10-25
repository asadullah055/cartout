export function productImageUrl(src, width) {
  try {
    const url = new URL(src);
    if (url.hostname !== "res.cloudinary.com" || !url.pathname.includes("/image/upload/")) return src;
    url.protocol = "https:";
    url.pathname = url.pathname.replace("/image/upload/", `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
    return url.href;
  } catch {
    return src;
  }
}

export function productImageSrcSet(src) {
  if (productImageUrl(src, 320) === src) return undefined;
  return [160, 320, 640].map((width) => `${productImageUrl(src, width)} ${width}w`).join(", ");
}
