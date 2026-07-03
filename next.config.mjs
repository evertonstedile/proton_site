import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // e2e usa dir próprio (NEXT_DIST_DIR=.next-e2e) para o build de produção
  // não ser sobrescrito pelo `next dev` do preview.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // evita o Next inferir workspace root errado (lockfile solto em ~/)
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // ponytail: sem CSP estrita (inline scripts do Next); subir p/ CSP com nonce se o site ganhar backend
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
