import { useParams, Navigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import Placeholder from '../components/Placeholder'

const tabs = [
  { label: 'CEO 인사말', to: '/about/greetings' },
  { label: '비전/가치', to: '/about/vision' },
  { label: '연혁', to: '/about/history' },
  { label: '브랜드소개', to: '/about/brand' },
]

const pages = {
  greetings: { headLabel: 'Greetings', en: 'CEO Message', title: 'CEO 인사말' },
  vision: { headLabel: 'Vision', en: 'Vision & Value', title: '비전/가치' },
  history: { headLabel: 'History', en: 'History', title: '연혁' },
  brand: { headLabel: 'Brand', en: 'Brand', title: '브랜드소개' },
}

// 연혁 데모 데이터
const history = [
  { year: '2026', events: ['홈페이지 리뉴얼 오픈', 'ISO 9001 인증 갱신'] },
  { year: '2020', events: ['해외사업 본격 진출', '플랜트사업부 신설'] },
  { year: '2010', events: ['충남도청신도시 지하차도 건설 수주'] },
  { year: '1998', events: ['ISO 9001 품질경영시스템 최초 인증'] },
]

function Greetings() {
  return (
    <div className="flex flex-col gap-12 md:flex-row md:gap-16">
      <div className="w-full md:w-2/5">
        <Placeholder label="CEO PHOTO" ratio="4/5" rounded />
      </div>
      <div className="flex-1">
        <p className="mb-8 text-3xl font-bold leading-snug text-brand md:text-4xl">
          신뢰와 기술로
          <br />
          내일의 가치를 짓습니다.
        </p>
        <div className="space-y-5 text-lg font-medium leading-8 text-neutral-700">
          <p>
            안녕하십니까. 진흥기업 홈페이지를 찾아주신 여러분께 진심으로 감사드립니다.
            저희는 반세기가 넘는 시간 동안 주택, 건축, 토목, 플랜트 전 영역에서 축적한 기술력과
            노하우로 고객의 신뢰에 보답해 왔습니다.
          </p>
          <p>
            앞으로도 사람이 머무는 공간과 그 공간을 둘러싼 환경까지 함께 설계하며, 도시와 자연이
            균형을 이루는 지속 가능한 미래를 만들어가겠습니다. 변함없는 관심과 성원을 부탁드립니다.
          </p>
          <p className="pt-4 font-bold text-neutral-900">진흥기업 대표이사</p>
        </div>
      </div>
    </div>
  )
}

// 비전/가치 — 핵심가치 카드 (템플릿용 자체 카피)
function Vision() {
  const values = [
    { en: 'Trust', ko: '신뢰', desc: '약속한 품질과 일정을 지켜 고객의 믿음에 보답합니다.' },
    { en: 'Technology', ko: '기술', desc: '현장에서 검증된 기술로 안전하고 견고하게 짓습니다.' },
    { en: 'Together', ko: '상생', desc: '고객·협력사·지역사회와 함께 성장합니다.' },
  ]
  return (
    <div>
      <div className="mb-16 rounded-2xl bg-brand px-8 py-14 text-center text-white md:py-20">
        <p className="mb-4 text-sm font-semibold tracking-widest text-white/60">VISION</p>
        <p className="text-3xl font-bold leading-snug md:text-4xl">
          공간의 가치를 높여
          <br />
          삶의 기반을 만드는 건설 파트너
        </p>
      </div>
      <ul className="grid gap-6 md:grid-cols-3">
        {values.map((v) => (
          <li key={v.en} className="rounded-2xl border border-neutral-200 p-8 transition hover:border-brand">
            <p className="mb-1 text-sm font-semibold tracking-widest text-brand">{v.en}</p>
            <p className="mb-4 text-2xl font-bold text-neutral-900">{v.ko}</p>
            <p className="leading-7 text-neutral-600">{v.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 브랜드소개 (템플릿용 자체 카피)
function Brand() {
  return (
    <div className="flex flex-col gap-12 md:flex-row md:gap-16">
      <div className="w-full md:w-1/2">
        <Placeholder label="BRAND VISUAL" ratio="4/3" rounded />
      </div>
      <div className="flex-1">
        <p className="mb-6 text-3xl font-bold leading-snug text-brand md:text-4xl">
          일상에 품격을 더하는
          <br />
          주거 브랜드
        </p>
        <div className="space-y-5 text-lg font-medium leading-8 text-neutral-700">
          <p>
            우리의 주거 브랜드는 거주자의 하루를 세심하게 관찰하는 데서 출발합니다. 동선과
            채광, 수납과 커뮤니티까지 — 생활의 디테일을 설계에 담습니다.
          </p>
          <p>
            입주 이후의 삶까지 책임지는 사후 관리 체계로, 시간이 지날수록 가치가 높아지는
            집을 만들어갑니다.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4">
          <Placeholder label="BI 01" ratio="1/1" rounded />
          <Placeholder label="BI 02" ratio="1/1" rounded />
          <Placeholder label="BI 03" ratio="1/1" rounded />
        </div>
      </div>
    </div>
  )
}

function History() {
  return (
    <div className="flex flex-col gap-10">
      {history.map((h) => (
        <div
          key={h.year}
          className="flex flex-col gap-4 border-b border-neutral-200 pb-8 md:flex-row md:gap-16"
        >
          <p className="text-4xl font-bold text-brand md:w-40">{h.year}</p>
          <ul className="flex flex-1 flex-col gap-2 text-lg font-medium text-neutral-700">
            {h.events.map((e, i) => (
              <li key={i}>· {e}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function About() {
  const { tab } = useParams()
  const meta = pages[tab]
  if (!meta) return <Navigate to="/about/greetings" replace />

  return (
    <SubPageLayout sectionTitle="회사소개" headLabel={meta.headLabel} tabs={tabs}>
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        <p className="mb-16 text-5xl font-semibold leading-none text-brand md:text-7xl">
          {meta.en}
        </p>
        {tab === 'greetings' && <Greetings />}
        {tab === 'history' && <History />}
        {tab === 'vision' && <Vision />}
        {tab === 'brand' && <Brand />}
      </div>
    </SubPageLayout>
  )
}
