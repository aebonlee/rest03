# rest03 — 건설사 회사 사이트 템플릿

[chinhung.co.kr](https://www.chinhung.co.kr/) 의 디자인·구성을 참고하여 만든 **React 기반 건설사 회사 홈페이지 템플릿**입니다.
모든 이미지는 **플레이스홀더**로 표기되어 있어, 실제 이미지로 교체하기만 하면 바로 사용할 수 있습니다.

## 기술 스택

- **React 18** + **Vite 5**
- **React Router 6** (HashRouter — GitHub Pages 정적 호스팅 호환)
- **Tailwind CSS 3**
- 폰트: Pretendard (CDN)

## 구조

```
src/
├── main.jsx              # 진입점 (HashRouter)
├── App.jsx               # 라우팅
├── index.css             # Tailwind + 공통 스타일
├── data/
│   └── site.js           # ★ 회사정보·네비·사업·실적 데이터 (여기만 수정하면 대부분 반영)
├── components/
│   ├── Header.jsx        # 상단 GNB (데스크탑 메가메뉴 / 모바일 패널)
│   ├── Footer.jsx        # 푸터 (주소·Family site·정책링크)
│   ├── ScrollToTop.jsx   # 라우트 변경 시 스크롤 초기화
│   ├── ScrollToTopButton.jsx  # 우측하단 맨위로 버튼
│   ├── SubPageLayout.jsx # 서브페이지 공통 (sticky 탭 + 페이지헤드)
│   └── Placeholder.jsx   # 이미지 플레이스홀더
└── pages/
    ├── Home.jsx          # 메인 (히어로 슬라이더 / Our Business / 공지)
    ├── Business.jsx      # 사업소개 (카테고리 탭 + 실적 그리드 + 페이지네이션)
    ├── Sustainability.jsx# 지속가능경영 (품질경영 선언·방침·인증)
    ├── About.jsx         # 회사소개 (CEO인사말·연혁 등)
    ├── Investment.jsx    # 투자정보 (지배구조·재무·공시·공고·IR)
    ├── Support.jsx       # 고객센터 (공지 게시판·협력업체·문의 폼)
    ├── Recruit.jsx       # 인재채용 (인재상·채용공고)
    └── SimplePage.jsx    # 제보센터/법적고지 등 단순 페이지
```

## 구현된 스크롤/인터랙션 연출 (자체 구현)

- **메인 KV**: 가로 슬라이드 전환 + 와이드 진행률 바(폭 90%) + 스크롤 시 KV가 중앙으로 축소되며 카드 콜라주 4장 등장
- **GNB**: 메인 상단 투명 → 스크롤 시 흰 배경 전환, 전 컬럼 동시 노출 풀 메가메뉴(대메뉴와 수직 정렬)
- **서브페이지 탭**: 음수 sticky top — 타이틀은 스크롤되어 사라지고 탭 줄만 고정
- **비전/가치**: 페이지헤드 핀 + 클립패스 보텀업 리빌 (Vision → Mission → Core Values)
- **연혁**: 시대별 풀높이 이미지 스택 핀 + 120px 연대 텍스트 + 상세 카드 오버 스크롤
- **재무정보**: 세그먼트 탭 + 스크롤 진입 시 차오르는 CSS 바 차트 + 공시 테이블
- **공통**: IntersectionObserver 기반 `Reveal` 페이드인 컴포넌트

## 페이지 / 라우트

| 메뉴 | 경로 |
| --- | --- |
| 메인 | `/` |
| 회사소개 | `/about/greetings` `/about/vision` `/about/history` `/about/brand` |
| 사업소개 | `/business/housing` `…/building` `…/civil` `…/plant` `…/global` |
| 지속가능경영 | `/sustainability/ethical` `…/safety` `…/quality` `…/csr` |
| 투자정보           | `/investment/governance` `…/financial` `…/disclosure` `…/announcement` `…/report` |
| 고객센터           | `/support/notice` `…/partner` `…/contact`                          |
| 인재채용           | `/recruit/people` `…/jobs`                                         |

## 개발

```bash
npm install
npm run dev      # http://localhost:5173/rest03/
npm run build    # dist/
npm run preview
```

## 배포

`main` 브랜치 push 시 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드 후
GitHub Pages 에 배포합니다. 배포 URL: `https://aebonlee.github.io/rest03/`

> Vite `base` 가 `/rest03/` 로 설정되어 있습니다. 다른 경로/도메인에 배포하려면 `vite.config.js` 의 `base` 를 수정하세요.

## 커스터마이징

- **회사 정보 / 메뉴 / 실적**: `src/data/site.js`
- **브랜드 컬러**: `tailwind.config.js` 의 `colors.brand` / `colors.accent`
- **이미지 교체**: `Placeholder` 컴포넌트를 실제 `<img>` 로 교체
