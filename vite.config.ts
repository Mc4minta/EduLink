import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",           // listen on all interfaces (IPv6 + IPv4)
    port: 8080,           // fixed port
    strictPort: true,     // do not pick another port
    allowedHosts: [
      "fc25b31fddab.ngrok-free.app", // <-- add your ngrok host here
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
