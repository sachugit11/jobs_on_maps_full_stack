import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
  reactStrictMode: true,
};

export default nextConfig;
