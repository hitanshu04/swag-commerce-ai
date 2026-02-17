const API_URL = "https://supreme-space-giggle-v6vw5gq4qwp5hpwg7-5000.app.github.dev/api";

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const validateCoupon = async (code: string, cartTotal: number) => {
  const res = await fetch(`${API_URL}/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, cartTotal }),
  });
  return res.json();
};

export const askAI = async (question: string) => {
  const res = await fetch(`${API_URL}/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return res.json();
};