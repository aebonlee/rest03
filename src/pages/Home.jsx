import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Placeholder from '../components/Placeholder'
import {
  heroSlides,
  heroQuickLinks,
  mainCards,
  businessCards,
  notices,
} from '../data/site'

// ============================================================
// 메인 페이지 (원본 사이트 실측값 기반 자체 구현)
//  Hero(스크롤 축소 + 카드 콜라주) → AboutBand → OurBusiness(캐러셀, 하단 겹침)
//  → SustainabilityBand → MoreToDiscover → IRBand
// ============================================================

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

// ---------- 1. 히어로 — 스크롤 시 KV 축소 + 카드 콜라주 등장 ----------
function Hero() {
  const wrapRef = useRef(null)
  const [progress, setProgress] = useState(0) // 0(최상단) ~ 1(연출 종료)
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  // 스크롤 진행률 (rAF 스로틀)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current
        if (!el) return
        const total = el.offsetHeight - window.innerHeight
        const y = clamp(-el.getBoundingClientRect().top, 0, total)
        setProgress(total > 0 ? y / total : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // 자동 슬라이드 — 축소 연출 중에는 정지
  const shrunk = progress > 0.1
  useEffect(() => {
    if (paused || shrunk) return undefined
    const t = setTimeout(() => setIdx((i) => (i + 1) % heroSlides.length), 5000)
    return () => clearTimeout(t)
  }, [paused, idx, shrunk])

  const go = (dir) => setIdx((i) => (i + dir + heroSlides.length) % heroSlides.length)

  // 보간 값: KV 100%→46% 폭, 모서리 0→20px, UI는 초반에 페이드아웃, 카드는 중후반 등장
  const kvW = 100 - progress * 54
  const kvH = 100 - progress * 42
  const radius = progress * 20
  const chrome = clamp(1 - progress * 2.5, 0, 1)
  const cardsIn = clamp((progress - 0.3) / 0.55, 0, 1)

  return (
    <section ref={wrapRef} className="relative h-[230vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* KV — 화면 중앙으로 축소 */}
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative overflow-hidden bg-neutral-900"
            style={{ width: `${kvW}%`, height: `${kvH}%`, borderRadius: `${radius}px` }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* 슬라이드 트랙 — 가로 슬라이드 전환 */}
            <div
              className="flex h-full transition-transform duration-700 ease-out"
              style={{
                width: `${heroSlides.length * 100}%`,
                transform: `translateX(-${idx * (100 / heroSlides.length)}%)`,
              }}
            >
              {heroSlides.map((s, i) => (
                <div
                  key={s.label}
                  className="relative h-full"
                  style={{ width: `${100 / heroSlides.length}%` }}
                >
                  <Placeholder label={s.label} ratio="auto" className="h-full" dark />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
                  <div className="absolute inset-0 flex items-end">
                    <p
                      className={[
                        'whitespace-pre-line px-[5%] pb-44 text-5xl font-medium leading-tight text-white drop-shadow md:text-7xl lg:text-8xl',
                        i === idx
                          ? 'translate-y-0 opacity-100 delay-300'
                          : 'translate-y-10 opacity-0',
                        'transition-all duration-1000',
                      ].join(' ')}
                    >
                      {s.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 슬라이더 UI — 축소 시작 시 페이드아웃 */}
            <div style={{ opacity: chrome }} className={chrome === 0 ? 'pointer-events-none' : ''}>
              {/* 와이드 진행률 바 — 폭 90%, 하단 100px */}
              <div className="absolute bottom-[6.25rem] left-1/2 z-10 h-[2px] w-[90%] -translate-x-1/2 overflow-hidden bg-white/[0.32]">
                <span
                  key={`${idx}-${paused}`}
                  className="block h-full bg-white"
                  style={{
                    animation: paused ? 'none' : 'heroProgress 5s linear forwards',
                    width: paused ? '100%' : undefined,
                  }}
                />
              </div>

              {/* 좌하단: 퀵링크 (원본 위치 — left 5%, 두 번째는 +250px) */}
              <a
                href={heroQuickLinks[0].href}
                className="absolute bottom-8 left-[5%] z-10 hidden rounded-full bg-brand py-3.5 pl-6 pr-14 text-white transition hover:brightness-150 md:block"
              >
                {heroQuickLinks[0].label}
                <span className="absolute right-6 top-1/2 -translate-y-1/2">→</span>
              </a>
              <a
                href={heroQuickLinks[1].href}
                className="absolute bottom-8 left-[calc(5%+250px)] z-10 hidden rounded-full bg-stone-500 py-3.5 pl-6 pr-14 text-white transition hover:brightness-110 md:block"
              >
                {heroQuickLinks[1].label}
                <span className="absolute right-6 top-1/2 -translate-y-1/2">→</span>
              </a>

              {/* 우하단: 이전/다음 (36px 원형) */}
              <div className="absolute bottom-10 right-[5%] z-10 flex gap-3">
                <button
                  type="button"
                  aria-label="이전 슬라이드"
                  onClick={() => go(-1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white/20"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="다음 슬라이드"
                  onClick={() => go(1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white/20"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 콜라주 — KV가 줄어들면 양옆에서 등장 (원본 비율: 47.5/68/68/80.4%) */}
        <div
          className="pointer-events-none absolute inset-0 hidden grid-cols-2 gap-[27%] px-10 py-10 lg:grid"
          style={{ opacity: cardsIn }}
        >
          {/* 좌측 컬럼 — 우측 정렬, 상단부터 */}
          <div
            className="flex flex-col items-end gap-2 transition-transform"
            style={{ transform: `translateX(${(cardsIn - 1) * 60}px)` }}
          >
            <Link
              to={mainCards[0].to}
              className="pointer-events-auto w-[47.5%] overflow-hidden rounded-xl shadow-lg transition hover:-translate-y-1"
            >
              <Placeholder label={mainCards[0].title} ratio="4/3" />
            </Link>
            <Link
              to={mainCards[1].to}
              className="pointer-events-auto w-[68%] overflow-hidden rounded-xl shadow-lg transition hover:-translate-y-1"
            >
              <Placeholder label={mainCards[1].title} ratio="4/3" />
            </Link>
          </div>
          {/* 우측 컬럼 — 하단 정렬 */}
          <div
            className="flex h-full flex-col justify-end gap-2 transition-transform"
            style={{ transform: `translateX(${(1 - cardsIn) * 60}px)` }}
          >
            <Link
              to={mainCards[2].to}
              className="pointer-events-auto w-[68%] overflow-hidden rounded-xl shadow-lg transition hover:-translate-y-1"
            >
              <Placeholder label={mainCards[2].title} ratio="4/3" />
            </Link>
            <Link
              to={mainCards[3].to}
              className="pointer-events-auto w-[80.4%] overflow-hidden rounded-xl shadow-lg transition hover:-translate-y-1"
            >
              <Placeholder label={mainCards[3].title} ratio="4/3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- 2. 회사소개 밴드 (py-40, 알약 버튼 py-5 pl-5 pr-14) ----------
function AboutBand() {
  const links = [
    { label: 'CEO 인사말', to: '/about/greetings' },
    { label: '비전/가치', to: '/about/vision' },
    { label: '연혁', to: '/about/history' },
    { label: '브랜드 소개', to: '/about/brand' },
  ]
  return (
    <section className="py-24 text-center lg:py-40">
      <p className="mx-auto mt-6 max-w-3xl px-6 text-2xl font-bold leading-snug text-neutral-800 md:text-3xl">
        1959년 창립 이후, 대한민국 건설 산업과 함께 성장해 왔습니다.
        <br className="hidden md:block" />
        오랜 현장에서 쌓아온 기술력으로 더 나은 내일의 기반을 만듭니다.
      </p>
      <ul className="mt-16 flex flex-wrap justify-center gap-4 px-4 font-bold">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="relative inline-block rounded-full bg-neutral-100 py-5 pl-5 pr-14 transition hover:bg-neutral-200"
            >
              {l.label}
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-500">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ---------- 3. Our Business — 캐러셀 + 하단 섹션 겹침(-mb-48) ----------
function OurBusiness() {
  const trackRef = useRef(null)
  const next = () => trackRef.current?.scrollBy({ left: 460, behavior: 'smooth' })

  return (
    <section className="relative z-10 -mb-48 py-24 lg:py-40">
      {/* 헤딩 — 원본: pl-60, text-7xl, violet-950 */}
      <div className="mb-12 px-4 md:px-10 lg:pl-60">
        <p className="text-4xl font-bold leading-tight text-brand md:text-6xl lg:text-7xl">
          Our Business
          <br />
          Shaping the Future
        </p>
      </div>

      <div className="relative">
        {/* 카드 트랙 — 카드 내부 p-11, 제목 text-4xl mb-8 */}
        <div
          ref={trackRef}
          className="flex snap-x gap-5 overflow-x-auto px-4 pb-4 md:px-10 lg:pl-60"
        >
          {businessCards.map((b) => (
            <Link
              key={b.key}
              to={b.to}
              className="group relative h-[420px] w-72 shrink-0 snap-start overflow-hidden rounded-xl md:h-[560px] md:w-[420px]"
            >
              <Placeholder label={b.title} ratio="auto" className="h-full" dark />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-white md:p-11">
                <p className="mb-4 text-2xl font-bold md:mb-8 md:text-4xl">{b.title}</p>
                <p className="text-base leading-7 md:text-xl md:leading-8">{b.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* 다음 버튼 — 원본 64px 원형, 우측 */}
        <button
          type="button"
          aria-label="다음 카드"
          onClick={next}
          className="absolute right-6 top-1/2 z-10 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl text-brand shadow-lg transition hover:scale-105 lg:flex"
        >
          ›
        </button>
      </div>
    </section>
  )
}

// ---------- 4. 지속가능경영 밴드 — 풀폭 BG, OurBusiness 카드가 상단에 겹침 ----------
function SustainabilityBand() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Placeholder label="SUSTAINABILITY BG" ratio="auto" className="h-full" dark />
        <div className="absolute inset-0 bg-black/35" />
      </div>
      {/* 콘텐츠 — 겹침 보정을 위해 상단 패딩 크게 (원본 섹션 높이 ~978px) */}
      <div className="relative flex min-h-[640px] flex-col justify-center px-4 pb-24 pt-72 md:px-10 lg:min-h-[860px] lg:px-60">
        <p className="mb-4 text-sm font-semibold tracking-widest text-white/80">
          SUSTAINABILITY
        </p>
        <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
          지속 가능한 내일을
          <br />
          함께 만들어갑니다
        </h2>
        <p className="mb-8 max-w-xl leading-7 text-white/85">
          환경과 사회를 생각하는 책임 있는 건설을 실천하고, 효율적인 자원 관리와
          친환경 기술로 다음 세대가 살아갈 기반을 준비합니다.
        </p>
        <div>
          <Link
            to="/sustainability/ethical"
            className="relative inline-block rounded-full bg-white/90 py-5 pl-5 pr-14 font-bold text-brand transition hover:bg-white"
          >
            전체보기
            <span className="absolute right-5 top-1/2 -translate-y-1/2">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ---------- 5. More to Discover — py-40 px-60, text-7xl, border-b-2 ----------
function MoreToDiscover() {
  return (
    <section className="px-4 py-24 md:px-10 lg:px-60 lg:py-40">
      <div className="mx-auto flex max-w-container flex-col">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b-2 border-neutral-500 pb-12 font-bold md:flex-row md:items-center">
          <p className="text-4xl text-brand md:text-6xl lg:text-7xl">More to Discover</p>
          <Link
            to="/support/notice"
            className="relative inline-block rounded-full bg-neutral-100 py-5 pl-5 pr-14 transition hover:bg-neutral-200"
          >
            전체보기
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-500">
              →
            </span>
          </Link>
        </div>

        <ul className="flex flex-col divide-y divide-neutral-200">
          {notices.slice(0, 5).map((n) => (
            <li key={n.id}>
              <Link
                to="/support/notice"
                className="flex flex-col justify-between gap-1 py-5 transition hover:text-brand md:flex-row md:items-center"
              >
                <span className="truncate text-xl font-semibold md:text-2xl md:leading-8">
                  {n.title}
                </span>
                <span className="shrink-0 text-sm text-neutral-500 md:text-base">
                  {n.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ---------- 6. Investor Relations 밴드 — 풀폭 BG, 높이 620px ----------
function IRBand() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Placeholder label="IR BG" ratio="auto" className="h-full" dark />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative flex min-h-[480px] flex-col justify-center px-4 md:px-10 lg:min-h-[620px] lg:px-60">
        <p className="mb-4 text-sm font-semibold tracking-widest text-white/70">
          INVESTOR RELATIONS
        </p>
        <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-5xl">
          투자정보
        </h2>
        <p className="mb-8 max-w-xl leading-7 text-white/85">
          투명한 경영과 꾸준한 혁신으로 기업 경쟁력을 키우고, 안정적인 성장 구조를
          만들어갑니다.
        </p>
        <div>
          <Link
            to="/investment/governance"
            className="relative inline-block rounded-full bg-white/90 py-5 pl-5 pr-14 font-bold text-brand transition hover:bg-white"
          >
            전체보기
            <span className="absolute right-5 top-1/2 -translate-y-1/2">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <AboutBand />
      <OurBusiness />
      <SustainabilityBand />
      <MoreToDiscover />
      <IRBand />
    </>
  )
}
