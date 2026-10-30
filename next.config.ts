import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // fomosv2 이미지 CDN — db:pull 후 실제 도메인으로 교체
      // { protocol: "https", hostname: "cdn.fomos.kr" },
    ],
  },
}

export default nextConfig
