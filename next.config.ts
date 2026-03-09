import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // 防止点击劫持（iframe 嵌套）
          { key: "X-Frame-Options", value: "DENY" },
          // 防止 MIME 类型嗅探
          { key: "X-Content-Type-Options", value: "nosniff" },
          // 防止 XSS 反射攻击
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // 强制 HTTPS
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // 控制 Referrer 信息泄露
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // 禁止浏览器特权 API（摄像头、麦克风、地理位置等）
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // CSP：仅允许同源资源
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none';" },
        ],
      },
    ];
  },
};

export default nextConfig;
