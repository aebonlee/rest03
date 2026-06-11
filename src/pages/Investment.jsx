import { useParams, Navigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import Placeholder from '../components/Placeholder'
import { investmentPages, financialHighlights, notices } from '../data/site'

const tabs = [
  { label: '기업지배구조', to: '/investment/governance' },
  { label: '재무정보', to: '/investment/financial' },
  { label: '공시', to: '/investment/disclosure' },
  { label: '공고', to: '/investment/announcement' },
  { label: 'IR 자료실', to: '/investment/report' },
]

// 재무정보 — 하이라이트 카드
function Financial() {
  return (
    <div>
      <ul className="mb-16 grid gap-6 md:grid-cols-3">
        {financialHighlights.map((f) => (
          <li
            key={f.label}
            className="rounded-2xl border border-neutral-200 p-8 transition hover:border-brand"
          >
            <p className="mb-4 text-sm font-semibold tracking-widest text-neutral-400">
              {f.label}
            </p>
            <p className="mb-2 text-4xl font-bold text-brand md:text-5xl">
              {f.value}
              <span className="ml-1 text-xl font-semibold text-neutral-500">{f.unit}</span>
            </p>
            <p className="text-sm text-neutral-400">{f.note}</p>
          </li>
        ))}
      </ul>
      <Placeholder label="FINANCIAL CHART" ratio="21/9" rounded />
    </div>
  )
}

// 기업지배구조 — 이사회 구성 (데모)
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

// 공시 / 공고 / IR 자료실 — 게시판형 리스트 (데모)
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

export default function Investment() {
  const { tab } = useParams()
  const meta = investmentPages[tab]
  if (!meta) return <Navigate to="/investment/governance" replace />

  return (
    <SubPageLayout sectionTitle="투자정보" headLabel={meta.headLabel} tabs={tabs}>
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        <p className="mb-16 text-5xl font-semibold leading-none text-brand md:text-7xl">
          {meta.en}
        </p>
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
