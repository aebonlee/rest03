import { useParams, Navigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import Placeholder from '../components/Placeholder'
import { talentValues, jobPostings } from '../data/site'

const tabs = [
  { label: '인재상', to: '/recruit/people' },
  { label: '채용공고', to: '/recruit/jobs' },
]

const pages = {
  people: { title: '인재상', en: 'Our People', headLabel: 'People' },
  jobs: { title: '채용공고', en: 'Careers', headLabel: 'Careers' },
}

// 인재상 — 가치 카드
function People() {
  return (
    <div>
      <p className="mb-12 max-w-3xl text-lg font-medium leading-8 text-neutral-700">
        좋은 건축물은 좋은 사람들이 만듭니다. 현장에서 함께 답을 찾고, 끝까지 책임지는
        동료를 기다립니다.
      </p>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {talentValues.map((t) => (
          <li
            key={t.title}
            className="group rounded-2xl bg-neutral-50 p-8 transition hover:bg-brand hover:text-white"
          >
            <Placeholder label={t.title} ratio="1/1" rounded className="mb-6 max-w-[96px]" />
            <p className="mb-3 text-2xl font-bold">{t.title}</p>
            <p className="text-sm leading-6 text-neutral-500 transition group-hover:text-white/85">
              {t.desc}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 채용공고 — 리스트
function Jobs() {
  return (
    <ul className="flex flex-col divide-y divide-neutral-200 border-t-2 border-neutral-400">
      {jobPostings.map((j) => (
        <li key={j.title}>
          <a
            href="#"
            className="flex flex-col gap-2 py-6 transition hover:text-brand md:flex-row md:items-center md:justify-between"
          >
            <span className="flex items-center gap-4">
              <span
                className={[
                  'shrink-0 rounded-full px-3 py-1 text-xs font-bold',
                  j.status === '진행중'
                    ? 'bg-brand/10 text-brand'
                    : 'bg-neutral-100 text-neutral-400',
                ].join(' ')}
              >
                {j.status}
              </span>
              <span className="text-lg font-semibold">{j.title}</span>
            </span>
            <span className="flex gap-6 text-sm text-neutral-500">
              <span>{j.dept}</span>
              <span>{j.period}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Recruit() {
  const { tab } = useParams()
  const meta = pages[tab]
  if (!meta) return <Navigate to="/recruit/people" replace />

  return (
    <SubPageLayout sectionTitle="인재채용" headLabel={meta.headLabel} tabs={tabs}>
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        <p className="mb-16 text-5xl font-semibold leading-none text-brand md:text-7xl">
          {meta.en}
        </p>
        {tab === 'people' && <People />}
        {tab === 'jobs' && <Jobs />}
      </div>
    </SubPageLayout>
  )
}
