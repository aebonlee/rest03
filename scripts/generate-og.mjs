// OG 이미지 생성 스크립트 (1200x630)
//  - sharp 로 SVG → PNG 렌더링. sharp 는 임시 의존성: `npm i -D sharp` 후 `node scripts/generate-og.mjs`
//  - 결과물 public/og-image.png 는 커밋되므로 빌드/런타임에 sharp 가 필요 없습니다.
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../public/og-image.png')

const FONT = "Pretendard, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif"

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1f0a4d"/>
      <stop offset="1" stop-color="#2e1065"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0" stop-color="#fb923c" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#fb923c" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- 좌상단 브랜드 마크 -->
  <circle cx="100" cy="96" r="13" fill="#fb923c"/>
  <text x="128" y="106" font-family="${FONT}" font-size="30" font-weight="700" fill="#d6c8f5">DreamIT Biz</text>

  <!-- 메인 타이틀 -->
  <text x="100" y="330" font-family="${FONT}" font-size="120" font-weight="800" fill="#ffffff">DreamIT Biz</text>

  <!-- 서브 카피 -->
  <text x="104" y="402" font-family="${FONT}" font-size="40" font-weight="500" fill="#cdbcf2">사람과 기술을 잇는 디지털 경험</text>

  <!-- 액센트 바 -->
  <rect x="104" y="446" width="132" height="7" rx="3.5" fill="#fb923c"/>

  <!-- 하단 URL -->
  <text x="100" y="566" font-family="${FONT}" font-size="34" font-weight="600" fill="#a98fe6">www.dreamitbiz.com</text>
</svg>
`

const png = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(out, png)
console.log('생성 완료:', out, `(${png.length} bytes)`)
