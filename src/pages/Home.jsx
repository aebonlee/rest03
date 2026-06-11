import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Placeholder from '../components/Placeholder'
import {
  heroSlides,
  heroQuickLinks,
  mainCards,
  businessCards,
  ongoingProjects,
  notices,
} from '../data/site'

// ============================================================
// 메인 페이지
//  Hero → MainCards → AboutBand → OurBusiness → Ongoing
//  → SustainabilityBand → MoreToDiscover → IRBand
// ============================================================

// ---------- 1. 히어로 슬라이더 ----------
function Hero() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const t = setInterval(() => setIdx((i) => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [paused])

  const go = (dir) => setIdx((i) => (i + dir + heroSlides.length) % heroSlides.length)

  return (
    <section
      className="relative h-screen min-h-[560px] w-full overflow-hidden bg-neutral-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((s, i) => (
        <div
          key={s.label}
          className={[
            'absolute inset-0 transition-opacity duration-1000',
            i === idx ? 'opacity-100' : 'pointer-events-none opacity-0',
          ].join(' ')}
        >
          <Placeholder label={s.label} ratio="auto" className="h-full" dark />
          {/* 살짝 어두운 오버레이로 텍스트 가독성 확보 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          {/* 카피 */}
          <div className="absolute inset-0 flex items-end">
            <p
              className={[
                'whitespace-pre-line px-[5%] pb-36 text-5xl font-medium leading-tight text-white drop-shadow md:text-7xl lg:text-8xl',
                i === idx ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                'transition-all duration-1000',
              ].join(' ')}
            >
              {s.copy}
            </p>
          </div>
        </div>
      ))}

      {/* 좌하단: 슬라이드 컨트롤 (이전/카운터/다음) */}
      <div className="absolute bottom-10 left-[5%] z-10 flex items-center gap-4 text-white">
        <button
          type="button"
          aria-label="이전 슬라이드"
          onClick={() => go(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/20"
        >
          ‹
        </button>
        <p className="text-sm font-semibold tracking-widest">
          {String(idx + 1).padStart(2, '0')}
          <span className="mx-1.5 text-white/50">/</span>
          <span className="text-white/50">{String(heroSlides.length).padStart(2, '0')}</span>
        </p>
        <button
          type="button"
          aria-label="다음 슬라이드"
          onClick={() => go(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/20"
        >
          ›
        </button>
      </div>

      {/* 우하단: 퀵링크 */}
      <div className="absolute bottom-10 right-[5%] z-10 hidden gap-3 md:flex">
        {heroQuickLinks.map((q) => (
          <a
            key={q.label}
            href={q.href}
            className={[
              'flex items-center gap-3 rounded-full px-6 py-3.5 text-white transition',
              q.variant === 'brand'
                ? 'bg-brand hover:brightness-150'
                : 'bg-stone-500/90 hover:brightness-110',
            ].join(' ')}
          >
            {q.label} <span>→</span>
          </a>
        ))}
      </div>

      {/* 중앙하단: 인디케이터 + 스크롤 안내 */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <div className="flex gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.label}
              type="button"
              aria-label={`슬라이드 ${i + 1}`}
              onClick={() => setIdx(i)}
              className={[
                'h-1.5 rounded-full transition-all',
                i === idx ? 'w-8 bg-white' : 'w-2 bg-white/50',
              ].join(' ')}
            />
          ))}
        </div>
        <span className="animate-bounce text-xs font-medium tracking-widest text-white/70">
          SCROLL ↓
        </span>
      </div>
    </section>
  )
}

// ---------- 2. 메인 카드 4장 ----------
function MainCards() {
  return (
    <section className="section-x mx-auto -mt-16 max-w-container md:-mt-20">
      <ul className="relative z-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {mainCards.map((c) => (
          <li key={c.key}>
            <Link
              to={c.to}
              className="group block overflow-hidden rounded-xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <Placeholder
                  label={c.title}
                  ratio="4/3"
                  className="transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-5">
                <p className="mb-1 font-bold text-neutral-900 md:text-lg">{c.title}</p>
                <p className="hidden text-sm text-neutral-500 md:block">{c.desc}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ---------- 3. 회사소개 밴드 ----------
function AboutBand() {
  const links = [
    { label: 'CEO 인사말', to: '/about/greetings' },
    { label: '비전/가치', to: '/about/vision' },
    { label: '연혁', to: '/about/history' },
    { label: '브랜드소개', to: '/about/brand' },
  ]
  return (
    <section className="py-24 text-center md:py-32">
      <p className="mx-auto mb-12 max-w-3xl px-6 text-2xl font-bold leading-snug text-neutral-800 md:text-3xl">
        1959년 창립 이후, 대한민국 건설 산업과 함께 성장해 왔습니다.
        <br className="hidden md:block" />
        오랜 현장에서 쌓아온 기술력으로 더 나은 내일의 기반을 만듭니다.
      </p>
      <ul className="flex flex-wrap justify-center gap-4 px-4">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="relative inline-flex items-center gap-3 rounded-full bg-neutral-100 py-4 pl-6 pr-12 font-bold transition hover:bg-neutral-200"
            >
              {l.label}
              <span className="absolute right-5 text-neutral-500">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ---------- 4. Our Business (데스크탑: 호버 확장 패널 / 모바일: 가로 스크롤) ----------
function OurBusiness() {
  const [active, setActive] = useState(0)

  return (
    <section className="pb-24 md:pb-32">
      <div className="section-x mx-auto max-w-container">
        <h2 className="mb-12 text-4xl font-bold leading-tight text-brand md:text-6xl">
          Our Business
          <br />
          Shaping the Future
        </h2>
      </div>

      {/* 데스크탑: 호버 시 가로로 확장되는 패널 */}
      <div className="section-x mx-auto hidden max-w-container gap-3 lg:flex">
        {businessCards.map((b, i) => (
          <Link
            key={b.key}
            to={b.to}
            onMouseEnter={() => setActive(i)}
            className={[
              'group relative h-[480px] overflow-hidden rounded-2xl transition-all duration-500',
              active === i ? 'flex-[2.4]' : 'flex-1',
            ].join(' ')}
          >
            <Placeholder label={b.title} ratio="auto" className="h-full" dark />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <p className="mb-3 text-2xl font-bold">{b.title}</p>
              <p
                className={[
                  'max-w-sm text-sm leading-6 transition-all duration-500',
                  active === i ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                ].join(' ')}
              >
                {b.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* 모바일/태블릿: 가로 스크롤 카드 */}
      <div className="flex gap-5 overflow-x-auto px-4 pb-4 md:px-10 lg:hidden">
        {businessCards.map((b) => (
          <Link
            key={b.key}
            to={b.to}
            className="relative h-[360px] w-64 shrink-0 overflow-hidden rounded-xl"
          >
            <Placeholder label={b.title} ratio="auto" className="h-full" dark />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <p className="mb-3 text-xl font-bold">{b.title}</p>
              <p className="text-sm leading-6 text-white/90">{b.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ---------- 5. 시공 중인 프로젝트 캐러셀 ----------
function OngoingProjects() {
  const trackRef = useRef(null)
  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="bg-neutral-50 py-24 md:py-32">
      <div className="section-x mx-auto mb-10 flex max-w-container items-end justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-widest text-neutral-400">
            ON-GOING PROJECTS
          </p>
          <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl">
            시공 중인 프로젝트
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            aria-label="이전"
            onClick={() => scrollBy(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-brand hover:text-brand"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="다음"
            onClick={() => scrollBy(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-brand hover:text-brand"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x gap-6 overflow-x-auto px-4 pb-4 md:px-10 lg:px-24 xl:px-40"
      >
        {ongoingProjects.map((p) => (
          <Link
            key={p.title}
            to={p.to}
            className="group w-80 shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg"
          >
            <div className="overflow-hidden">
              <Placeholder
                label="PROJECT"
                ratio="16/10"
                className="transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="mb-1 text-xs font-semibold tracking-widest text-brand">
                {p.region}
              </p>
              <p className="mb-4 text-lg font-bold leading-snug text-neutral-900">
                {p.title}
              </p>
              <p className="text-sm font-semibold text-neutral-500 transition group-hover:text-brand">
                페이지 보기 →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ---------- 6. 지속가능경영 밴드 ----------
function SustainabilityBand() {
  return (
    <section className="relative h-[480px] w-full overflow-hidden md:h-[600px]">
      <Placeholder label="SUSTAINABILITY BG" ratio="auto" className="h-full" dark />
      <div className="absolute inset-0 flex flex-col justify-center bg-black/35 px-4 md:px-10 lg:px-40">
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
            className="inline-flex items-center gap-3 rounded-full bg-white/90 px-6 py-3.5 font-bold text-brand transition hover:bg-white"
          >
            전체보기 <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ---------- 7. More to Discover (공지) ----------
function MoreToDiscover() {
  return (
    <section className="py-24 md:py-32">
      <div className="section-x mx-auto flex max-w-container flex-col">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b-2 border-neutral-400 pb-10 md:flex-row md:items-center">
          <p className="text-4xl font-bold text-brand md:text-6xl">More to Discover</p>
          <Link
            to="/support/notice"
            className="relative inline-flex items-center gap-3 rounded-full bg-neutral-100 py-4 pl-6 pr-12 font-bold transition hover:bg-neutral-200"
          >
            전체보기 <span className="absolute right-5 text-neutral-500">→</span>
          </Link>
        </div>

        <ul className="flex flex-col divide-y divide-neutral-200">
          {notices.slice(0, 4).map((n) => (
            <li key={n.id}>
              <Link
                to="/support/notice"
                className="flex flex-col justify-between gap-1 py-5 transition hover:text-brand md:flex-row md:items-center"
              >
                <span className="text-lg font-semibold md:text-xl">{n.title}</span>
                <span className="text-sm text-neutral-500 md:text-base">{n.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ---------- 8. Investor Relations 밴드 ----------
function IRBand() {
  return (
    <section className="bg-brand-deep py-24 text-white md:py-32">
      <div className="section-x mx-auto flex max-w-container flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold tracking-widest text-white/60">
            INVESTOR RELATIONS
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">투자정보</h2>
          <p className="max-w-xl leading-7 text-white/80">
            투명한 경영과 꾸준한 혁신으로 기업 경쟁력을 키우고,
            안정적인 성장 구조를 만들어갑니다.
          </p>
        </div>
        <Link
          to="/investment/governance"
          className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-brand transition hover:bg-neutral-100"
        >
          전체보기 <span>→</span>
        </Link>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <MainCards />
      <AboutBand />
      <OurBusiness />
      <OngoingProjects />
      <SustainabilityBand />
      <MoreToDiscover />
      <IRBand />
    </>
  )
}
