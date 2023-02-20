import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  dedupe: ["react", "react-dom"],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup.js",
  },
});
