const apiBaseUrl = () => process.env.NEXT_PUBLIC_API_URL || "https://pinwheel-server.vercel.app/api";

export const paymentRequest = async (path, body) => {
  const response = await fetch(`${apiBaseUrl()}/order/${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: { "Content-Type": "application/json" }, credentials: "include", cache: "no-store",
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to process payment. Please try again.");
  return data;
};

export const startBkashPayment = (order) => paymentRequest(`${order._id}/bkash`, { token: order.invoiceAccessToken });
