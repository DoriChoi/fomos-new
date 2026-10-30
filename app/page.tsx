// Phase 1: DB 연결 후 getLatestArticles()로 실제 데이터 연결 예정
// import { getLatestArticles } from "@/lib/articles"

export default async function HomePage() {
  // TODO: Phase 1 — DB 연결 후 주석 해제
  // const articles = await getLatestArticles(10)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 헤더 */}
      <header className="mb-8">
        <h1
          className="text-3xl font-bold"
          style={{ color: "#e6002d" }}
        >
          FOMOS
        </h1>
        <p className="text-sm text-gray-600 mt-1">한국 e스포츠 전문 미디어</p>
      </header>

      {/* Hero 섹션 */}
      <section className="bg-white rounded-xl p-8 mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">준비 중</h2>
        <p className="text-gray-500">
          DB 연결 후 최신 기사가 표시됩니다.
        </p>
        <div className="mt-4 text-xs text-gray-400 font-mono">
          pnpm db:pull → pnpm db:generate → pnpm dev
        </div>
      </section>

      {/* 뉴스 그리드 — Phase 1에서 실제 데이터로 교체 */}
      <section>
        <h2 className="text-lg font-bold mb-4">최신 기사</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-4 shadow-sm animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
