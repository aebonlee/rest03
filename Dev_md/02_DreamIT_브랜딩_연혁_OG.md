# 02. DreamIT Biz 브랜딩 · 연혁 연출 · 모바일/OG

작업일: 2026-06-11 ~ 2026-06-12

## 개요
chinhung 기반 건설사 템플릿을 **DreamIT Biz** 운영 기준으로 정리하고, 연혁 페이지 연출을
원본(about-history)에 맞춰 다듬은 뒤, 모바일·링크 미리보기(OG)까지 마무리.

## 작업 내역

### 1. 외부 작업 자료 반영 (Downloads → repo)
- `~/Downloads/rest03`(및 하위 폴더/zip)의 추가 개발분을 신/구 판별 후 **덮어쓰기 반영**.
- 투자정보·고객센터·인재채용 페이지, Placeholder/site 데이터, 히어로·메뉴 보강 등 누적 반영.
- ⚠️ Downloads 폴더가 채팅 작업본보다 뒤처지면 통째 덮어쓰기 시 최신 작업이 사라짐 →
  이후에는 **변경 파일만** repo→Downloads로 동기화하며 진행.

### 2. 헤더
- 대메뉴(정중앙 고정) 좌우 여백 대칭용 **투명 스페이서**(로고 폭 복제) 추가.
- 데스크탑 GNB 반응형 기준 `min-[1441px]`.
- 로고↔첫 메뉴 간격 확대: 대메뉴+메가메뉴를 우측으로 **5rem** 이동(정렬 동일 보정).

### 3. 푸터 / 회사정보 (DreamIT Biz)
- 효성 패밀리사이트·진흥 주소 제거 → **DreamIT Biz** 연락처 + `www.dreamitbiz.com` 바로가기.
- 실제 사업자 정보 반영: 대표 이애본(Ph.D)/겸임교수, 사업자등록번호, 통신판매신고, 출판사 신고번호.
- CEO 인사말 서명 `CHINHUNG` → `company.name`.

### 4. 연혁(`/about/history`) 연출
- 원본은 **GSAP ScrollTrigger** 기반(풀스크린 시대 이미지 핀 + 상세 덮기).
- 여러 시도(겹침/모핑) 후, **콘텐츠 가림 없이 일자별 내역이 항상 보이는** 안정형으로 확정:
  좌측 sticky 시대 비주얼(이미지+연대+설명, 스크롤 시 1→0.9 축소) + 우측 일자별 타임라인(점 표시).
- GSAP 의존성 미도입(rAF 스크롤 진행도 사용).

### 5. 모바일 최적화
- 히어로 카피 폰트/여백 단계 조정, 푸터 간격·줄바꿈 정리.
- **페이지헤드 `32/9` 초와이드 → 모바일 `aspect-[16/10]`, md↑ `32/9`** (공통 SubPageLayout 포함 4곳).
  `Placeholder`의 인라인 `aspectRatio`를 `ratio="auto"`+래퍼 비율로 우회.

### 6. Open Graph (링크 미리보기)
- `index.html`에 og:type/url/site_name/title/description/image(+w/h/alt)/locale, twitter card, theme-color.
- `public/og-image.png`(1200×630): **sharp 임시 설치→생성→제거**(`scripts/generate-og.mjs` 보존).
- `public/favicon.svg`: 깨진 `/vite.svg` 대체.
- 라이브 검증: og-image 200/image-png, 메타 노출 확인.

## 검증 / 배포
- 매 변경 `npm run build` 통과, `.github/workflows/deploy.yml`로 GitHub Pages 자동 배포(전 건 success).
- 배포 URL: https://aebonlee.github.io/rest03/

## 재생성 메모
- OG 이미지 수정: `npm i -D sharp` → 문구 편집 후 `node scripts/generate-og.mjs` → `npm uninstall sharp`.

## TODO (후속)
- 실제 이미지(현재 picsum 데모) 교체.
- OG 제목/설명 문구 확정, 카카오 디버거 캐시 초기화.
- 원본 GSAP 연혁 모핑이 필요하면 `about-history.js` 확보 후 이식.
