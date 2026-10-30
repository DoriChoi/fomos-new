// TODO: pnpm db:pull 실행 후 실제 Prisma 타입으로 교체
// 현재는 플레이스홀더 — 실제 fomosv2 컬럼명 확인 후 수정 필요

export interface Article {
  id: number
  title: string
  content: string
  thumbnail?: string | null
  category?: string | null
  createdAt: Date
  viewCount?: number
}

/**
 * 최신 기사 목록 조회
 * TODO: db:pull 후 실제 테이블명/컬럼명으로 수정
 */
export async function getLatestArticles(limit = 10): Promise<Article[]> {
  // TODO: pnpm db:pull 후 아래 주석 해제 & 수정
  // const { db } = await import("./db")
  // return db.article.findMany({
  //   orderBy: { createdAt: "desc" },
  //   take: limit,
  //   select: { id: true, title: true, thumbnail: true, category: true, createdAt: true }
  // })
  return []
}

/**
 * 기사 상세 조회
 * TODO: db:pull 후 실제 테이블명/컬럼명으로 수정
 */
export async function getArticleById(id: number): Promise<Article | null> {
  // TODO: pnpm db:pull 후 아래 주석 해제 & 수정
  // const { db } = await import("./db")
  // return db.article.findUnique({ where: { id } })
  return null
}
