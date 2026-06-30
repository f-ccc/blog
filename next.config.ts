import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted deployment configuration
  output: 'standalone',
  serverExternalPackages: ['gray-matter', 'next-mdx-remote'],
};

export default nextConfig;
