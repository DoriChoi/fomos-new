# FOMOS New — Claude Code 개발지시서

## 프로젝트 개요

포모스(fomos.kr) 리뉴얼 웹사이트. 한국 e스포츠 전문 미디어 + 커뮤니티 플랫폼.
기존 fomosv2 DB의 콘텐츠(기사, 커뮤니티 등)를 읽어 제공하는 것이 핵심 목표.

**레포지토리**: https://github.com/DoriChoi/fomos-new  
**배포(Vercel)**: v0로 생성된 FOMOS 홈페이지 (fomos-po Vercel 프로젝트)  
**v0 채팅**: https://v0.app/rokmc117-2516s-projects/chat/fomos-homepage-development-rPEI7ZbDFUR

---

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | Next.js 15 App Router (React Server Components) |
| 언어 | TypeScript (strict) |
| 스타일 | Tailwind CSS v4 |
| UI 컴포넌트 | shadcn/ui |
| ORM | Prisma |
| DB | MariaDB (fomosv2) — 읽기 전용 |
| 패키지 매니저 | pnpm |
| 배포 | Vercel |

---

## 브랜드 & 디자인 토큰

```
Primary Red : #e6002d
Dark        : #111111
Gray bg     : #f5f5f5
Font        : Pretendard (Korean sans-serif)
Logo        : "FOMOS" 워드마크 (bold, primary red)
```

---

## DB 연결 — fomosv2 MariaDB

### 접속 정보 (`.env.local`에만 기재, 절대 커밋 금지)

```
DATABASE_URL="mysql://[user]:[password]@192.168.0.116:3306/fomosv2"
```

- **Master** (쓰기 전용): `192.168.0.116`
- **Slave 1** (읽기): `192.168.0.119`
- **Slave 2** (읽기): `192.168.0.120`
- 개발 중에는 **읽기 전용**만 사용. 프로덕션 DB에 쓰기 절대 금지.
- FK 관계 없음 — 테이블 간 조인은 컬럼 값 기반으로 수동 작성.

### 스키마 확인 방법

```bash
pnpm db:pull   # prisma db pull → schema.prisma 자동 생성
pnpm db:generate  # prisma generate → Prisma Client 생성
```

DB에 접근 가능해지면 반드시 `pnpm db:pull`을 먼저 실행하여 실제 컬럼명을 확인할 것.  
`lib/articles.ts` 등의 TODO 주석 위치에 실제 Prisma 쿼리를 채워 넣을 것.

---

## 파일 구조 (목표)

```
fomos-new/
├── app/
│   ├── layout.tsx          # Root layout (Pretendard 폰트, metadata)
│   ├── page.tsx            # 홈페이지
│   ├── news/
│   │   ├── page.tsx        # 뉴스 목록
│   │   └── [id]/page.tsx   # 뉴스 상세
│   ├── community/
│   │   ├── page.tsx        # 커뮤니티 목록
│   │   └── [id]/page.tsx   # 커뮤니티 글 상세
│   └── api/
│       └── ...             # API Routes (필요 시)
├── components/
│   ├── layout/
│   │   ├── site-header.tsx  # sticky 헤더
│   │   └── site-footer.tsx  # 푸터
│   ├── article/
│   │   ├── article-card.tsx
│   │   └── article-grid.tsx
│   └── ui/                 # shadcn/ui 컴포넌트
├── lib/
│   ├── db.ts               # Prisma 싱글톤
│   ├── articles.ts         # 기사 조회 함수
│   └── community.ts        # 커뮤니티 조회 함수
├── prisma/
│   └── schema.prisma       # db:pull 후 자동 생성
├── public/
├── .env.local              # 절대 커밋 금지
├── .env.example            # 커밋 가능 (비밀값 없음)
└── CLAUDE.md               # 이 파일
```

---

## 핵심 구현 우선순위

### Phase 1 — DB 연결 & 기사 노출 (최우선)
1. `pnpm db:pull` 실행 후 fomosv2 스키마 확인
2. `lib/articles.ts` — 최신 기사 목록, 기사 상세 구현
3. 홈페이지 Hero + 뉴스 그리드에 실제 DB 데이터 연결
4. 뉴스 상세 페이지 `/news/[id]`

### Phase 2 — 카테고리 & 검색
5. e스포츠 / 게임 / 방송 / 스포츠 카테고리별 필터
6. 검색 기능 (DB full-text 또는 LIKE 쿼리)

### Phase 3 — 커뮤니티
7. 커뮤니티 게시판 목록 / 상세
8. 인기글, 최신글 정렬

### Phase 4 — 추가 기능
9. 로그인 / 회원가입 (기존 포모스 계정 연동 여부 확인 필요)
10. 댓글, 좋아요 등 인터랙션

---

## 코딩 컨벤션

- **Server Component 기본**: 데이터 fetching은 RSC에서. `"use client"`는 인터랙션에만.
- **Prisma 싱글톤**: `lib/db.ts`의 `db` 인스턴스만 사용. 직접 `new PrismaClient()` 금지.
- **에러 처리**: DB 쿼리는 try/catch + 적절한 fallback UI.
- **타입 안전**: any 사용 금지. Prisma 자동 생성 타입 활용.
- **이미지**: `next/image` 사용. fomosv2 이미지 CDN URL 확인 필요.
- **날짜**: 한국 시간(KST) 기준 포맷. `Intl.DateTimeFormat` 사용.

---

## 보안 주의사항

- `.env.local` 절대 커밋 금지 (`.gitignore` 확인)
- DB 자격증명 코드에 하드코딩 금지
- 개발 중 프로덕션 DB write 절대 금지 (READ ONLY)
- 외부 API에 DB 자격증명 전송 금지

---

## 로컬 개발 시작

```bash
git clone https://github.com/DoriChoi/fomos-new.git
cd fomos-new
pnpm install
cp .env.example .env.local
# .env.local에 DB 접속 정보 입력

pnpm db:pull        # fomosv2 스키마 introspect
pnpm db:generate    # Prisma Client 생성
pnpm dev            # http://localhost:3000
```

---

## package.json 스크립트 (목표)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "db:pull": "prisma db pull",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio"
  }
}
```
