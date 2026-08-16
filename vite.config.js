import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Nilay'ın ASP.NET Core Web API'sine dev sırasında proxy.
// Backend portu değişirse VITE_API_BASE_URL ile .env üzerinden override edilebilir.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
