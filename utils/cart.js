const CART_STORAGE_KEY = "pinwheel_cart";
const CART_EVENT_NAME = "cart:updated";

const isBrowser = () => typeof window !== "undefined";

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
    currentItems[existingIndex] = {
      ...currentItems[existingIndex],
      quantity: currentItems[existingIndex].quantity + item.quantity,
    };
  } else {
    currentItems.push(item);
  }

  writeCart(currentItems);
  return currentItems;
};

export const updateCartItemQuantity = (id, quantity) => {
  const items = readCart().map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  writeCart(items);
  return items;
};

export const removeCartItem = (id) => {
  const items = readCart().filter((item) => item.id !== id);
  writeCart(items);
  return items;
};

export const cartEventName = CART_EVENT_NAME;
