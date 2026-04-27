import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 5000,
});

/**
 * Centralized error handler
 */
const handleApiError = (error, endpoint) => {
  const message =
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.message ||
    "Unknown error";

  const status = error?.response?.status;

  if (status === 404) {
    throw new Error(`❌ ${endpoint} not found`);
  } else if (status === 500) {
    throw new Error("❌ Server error. Check backend.");
  } else if (status === 401) {
    throw new Error("❌ Unauthorized. Login again.");
  } else if (error.code === "ECONNABORTED") {
    throw new Error("⏱️ Request timeout.");
  } else if (error.message === "Network Error") {
    throw new Error("🌐 Backend not running or CORS issue.");
  } else {
    throw new Error(message);
  }
};

// ================= AUTH =================
export const login = async (email, password) => {
  try {
    // TEMP MOCK
    return {
      role: email.includes("customer") ? "CUSTOMER" : "RETAILER",
    };
  } catch (error) {
    handleApiError(error, "login");
  }
};

// ================= PRODUCTS =================
export const getProducts = async () => {
  try {
    const res = await api.get("/products/");

    return res.data.map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      hex: p.color_hex || "#ccc",
      category: p.category,
      stock: p.stock ?? 0,
      reorderLine: 50,
      status: (p.stock ?? 0) < 60 ? "risk" : "ok",
    }));
  } catch (error) {
    handleApiError(error, "products");
  }
};

// ================= PREDICTIONS =================
export const getPredictions = async () => {
  try {
    const res = await api.get("/predictions/");

    return res.data.map((p, index) => ({
      id: p.product?.id ?? index,
      name: p.product?.name ?? "Unknown",
      hex: "#ccc", // optional: map real color later
      predicted: p.predicted_demand ?? 0,
      confidence: p.confidence ?? 80,
      suggestedStock: p.suggested_stock ?? 0,
      trend: formatTrend(p.trend),
      trendDir: p.trend || "flat",
    }));
  } catch (error) {
    handleApiError(error, "predictions");
  }
};

// ================= TRENDING =================
export const getTrending = async () => {
  try {
    const res = await api.get("/trending/");

    return res.data.map((t, index) => ({
      id: index,
      name: t.name,
      hex: t.color_hex || "#ccc",
      category: t.category,
      predicted: t.predicted_demand ?? 0,
      trend: formatTrend(t.trend),
      trendDir: t.trend || "flat",
    }));
  } catch (error) {
    handleApiError(error, "trending");
  }
};

// ================= DASHBOARD =================
export const getDashboard = async () => {
  try {
    const res = await api.get("/dashboard/");
    return res.data;
  } catch (error) {
    handleApiError(error, "dashboard");
  }
};

// ================= INVENTORY =================
export const getInventory = async () => {
  try {
    const res = await api.get("/inventory/");

    return res.data.map((item) => ({
      name: item.name,
      stock: item.stock ?? 0,
      status: item.status || "ok",
    }));
  } catch (error) {
    handleApiError(error, "inventory");
  }
};

// ================= HEATMAP =================
export const getHeatmap = async () => {
  try {
    const res = await api.get("/seasonal/heatmap");
    return res.data;
  } catch (error) {
    handleApiError(error, "heatmap");
  }
};

// ================= SALES =================
export const getMonthlySales = async () => {
  try {
    const res = await api.get("/sales/monthly");
    return res.data;
  } catch (error) {
    handleApiError(error, "monthly sales");
  }
};

// ================= COLORS =================
// (only keep if backend has this route)
export const getShades = async () => {
  try {
    const res = await api.get("/colors/shades");

    return res.data.map((s) => ({
      id: s.id,
      name: s.name,
      hex: s.hex,
      family: s.family,
      mood: s.mood,
      rooms: s.rooms,
    }));
  } catch (error) {
    handleApiError(error, "shades");
  }
};

// ================= HELPER =================
const formatTrend = (trend) => {
  if (trend === "up") return "+10%";
  if (trend === "down") return "-5%";
  return "0%";
};

export default api;