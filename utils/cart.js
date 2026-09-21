const CART_STORAGE_KEY = "pinwheel_cart";
const BUY_NOW_STORAGE_KEY = "pinwheel_buy_now";
const CART_EVENT_NAME = "cart:updated";

const isBrowser = () => typeof window !== "undefined";
const getApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "https://pinwheel-server.vercel.app/api";

const getStockLimit = (item) => {
  const maxStock = Number(item?.maxStock);
  return Number.isFinite(maxStock) ? Math.max(0, maxStock) : null;
};

const clampQuantity = (quantity, item) => {
  const parsedQuantity = Number(quantity);
  const safeQuantity = Number.isFinite(parsedQuantity) ? parsedQuantity : 1;
  const stockLimit = getStockLimit(item);
  const nextQuantity = Math.max(1, safeQuantity);

  return stockLimit === null ? nextQuantity : Math.min(stockLimit || 1, nextQuantity);
};

export const calculateShippingFeeBySeller = (items, chargeKey = "outsideDhaka") => {
  if (!Array.isArray(items) || items.length === 0) return 0;

  const fallback = chargeKey === "insideDhaka" ? 80 : 120;
  const chargeBySeller = new Map();

  items.forEach((item) => {
    const sellerKey =
      item.sellerId || item.shopName || item.sellerName || item.productId || item.id;
    const itemCharge = Number(item.shippingCharge?.[chargeKey] ?? fallback);
    const safeCharge = Number.isFinite(itemCharge) ? itemCharge : fallback;
    const currentCharge = chargeBySeller.get(sellerKey) || 0;

    chargeBySeller.set(sellerKey, Math.max(currentCharge, safeCharge));
  });

  return Array.from(chargeBySeller.values()).reduce(
    (total, charge) => total + charge,
    0
  );
};

export const readCart = () => {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeCart = (items) => {
  if (!isBrowser()) return;

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(
    new CustomEvent(CART_EVENT_NAME, {
      detail: items,
    })
  );
};

export const addToCart = (item) => {
  const currentItems = readCart();
  const existingIndex = currentItems.findIndex(
    (cartItem) =>
      cartItem.productId === item.productId && cartItem.variantId === item.variantId
  );

  if (existingIndex >= 0) {
    const nextItem = {
      ...currentItems[existingIndex],
      sellerId: item.sellerId || currentItems[existingIndex].sellerId,
      shopName: item.shopName || currentItems[existingIndex].shopName,
      sellerName: item.sellerName || item.shopName || currentItems[existingIndex].sellerName,
      shippingCharge: item.shippingCharge || currentItems[existingIndex].shippingCharge,
      maxStock: item.maxStock ?? currentItems[existingIndex].maxStock,
    };

    currentItems[existingIndex] = {
      ...nextItem,
      quantity: clampQuantity(
        currentItems[existingIndex].quantity + item.quantity,
        nextItem
      ),
    };
  } else {
    currentItems.push({
      ...item,
      quantity: clampQuantity(item.quantity, item),
    });
  }

  writeCart(currentItems);
  return currentItems;
};

export const updateCartItemQuantity = (id, quantity) => {
  const items = readCart().map((item) =>
    item.id === id ? { ...item, quantity: clampQuantity(quantity, item) } : item
  );
  writeCart(items);
  return items;
};

export const removeCartItem = (id) => {
  const items = readCart().filter((item) => item.id !== id);
  writeCart(items);
  return items;
};

export const refreshCartShopNames = async (items, options = {}) => {
  if (!Array.isArray(items) || items.length === 0) return items || [];

  const productIds = [
    ...new Set(items.map((item) => item.productId).filter(Boolean)),
  ];

  if (productIds.length === 0) return items;

  const sellerEntries = await Promise.all(
    productIds.map(async (productId) => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/product/${productId}`);
        if (!response.ok) return null;

        const data = await response.json();
        const creator = data?.product?.creator;
        const shopName = creator?.shopName;
        const sellerId = creator?._id;

        return shopName || sellerId
          ? [
              productId,
              {
                sellerId,
                shopName,
              },
            ]
          : null;
      } catch {
        return null;
      }
    })
  );
  const sellerByProductId = Object.fromEntries(sellerEntries.filter(Boolean));
  let hasChanges = false;

  const nextItems = items.map((item) => {
    const seller = sellerByProductId[item.productId];
    if (!seller) return item;

    const nextShopName = seller.shopName || item.shopName;
    const nextSellerId = seller.sellerId || item.sellerId;
    if (item.shopName === nextShopName && item.sellerId === nextSellerId) {
      return item;
    }

    hasChanges = true;
    return {
      ...item,
      sellerId: nextSellerId,
      shopName: nextShopName,
      sellerName: nextShopName,
    };
  });

  if (hasChanges && options.persist !== false) {
    writeCart(nextItems);
  }

  return nextItems;
};

export const readBuyNowItem = () => {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(BUY_NOW_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};

export const writeBuyNowItem = (item) => {
  if (!isBrowser()) return;

  window.localStorage.setItem(BUY_NOW_STORAGE_KEY, JSON.stringify(item));
};

export const clearBuyNowItem = () => {
  if (!isBrowser()) return;

  window.localStorage.removeItem(BUY_NOW_STORAGE_KEY);
};

export const cartEventName = CART_EVENT_NAME;
