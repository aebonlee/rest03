import { useState, useEffect, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import Placeholder from '../components/Placeholder'
import Reveal from '../components/Reveal'

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

const tabs = [
  { label: 'CEO 인사말', to: '/about/greetings' },
  { label: '비전/가치', to: '/about/vision' },
  { label: '연혁', to: '/about/history' },
  { label: '브랜드 소개', to: '/about/brand' },
]

const pages = {
  greetings: { headLabel: 'Greetings', en: 'CEO Message', title: 'CEO 인사말' },
  vision: { headLabel: 'Vision', en: 'Vision & Value', title: '비전/가치' },
  history: { headLabel: 'History', en: 'History', title: '연혁' },
  brand: { headLabel: 'Brand', en: 'Brand', title: '브랜드 소개' },
}

// ============================================================
// 비전 페이지 헤드 — 스크롤 핀 + 클립패스 창 확장 연출
//  Vision(기본) → Mission(1단계) → Core Values(2단계)가 차례로 드러남
//  ※ 문구는 템플릿용 자체 카피
// ============================================================
const visionLayers = [
  {
    label: 'VISION HEAD 01',
    title: 'Vision',
    body: '공간의 가치를 높여\n삶의 기반을 만드는 건설 파트너',
  },
  {
    label: 'VISION HEAD 02',
    title: 'Mission',
    body: '사람과 환경이 어우러지는 공간을 통해\n일상의 가치를 높이고, 신뢰받는\n건설 문화를 만들어갑니다.',
  },
  {
    label: 'VISION HEAD 03',
    title: 'Core Values',
    body: '고객 중심 · 품질 우선 · 혁신과 도전 · 상생 협력.\n네 가지 가치를 모든 의사결정의\n기준으로 삼습니다.',
  },
]

function VisionHead() {
  const wrapRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current
        if (!el) return
        const total = el.offsetHeight - (window.innerHeight - 96)
        const y = clamp(96 - el.getBoundingClientRect().top, 0, total)
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

  // 2단계 보간: 0~0.5 → Mission 리빌, 0.5~1 → Core Values 리빌
  const stage = [1, clamp(progress * 2, 0, 1), clamp(progress * 2 - 1, 0, 1)]
  // 클립패스 — 아래에서 위로 커튼이 올라오듯 드러남 (실측: inset(945px→10px, 좌우 4px, 하단 10px))
  const clip = (s) => `inset(${(1 - s) * 100}% 4px 10px)`

  return (
    <section
      ref={wrapRef}
      className="relative"
      style={{ height: 'calc(100vh - 6rem + 946px)' }}
    >
      <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-hidden bg-neutral-900">
        {visionLayers.map((l, i) => (
          <div
            key={l.title}
            className="absolute inset-0"
            style={
              i === 0
                ? undefined
                : { clipPath: clip(stage[i]), visibility: stage[i] > 0 ? 'visible' : 'hidden' }
            }
          >
            <Placeholder label={l.label} ratio="auto" className="h-full" dark />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col flex-wrap content-start justify-start gap-10 px-6 pt-32 text-white md:flex-row md:justify-between md:px-20 lg:px-60 lg:pt-80">
              <p className="text-5xl font-semibold leading-none lg:text-[4.13rem]">
                {l.title}
              </p>
              <p className="whitespace-pre-line text-lg font-medium leading-8 lg:text-[1.38rem]">
                {l.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ---------- 비전 본문 — Management policy 카드 (스크롤 페이드인) ----------
const policies = [
  { title: '고객 중심', desc: '고객의 기대를 먼저 읽고, 기대 이상의 결과로 답합니다.' },
  { title: '품질 우선', desc: '한 번의 타협 없이, 모든 공정에서 최고의 품질을 지킵니다.' },
  { title: '혁신과 도전', desc: '변화를 두려워하지 않고 새로운 방법을 먼저 시도합니다.' },
  { title: '상생 협력', desc: '협력사·지역사회와 함께 성장하는 현장을 만듭니다.' },
]

function Vision() {
  return (
    <div>
      {/* 헤딩 — 원본: 76px semibold violet-950 mb-20 */}
      <p className="mb-12 text-5xl font-semibold leading-none text-brand lg:mb-20 lg:text-[4.75rem]">
        Management policy
      </p>

      {/* 카드 — 원본: basis-2/5, gap-x 100px / gap-y 72px, 이미지 h-96, p-12 */}
      <ul className="flex flex-wrap gap-x-10 gap-y-12 pb-10 lg:gap-x-[6.25rem] lg:gap-y-[4.5rem] lg:pb-36">
        {policies.map((v, i) => (
          <li key={v.title} className="w-full grow md:basis-2/5">
            <Reveal delay={(i % 2) * 120}>
              <div className="relative overflow-hidden rounded-xl">
                <Placeholder label={v.title} ratio="auto" className="h-72 lg:h-96" dark />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 text-white lg:p-12">
                  <p className="mb-4 text-3xl font-bold lg:mb-6 lg:text-4xl">{v.title}</p>
                  <p className="text-lg font-medium leading-8 lg:text-[1.63rem]">{v.desc}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---------- CEO 인사말 — 서한문 아티클 레이아웃 (문구는 템플릿용 자체 카피) ----------
function Greetings() {
  return (
    <div>
      {/* 헤딩 — 원본: text-4xl violet-950, 하단 border-b-2 stone-300 */}
      <p className="mb-10 flex items-end justify-between border-b-2 border-stone-300 pb-8 text-3xl font-bold text-brand md:text-4xl">
        CEO 인사말
      </p>

      <div className="break-words py-3 text-lg leading-8 md:text-[1.38rem]">
        <p className="font-medium text-neutral-700">
          안녕하십니까. 홈페이지를 찾아주신 여러분께 진심으로 감사드립니다.
          <br />
          <span className="font-bold text-black">우리 회사</span>는 1959년 창립 이후 주택,
          건축, 토목, 플랜트, 해외사업 전 영역에서 현장 경험과 기술력을 쌓아 왔으며,{' '}
          <span className="font-bold text-black">고객과 시장이 보내주신 신뢰</span>를 가장
          큰 자산으로 여기고 있습니다.
        </p>

        {/* 풀쿼트 — 원본: text-2xl bold */}
        <p className="mt-10 text-xl font-bold md:text-2xl">
          “기본에 충실한 실행력으로, 고객에게 더 나은 가치를 전하는 회사가 되겠습니다.”
        </p>

        <p className="mt-10 font-medium text-neutral-700">
          <span className="font-bold text-black">디지털 전환과 스마트 건설기술</span>을
          현장과 경영 전반에 접목하여 생산성과 관리 정밀도를 높이고, 예측 가능한 사업관리
          체계를 만들어가겠습니다.
          <br />
          또한 <span className="font-bold text-black">투명경영과 준법·윤리</span>를 경영의
          기본 원칙으로 삼고, ESG 실천과 사회적 책임 이행을 통해{' '}
          <span className="font-bold text-black">지속가능한 성장</span>을 추구하겠습니다.
        </p>

        <p className="mt-10 font-medium text-neutral-700">
          <span className="font-bold text-black">안전과 품질을 최우선 과제</span>로 삼고,
          고객·협력사·임직원·지역사회와 함께 더 큰 가치를 만들어가겠습니다.
          <br />
          변함없는 관심과 성원을 부탁드립니다. 감사합니다.
        </p>

        {/* 서명 — 원본: 우측 정렬, 회사명 text-4xl bold */}
        <p className="mt-10 text-right font-semibold">
          <span className="text-3xl font-bold md:text-4xl">CHINHUNG</span>
          <br />
          대표이사
        </p>
      </div>
    </div>
  )
}

// ---------- 연혁 — 시대별 스택 핀 연출 (원본 실측: 런웨이 70.88rem, 연대 텍스트 7.5rem) ----------
const eras = [
  {
    range: '2018 ~ 2025',
    label: 'HISTORY 01',
    summary: '디지털 전환과 함께 새로운 성장 동력을 만들어가는 시기',
    items: [
      { date: '2024. 12', event: '신규 수주 목표 조기 달성' },
      { date: '2024. 03', event: '스마트 건설기술 도입 확대' },
      { date: '2022. 06', event: '안전경영 체계 고도화' },
      { date: '2021. 04', event: '친환경 건축 인증 단지 준공' },
      { date: '2019. 05', event: '스마트 안전관리 시스템 현장 도입' },
      { date: '2018. 03', event: '주거 브랜드 리뉴얼' },
    ],
  },
  {
    range: '2000 ~ 2017',
    label: 'HISTORY 02',
    summary: '사업 다각화와 품질 체계 고도화로 기반을 다진 시기',
    items: [
      { date: '2015. 07', event: '해외 인프라 사업 진출' },
      { date: '2010. 07', event: '충남도청신도시 지하차도 건설 수주' },
      { date: '2008. 10', event: '수도권 도시정비 사업 수주' },
      { date: '2006. 05', event: '대형 플랜트 프로젝트 준공' },
      { date: '2002. 11', event: '품질경영 전사 확대' },
    ],
  },
  {
    range: '1980 ~ 1999',
    label: 'HISTORY 03',
    summary: '사업 영역 확장과 인증 체계 구축의 시기',
    items: [
      { date: '1998. 07', event: 'ISO 9001 품질경영시스템 최초 인증' },
      { date: '1990. 04', event: '수도권 대형 주택단지 시공' },
      { date: '1988. 09', event: '대규모 국가 행사 기반시설 공사 참여' },
      { date: '1984. 06', event: '토목 부문 사업 확장' },
    ],
  },
  {
    range: '1959 ~ 1979',
    label: 'HISTORY 04',
    summary: '창립과 함께 성장의 기반을 마련한 시기',
    items: [
      { date: '1975. 02', event: '국가 기반시설 공사 참여' },
      { date: '1968. 10', event: '본사 사옥 신축' },
      { date: '1963. 05', event: '첫 대형 토목 공사 준공' },
      { date: '1959. 09', event: '회사 창립' },
    ],
  },
]

// 연혁 — 원본(chinhung about-history) 구조 재현 (GSAP 대신 CSS sticky):
//  .key-img(풀블리드 이미지 + 대형 연대) 핀 고정 → .history-cnt(좌 sticky 요약 + 우 일자 타임라인)가
//  위로 올라와 이미지를 덮고, 다음 시대 이미지가 다시 그 위를 덮으며 전환. 모바일은 column 스택.
function History() {
  return (
    <div className="mx-auto max-w-container">
      {eras.map((era) => (
        <section key={era.range} className="relative">
          {/* .key-img — 풀블리드 시대 이미지 + 대형 연대 (데스크탑에서 핀 고정) */}
          <div className="px-4 md:px-10 lg:h-[130vh] lg:px-20">
            <div className="relative h-[56vh] overflow-hidden rounded-2xl bg-neutral-900 sm:h-[66vh] lg:sticky lg:top-40 lg:h-[calc(100vh-12rem)]">
              <Placeholder label={era.label} ratio="auto" className="h-full" dark />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
              <p className="absolute left-6 top-[40%] -translate-y-1/2 text-5xl font-semibold leading-none text-white drop-shadow md:text-7xl lg:left-[12%] lg:top-1/2 lg:text-[7.5rem]">
                {era.range}
              </p>
            </div>
          </div>

          {/* .history-cnt — 상세: 데스크탑에서 이미지 위로 올라와 덮음 */}
          <div className="relative bg-white pb-16 pt-12 lg:-mt-[30vh] lg:rounded-t-[2.5rem] lg:pb-32 lg:pt-24 lg:shadow-[0_-40px_80px_-24px_rgba(0,0,0,0.12)]">
            <div className="flex flex-col gap-10 px-4 md:px-10 lg:flex-row lg:gap-[6.88rem] lg:px-20">
              {/* .history-year — 좌측 요약(연대 + 설명 + 이미지), 데스크탑 sticky */}
              <div className="lg:sticky lg:top-44 lg:h-fit lg:w-[35rem] lg:shrink-0">
                <p className="text-4xl font-semibold leading-none text-neutral-900 lg:text-[4.75rem]">
                  {era.range}
                </p>
                <p className="mt-4 whitespace-pre-line text-lg font-medium leading-8 text-neutral-600 lg:mt-6 lg:text-2xl lg:leading-9">
                  {era.summary}
                </p>
                <div className="mt-8 overflow-hidden rounded-2xl">
                  <Placeholder label={era.label} ratio="16/9" />
                </div>
              </div>

              {/* .cnt — 우측 일자별 타임라인 (날짜 + 사건) */}
              <ul className="flex flex-1 flex-col gap-12 lg:pt-3">
                {era.items.map((it, i) => (
                  <li key={it.date + it.event}>
                    <Reveal delay={(i % 3) * 60}>
                      <p className="text-2xl font-bold text-neutral-900 lg:text-4xl">{it.date}</p>
                      <p className="mt-2.5 whitespace-pre-line text-lg font-medium leading-8 text-zinc-600 lg:text-2xl">
                        {it.event}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

// ---------- 브랜드 소개 (원본 실측 구조, 문구는 템플릿용 자체 카피) ----------
const brandFeatures = [
  {
    label: 'BRAND 01',
    title: '품격을 담은\n외관 디자인',
    desc: '단지의 첫인상을 결정하는 절제된 프리미엄 외관',
  },
  {
    label: 'BRAND 02',
    title: '실용성을 더한 실내 공간',
    desc: '자투리 공간까지 살린\n효율적인 평면 구성',
  },
  {
    label: 'BRAND 03',
    title: '멈추지 않는 주거 연구',
    desc: '거주 후 만족까지 살피는\n지속적인 연구와 개선',
  },
]

const brandLines = [
  { name: '프리미엄 라인', desc: '도심 핵심 입지의 하이엔드 주거' },
  { name: '시티 라인', desc: '실용성과 합리성을 갖춘 도시형 주거' },
  { name: '테라스 라인', desc: '자연과 가까운 저층 특화 주거' },
]

function Brand() {
  return (
    <div>
      {/* 인트로 2단 — 좌: 76px 헤딩 / 우: 볼드 카피 + 본문 + 알약 버튼 */}
      <div className="flex flex-col gap-10 pb-20 pt-10 lg:flex-row lg:pb-28 lg:pt-24">
        <div className="grow text-5xl font-semibold leading-none text-brand lg:text-[4.75rem]">
          <p>
            Beyond
            <br />
            Premium Living
          </p>
        </div>

        <div className="grow lg:max-w-[52%]">
          <p className="text-2xl font-bold leading-snug md:text-4xl">
            시간이 지나도 빛나는 디자인과
            <br />
            합리적 실용성을 담은 주거 공간
          </p>

          <p className="mt-8 break-words text-lg font-medium leading-8 text-neutral-700 lg:text-[1.63rem]">
            우리의 주거 브랜드는 고전적인 멋과 현대적인 실용성을 함께 추구합니다. 외관에서
            실내까지, 거주자의 품격과 일상의 편안함을 모두 고려한 설계로 오래 살수록
            가치가 깊어지는 집을 만듭니다.
          </p>

          <a
            href="#"
            className="relative mt-8 inline-block rounded-full bg-neutral-100 py-5 pl-5 pr-14 font-bold transition hover:bg-neutral-200"
          >
            주거 브랜드 홈페이지 바로가기
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-500">
              →
            </span>
          </a>
        </div>
      </div>

      {/* 풀카드 3장 — 원본: 높이 41.92rem(670px), gap 0.63rem, p-12 */}
      <ul className="flex flex-col gap-[0.63rem] pb-20 lg:flex-row">
        {brandFeatures.map((f, i) => (
          <li key={f.label} className="relative grow overflow-hidden rounded-xl">
            <Reveal delay={i * 120}>
              <div className="relative">
                <Placeholder
                  label={f.label}
                  ratio="auto"
                  className="h-[28rem] lg:h-[41.92rem]"
                  dark
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 text-white lg:p-12">
                  <p className="whitespace-pre-line text-2xl font-bold lg:text-4xl">
                    {f.title}
                  </p>
                  <p className="mt-5 whitespace-pre-line text-base leading-8 lg:mt-8 lg:text-[1.63rem]">
                    {f.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Brand Line — 골드 그라디언트 배경 (실측: rgba(255,174,0,.12) → rgba(145,115,69,.12)) */}
      <div
        className="-mx-4 px-4 py-20 md:-mx-10 md:px-10 lg:-mx-60 lg:px-60 lg:py-28"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 174, 0, 0.12) 19.23%, rgba(145, 115, 69, 0.12) 100%)',
        }}
      >
        <p className="text-5xl font-semibold leading-none text-stone-500 lg:text-[4.75rem]">
          Brand Line
        </p>

        <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-12 pb-10 lg:mt-28 lg:gap-x-[6.25rem] lg:gap-y-[4.5rem] lg:pb-36">
          {brandLines.map((b, i) => (
            <li key={b.name} className="w-full grow md:basis-[28%]">
              <Reveal delay={i * 120}>
                <Placeholder label={`BI — ${b.name}`} ratio="16/9" rounded />
                <p className="mt-6 text-2xl font-bold text-neutral-900">{b.name}</p>
                <p className="mt-2 text-lg font-medium text-neutral-600">{b.desc}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* 아웃라인 버튼 — 원본: w-96 h-16 rounded-full border-2 stone-500 */}
        <div className="pt-14 text-center text-lg font-bold text-stone-500">
          <button
            type="button"
            className="inline-block h-16 w-full max-w-96 rounded-full border-2 border-stone-500 transition hover:bg-stone-500 hover:text-white"
          >
            이전 브랜드 보기
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- 인사말 페이지헤드 — 중앙 인용구 오버레이 (문구는 자체 카피) ----------
function GreetingsHead() {
  return (
    <div className="relative">
      <Placeholder label="PAGE HEAD — Greetings" ratio="32/9" dark />
      <div className="absolute inset-0 flex flex-wrap content-center justify-center bg-black/25 px-6 text-center text-xl font-medium text-white md:text-3xl lg:px-60 lg:text-4xl">
        <p>“신뢰로 짓고, 가치로 보답하는 기업”</p>
      </div>
    </div>
  )
}

export default function About() {
  const { tab } = useParams()
  const meta = pages[tab]
  if (!meta) return <Navigate to="/about/greetings" replace />

  // 인사말: 인용구 헤드 / 비전: 스크롤 리빌 헤드 / 연혁: 헤드 없이 본문 핀 연출
  const customHead =
    tab === 'greetings' ? (
      <GreetingsHead />
    ) : tab === 'vision' ? (
      <VisionHead />
    ) : tab === 'history' ? (
      <span />
    ) : undefined

  return (
    <SubPageLayout
      sectionTitle="회사소개"
      headLabel={meta.headLabel}
      tabs={tabs}
      head={customHead}
    >
      {tab === 'history' ? (
        <History />
      ) : (
        <div className="mx-auto max-w-container px-4 md:px-10 lg:px-60">
          {/* 인사말·비전·브랜드 탭은 본문에 자체 헤딩을 가짐 */}
          {tab === 'greetings' && <Greetings />}
          {tab === 'vision' && <Vision />}
          {tab === 'brand' && <Brand />}
        </div>
      )}
    </SubPageLayout>
  )
}
