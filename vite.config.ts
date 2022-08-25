import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "terser",
    terserOptions: { compress: { drop_console: true, drop_debugger: true } },
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@requests": path.resolve(__dirname, "src/requests"),
      "@store": path.resolve(__dirname, "src/store"),
      "@i18n": path.resolve(__dirname, "src/i18n"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@constants": path.resolve(__dirname, "src/constants"),
    },
  },
});
