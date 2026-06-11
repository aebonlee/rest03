import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import Placeholder from '../components/Placeholder'
import { notices } from '../data/site'

const tabs = [
  { label: '공지사항', to: '/support/notice' },
  { label: '협력업체 등록안내', to: '/support/partner' },
  { label: '고객문의', to: '/support/contact' },
]

const pages = {
  notice: { title: '공지사항', en: 'Notice', headLabel: 'Notice' },
  partner: { title: '협력업체 등록안내', en: 'Partner Registration', headLabel: 'Partner' },
  contact: { title: '고객문의', en: 'Contact Us', headLabel: 'Contact' },
}

const PER_PAGE = 5

// 공지사항 — 게시판 + 페이지네이션
function Notice() {
  const [page, setPage] = useState(1)
  const total = Math.ceil(notices.length / PER_PAGE)
  const rows = notices.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <ul className="flex flex-col divide-y divide-neutral-200 border-t-2 border-neutral-400">
        {rows.map((n) => (
          <li key={n.id}>
            <a
              href="#"
              className="flex flex-col justify-between gap-1 py-6 transition hover:text-brand md:flex-row md:items-center"
            >
              <span className="flex items-center gap-5">
                <span className="hidden w-10 text-center text-neutral-400 md:block">
                  {n.id}
                </span>
                <span className="text-lg font-semibold">{n.title}</span>
              </span>
              <span className="text-sm text-neutral-500">{n.date}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="mt-12 flex justify-center gap-2">
        {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            className={[
              'h-10 w-10 rounded-full font-semibold transition',
              p === page
                ? 'bg-brand text-white'
                : 'text-neutral-600 hover:bg-neutral-100',
            ].join(' ')}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}

// 협력업체 등록안내 — 절차 스텝
function Partner() {
  const steps = [
    { no: '01', title: '등록 신청', desc: '전자조달 시스템에서 신규 등록을 신청합니다.' },
    { no: '02', title: '서류 심사', desc: '제출 서류와 시공 실적을 검토합니다.' },
    { no: '03', title: '현장 평가', desc: '필요 시 현장 실사와 역량 평가를 진행합니다.' },
    { no: '04', title: '등록 완료', desc: '심사 통과 후 협력업체 풀에 등록됩니다.' },
  ]
  return (
    <div>
      <p className="mb-12 max-w-3xl text-lg font-medium leading-8 text-neutral-700">
        함께 성장할 우수 협력업체를 상시 모집합니다. 아래 절차에 따라 전자조달 시스템에서
        등록을 진행해 주세요.
      </p>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.no} className="rounded-2xl border border-neutral-200 p-7 transition hover:border-brand">
            <p className="mb-4 text-3xl font-bold text-brand/30">{s.no}</p>
            <p className="mb-2 text-xl font-bold text-neutral-900">{s.title}</p>
            <p className="text-sm leading-6 text-neutral-500">{s.desc}</p>
          </li>
        ))}
      </ul>
      <div className="mt-12 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 font-bold text-white transition hover:brightness-150"
        >
          전자조달 시스템 바로가기 <span>→</span>
        </a>
      </div>
    </div>
  )
}

// 고객문의 — 안내 + 폼 레이아웃 (데모, 실제 전송 미구현)
function Contact() {
  return (
    <div className="flex flex-col gap-14 lg:flex-row">
      <div className="lg:w-2/5">
        <p className="mb-6 text-2xl font-bold leading-snug text-neutral-900">
          궁금하신 내용을
          <br />
          남겨주세요.
        </p>
        <p className="mb-10 leading-7 text-neutral-600">
          담당 부서에서 확인 후 순차적으로 답변드립니다. 긴급한 문의는 대표번호로 연락해
          주세요.
        </p>
        <Placeholder label="CONTACT VISUAL" ratio="4/3" rounded />
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-700">이름</span>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                className="rounded-lg border border-neutral-300 px-4 py-3.5 outline-none transition focus:border-brand"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-700">연락처</span>
              <input
                type="text"
                placeholder="연락 가능한 번호"
                className="rounded-lg border border-neutral-300 px-4 py-3.5 outline-none transition focus:border-brand"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-neutral-700">문의 유형</span>
            <select className="rounded-lg border border-neutral-300 px-4 py-3.5 outline-none transition focus:border-brand">
              <option>일반 문의</option>
              <option>분양 문의</option>
              <option>협력업체 문의</option>
              <option>제보/민원</option>
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-neutral-700">문의 내용</span>
            <textarea
              rows={6}
              placeholder="문의하실 내용을 입력하세요"
              className="resize-none rounded-lg border border-neutral-300 px-4 py-3.5 outline-none transition focus:border-brand"
            />
          </label>
          <button
            type="button"
            onClick={() => alert('템플릿 데모입니다. 실제 전송 기능을 연결하세요.')}
            className="mt-2 self-start rounded-full bg-brand px-10 py-4 font-bold text-white transition hover:brightness-150"
          >
            문의 보내기
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Support() {
  const { tab } = useParams()
  const meta = pages[tab]
  if (!meta) return <Navigate to="/support/notice" replace />

  return (
    <SubPageLayout sectionTitle="고객센터" headLabel={meta.headLabel} tabs={tabs}>
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        <p className="mb-16 text-5xl font-semibold leading-none text-brand md:text-7xl">
          {meta.en}
        </p>
        {tab === 'notice' && <Notice />}
        {tab === 'partner' && <Partner />}
        {tab === 'contact' && <Contact />}
      </div>
    </SubPageLayout>
  )
}
