// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Read allowed hosts from environment variable and split by comma
  const allowedHosts = process.env.VITE_ALLOWED_HOSTS
    ? process.env.VITE_ALLOWED_HOSTS.split(",")
    : [];

  return {
    server: {
      host: "::",           // listen on all interfaces (IPv6 + IPv4)
      port: 8080,           // fixed port
      strictPort: true,     // do not pick another port
      allowedHosts,         // dynamic allowed hosts from .env
    },
    plugins: [
      react(),
      mode === "development" && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // shortcut for imports
      },
    },
  };
});
