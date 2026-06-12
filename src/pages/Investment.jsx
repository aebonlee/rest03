import { useState, useEffect, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import Placeholder from '../components/Placeholder'
import { investmentPages, notices } from '../data/site'

const tabs = [
  { label: '기업지배구조', to: '/investment/governance' },
  { label: '재무정보', to: '/investment/financial' },
  { label: '공시', to: '/investment/disclosure' },
  { label: '공고', to: '/investment/announcement' },
  { label: 'IR 자료실', to: '/investment/report' },
]

// ============================================================
// 재무 데이터 — 재무상태표는 공시 수치, 손익/지표는 데모 데이터
// (실제 운영 시 최신 공시 수치로 교체)
// ============================================================
const YEARS = ['2023', '2024', '2025']

const finance = {
  balance: {
    label: '요약재무상태표',
    charts: [
      { title: '자산총계', values: [574331, 543584, 563127] },
      { title: '부채총계', values: [306441, 275318, 322191] },
      { title: '자본총계', values: [267890, 268266, 240936] },
    ],
    unit: '(단위:백만원)',
    rows: [
      { label: '자산총계', values: ['574,331', '543,584', '563,127'], strong: true },
      { label: '유동자산', values: ['488,221', '454,615', '451,037'] },
      { label: '비유동자산', values: ['86,110', '88,969', '112,090'] },
      { label: '부채총계', values: ['306,441', '275,318', '322,191'], strong: true },
      { label: '유동부채', values: ['229,509', '198,984', '220,727'] },
      { label: '비유동부채', values: ['76,932', '76,334', '101,464'] },
      { label: '자본총계', values: ['267,890', '268,266', '240,936'], strong: true },
      { label: '자본금', values: ['73,312', '73,312', '73,312'] },
      { label: '자본잉여금', values: ['-', '-', '-'] },
      { label: '이익잉여금(결손금)', values: ['185,278', '186,625', '157,598'] },
      { label: '기타포괄손익누계액', values: ['9,362', '8,391', '10,088'] },
      { label: '자본조정', values: ['-62', '-62', '-62'] },
    ],
  },
  income: {
    label: '요약손익계산',
    charts: [
      { title: '매출액', values: [612450, 598210, 633805] },
      { title: '영업이익', values: [21340, 18905, 24612] },
      { title: '당기순이익', values: [15210, 12884, 17032] },
    ],
    unit: '(단위:백만원)',
    rows: [
      { label: '매출액', values: ['612,450', '598,210', '633,805'], strong: true },
      { label: '매출원가', values: ['561,820', '551,304', '578,114'] },
      { label: '매출총이익', values: ['50,630', '46,906', '55,691'], strong: true },
      { label: '판매비와관리비', values: ['29,290', '28,001', '31,079'] },
      { label: '영업이익', values: ['21,340', '18,905', '24,612'], strong: true },
      { label: '법인세비용차감전순이익', values: ['19,884', '16,730', '22,308'] },
      { label: '당기순이익', values: ['15,210', '12,884', '17,032'], strong: true },
    ],
  },
  metrics: {
    label: '재무지표',
    charts: [
      { title: '부채비율', values: [114.4, 102.6, 133.7], suffix: '%' },
      { title: '유동비율', values: [212.7, 228.5, 204.3], suffix: '%' },
      { title: '자기자본비율', values: [46.6, 49.4, 42.8], suffix: '%' },
    ],
    unit: '(단위:%)',
    rows: [
      { label: '부채비율', values: ['114.4', '102.6', '133.7'], strong: true },
      { label: '유동비율', values: ['212.7', '228.5', '204.3'] },
      { label: '자기자본비율', values: ['46.6', '49.4', '42.8'] },
    ],
  },
}

// ---------- 세그먼트 탭 (원본: border-2 stone-300 rounded, 활성 bg-violet-950) ----------
function SegTabs({ keys, active, onChange }) {
  return (
    <div className="flex overflow-x-auto font-bold">
      <ul className="flex w-full justify-between overflow-hidden rounded border-2 border-stone-300">
        {keys.map((k, i) => (
          <li
            key={k}
            className={[
              'grow text-center',
              i > 0 ? 'border-l-2 border-zinc-600' : '',
            ].join(' ')}
          >
            <button
              type="button"
              onClick={() => onChange(k)}
              className={[
                'inline-block h-16 w-full px-3.5 transition',
                active === k
                  ? 'bg-brand text-white'
                  : 'hover:bg-neutral-50',
              ].join(' ')}
            >
              {finance[k].label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---------- 바 차트 — 스크롤 진입 시 막대가 차오르는 애니메이션 ----------
function BarChart({ title, values, unit, suffix = '' }) {
  const ref = useRef(null)
  const [grown, setGrown] = useState(false)
  const max = Math.max(...values)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGrown(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative h-80 w-full pt-12 lg:basis-[25rem]">
      <p className="absolute left-0 top-0 flex w-full justify-between text-2xl font-bold text-stone-500">
        {title}
        <span className="self-end text-sm font-medium text-neutral-500">{unit}</span>
      </p>

      <div className="relative h-full w-full text-lg">
        <div className="flex h-full w-full justify-center gap-[0.63rem] border-b-2 border-stone-300 pt-5">
          {values.map((v, i) => {
            const last = i === values.length - 1
            const pct = (v / max) * 80 // 최대값 = 차트 높이의 80%
            return (
              <div
                key={YEARS[i]}
                className={[
                  'relative w-16 self-end rounded-t-xl transition-[height] duration-1000 ease-out md:w-24',
                  last ? 'bg-stone-500' : 'bg-stone-500/40',
                ].join(' ')}
                style={{
                  height: grown ? `${pct}%` : '0%',
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <span className="absolute -bottom-[1.88rem] left-1/2 -translate-x-1/2 font-bold text-neutral-500">
                  {YEARS[i]}
                </span>
                <span
                  className={[
                    'absolute -top-[1.88rem] left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-500',
                    last ? 'text-stone-500' : 'text-stone-500/40',
                    grown ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                  style={{ transitionDelay: `${600 + i * 150}ms` }}
                >
                  {v.toLocaleString()}
                  {suffix}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ---------- 공시 테이블 (원본: thead bg-neutral-100 + border-t-2 zinc-600, 합계행 bg-zinc-50) ----------
function FinTable({ title, unit, rows }) {
  return (
    <div className="mt-20">
      <p className="mb-10 flex items-end justify-between text-3xl font-bold text-brand md:text-4xl">
        {title}
        <span className="text-sm font-medium text-neutral-500">{unit}</span>
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse border-b-2 border-stone-300">
          <thead className="font-bold">
            <tr>
              <th className="border-t-2 border-zinc-600 bg-neutral-100 px-6 py-5 text-center align-middle">
                구분
              </th>
              {YEARS.map((y) => (
                <th
                  key={y}
                  className="border-t-2 border-zinc-600 bg-neutral-100 px-6 py-5 text-center align-middle"
                >
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-neutral-800">
            {rows.map((r) => (
              <tr key={r.label} className={r.strong ? 'bg-zinc-50 font-semibold' : ''}>
                <td className="border-t-2 border-stone-300 px-6 py-5 text-center align-middle font-semibold">
                  {r.label}
                </td>
                {r.values.map((v, i) => (
                  <td
                    key={`${r.label}-${YEARS[i]}`}
                    className="border-l-2 border-t-2 border-stone-300 px-6 py-5 text-center align-middle"
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---------- 재무정보 탭 본문 ----------
function Financial() {
  const [seg, setSeg] = useState('balance')
  const data = finance[seg]

  return (
    <div>
      <SegTabs keys={Object.keys(finance)} active={seg} onChange={setSeg} />

      {/* 차트 3종 — 세그먼트 전환 시 key 변경으로 애니메이션 재실행 */}
      <div className="pt-20">
        <div className="overflow-auto pb-12">
          <div
            key={seg}
            className="mx-auto flex max-w-[90rem] flex-col justify-start gap-16 lg:flex-row lg:gap-20"
          >
            {data.charts.map((c) => (
              <BarChart
                key={`${seg}-${c.title}`}
                title={c.title}
                values={c.values}
                unit={data.unit}
                suffix={c.suffix || ''}
              />
            ))}
          </div>
        </div>

        <FinTable title={data.label} unit={data.unit} rows={data.rows} />
      </div>
    </div>
  )
}

// ---------- 기업지배구조 ----------
function Governance() {
  const directors = [
    { role: '대표이사', name: '홍길동', career: '건설사업 부문 총괄' },
    { role: '사내이사', name: '김철수', career: '경영지원 부문 총괄' },
    { role: '사외이사', name: '이영희', career: '회계·감사 전문가' },
    { role: '사외이사', name: '박민수', career: '법률 전문가' },
  ]
  return (
    <div>
      <p className="mb-10 max-w-3xl text-lg font-medium leading-8 text-neutral-700">
        이사회를 중심으로 투명하고 책임 있는 의사결정 구조를 운영하며, 주주와 이해관계자의
        신뢰에 부응하는 지배구조를 만들어가고 있습니다.
      </p>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {directors.map((d) => (
          <li key={d.name} className="rounded-2xl bg-neutral-50 p-6 text-center">
            <Placeholder label="PHOTO" ratio="1/1" rounded className="mx-auto mb-5 max-w-[160px]" />
            <p className="mb-1 text-sm font-semibold text-brand">{d.role}</p>
            <p className="mb-2 text-xl font-bold text-neutral-900">{d.name}</p>
            <p className="text-sm text-neutral-500">{d.career}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---------- 공시/공고/IR — 게시판형 리스트 ----------
function BoardList({ rows }) {
  return (
    <ul className="flex flex-col divide-y divide-neutral-200 border-t-2 border-neutral-400">
      {rows.map((n) => (
        <li key={n.id}>
          <a
            href="#"
            className="flex flex-col justify-between gap-1 py-5 transition hover:text-brand md:flex-row md:items-center"
          >
            <span className="text-lg font-semibold">{n.title}</span>
            <span className="text-sm text-neutral-500">{n.date}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

const disclosureRows = [
  { id: 4, title: '주요사항보고서 (데모)', date: '2026.05.02' },
  { id: 3, title: '분기보고서 제출 안내 (데모)', date: '2026.04.15' },
  { id: 2, title: '사업보고서 제출 안내 (데모)', date: '2026.03.20' },
  { id: 1, title: '감사보고서 제출 안내 (데모)', date: '2026.03.10' },
]

const irRows = [
  { id: 3, title: '2026년 1분기 실적 요약 (데모)', date: '2026.05.10' },
  { id: 2, title: '2025년 연간 실적 요약 (데모)', date: '2026.02.28' },
  { id: 1, title: '회사 소개 자료 (데모)', date: '2026.01.15' },
]

// ---------- 페이지헤드 — 중앙 메시지 오버레이 (문구는 자체 카피) ----------
function InvestHead({ headLabel }) {
  return (
    <div className="relative aspect-[16/10] md:aspect-[32/9]">
      <Placeholder label={`PAGE HEAD — ${headLabel}`} ratio="auto" className="h-full" dark />
    <div className="absolute inset-0 flex flex-wrap content-center justify-center bg-black/25 px-6 text-center text-xl font-medium text-white md:text-3xl lg:px-60 lg:text-4xl">
        <p>
          투명한 경영과 꾸준한 혁신으로
          <br className="hidden md:block" /> 신뢰받는 기업가치를 만들어갑니다
        </p>
      </div>
    </div>
  )
}

export default function Investment() {
  const { tab } = useParams()
  const meta = investmentPages[tab]
  if (!meta) return <Navigate to="/investment/governance" replace />

  return (
    <SubPageLayout
      sectionTitle="투자정보"
      headLabel={meta.headLabel}
      tabs={tabs}
      head={<InvestHead headLabel={meta.headLabel} />}
    >
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        {tab !== 'financial' && (
          <p className="mb-16 text-5xl font-semibold leading-none text-brand md:text-7xl">
            {meta.en}
          </p>
        )}
        {tab === 'governance' && <Governance />}
        {tab === 'financial' && <Financial />}
        {tab === 'disclosure' && <BoardList rows={disclosureRows} />}
        {tab === 'announcement' && (
          <BoardList rows={notices.filter((n) => n.title.includes('공고') || n.id % 2 === 0)} />
        )}
        {tab === 'report' && <BoardList rows={irRows} />}
      </div>
    </SubPageLayout>
  )
}
