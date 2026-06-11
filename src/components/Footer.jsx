import { useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/site'
import Placeholder from './Placeholder'

// ============================================================
// 푸터 (원본 실측값 기반 자체 구현)
//  상단: 로고(w-64) + 소개문 / 하단 블랙: 주소 + Family site 드롭다운 + 정책링크
// ============================================================
export default function Footer() {
  const [familyOpen, setFamilyOpen] = useState(false)

  return (
    <footer className="relative">
      {/* 상단 소개 영역 — pt-40 pb-28 */}
      <div className="mx-auto flex max-w-container flex-col items-start gap-10 px-4 pb-20 pt-24 md:flex-row md:items-center md:px-10 lg:px-60 lg:pb-28 lg:pt-40">
        <p className="w-64 shrink-0 grow-0">
          <Placeholder label="LOGO" ratio="16/5" />
        </p>
        <div className="grow font-medium leading-8 text-neutral-700">
          {company.intro.map((p) => (
            <p key={p} className="mb-8 last:mb-0">
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* 하단 블랙 영역 — pt-20 pb-12, 내부 간격 4.5rem */}
      <div className="bg-black">
        <div className="mx-auto flex max-w-container flex-col gap-10 px-4 pb-12 pt-14 md:px-10 lg:gap-[4.5rem] lg:px-60 lg:pt-20">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            {/* 주소 — 라벨 neutral-200 bold / 값 neutral-400 */}
            <div className="flex flex-col gap-2.5 text-sm">
              {company.offices.map((o) => (
                <div key={o.label} className="flex gap-8">
                  <div className="w-14 shrink-0 font-bold text-neutral-200">{o.label}</div>
                  <ul className="flex flex-col gap-1 font-medium text-neutral-400 md:flex-row md:gap-8">
                    <li className="md:basis-[14.75rem]">{o.address}</li>
                    <li className="md:basis-[7.5rem]">Tel : {o.tel}</li>
                    <li>Fax : {o.fax}</li>
                  </ul>
                </div>
              ))}
            </div>

            {/* Family site 드롭다운 — border-2 zinc-600, min-w 15rem */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setFamilyOpen((v) => !v)}
                aria-expanded={familyOpen}
                className="flex min-w-[15rem] items-center justify-between rounded border-2 border-zinc-600 px-6 py-3 text-sm font-bold text-neutral-400 transition hover:border-zinc-400 hover:text-neutral-200"
              >
                Family site
                <span
                  className={[
                    'transition-transform',
                    familyOpen ? '' : 'rotate-180',
                  ].join(' ')}
                >
                  ⌄
                </span>
              </button>
              {familyOpen && (
                <ul className="absolute bottom-full left-0 z-10 mb-2 w-full overflow-hidden rounded border border-zinc-700 bg-neutral-900">
                  {company.familySites.map((f) => (
                    <li key={f.name}>
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-5 py-2.5 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                      >
                        {f.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 하단 바 — border-t-2 neutral-800, 개인정보처리방침 강조 */}
          <div className="flex flex-col justify-between gap-4 border-t-2 border-neutral-800 pt-4 text-sm md:flex-row">
            <ul className="flex">
              {company.footerLinks.map((l, i) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={[
                      i === 0 ? 'pr-6' : 'px-6',
                      l.strong
                        ? 'font-black text-white'
                        : 'font-medium text-neutral-400 transition hover:text-neutral-200',
                    ].join(' ')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-zinc-600">{company.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
