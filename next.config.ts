import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local dev Postgres (via `prisma dev`) has a low connection ceiling;
  // cap static-generation worker concurrency so the build doesn't exhaust it.
  experimental: {
    cpus: 1,
  },
  // Static export for the GitHub Pages preview branch — read-only marketing
  // + catalog pages only, baked at build time. No backend on Pages.
  output: "export",
  basePath: "/Firoz-Farms",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
