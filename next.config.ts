import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  }
};

export default nextConfig;