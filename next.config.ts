import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local dev Postgres (via `prisma dev`) has a low connection ceiling;
  // cap static-generation worker concurrency so the build doesn't exhaust it.
  experimental: {
    cpus: 2,
  },
};

export default nextConfig;
