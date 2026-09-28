import axios from "axios";

// Backend base URL. Dev'de vite.config.js içindeki proxy /api isteklerini
// Nilay'ın ASP.NET Core API'sine yönlendirir; prod'da .env üzerinden
// VITE_API_BASE_URL set edilmeli.
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Admin panelinde (Büşra) veya ileride korumalı endpoint'ler için
// JWT token'ı otomatik ekleyecek interceptor - şimdiden hazır.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kys_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Backend henüz ayakta değilken (Week 1 erken aşama) konsola net bir
    // uyarı düşer, sayfaların mock/empty state ile çalışmaya devam etmesine izin verir.
    if (!error.response) {
      console.warn("[API] Backend'e ulaşılamadı:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
