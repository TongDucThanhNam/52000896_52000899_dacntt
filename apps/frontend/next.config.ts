import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // Docker
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "via.placeholder.com",
      },
      {
        hostname: "placehold.co",
      },
      {
        hostname: "down-vn.img.susercontent.com",
      },
      {
        hostname: "qr.sepay.vn",
      },
    ],
  },
};

export default nextConfig;

import NextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);

// // Cloudflare
// import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
// initOpenNextCloudflareForDev();
