import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "FOMOS — 포모스",
    template: "%s | FOMOS",
  },
  description: "한국 e스포츠 전문 미디어 + 커뮤니티",
  keywords: ["e스포츠", "esports", "게임", "포모스", "fomos"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 폰트 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen bg-[#f5f5f5] text-[#111111]">
        <main>{children}</main>
      </body>
    </html>
  )
}
