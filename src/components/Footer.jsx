import { Link } from 'react-router-dom'
import { company } from '../data/site'

// ============================================================
// 푸터 — DreamIT Biz
//  상단: 워드마크 + 소개문 / 하단 블랙: 연락처 + 사이트 바로가기 + 정책링크
// ============================================================
export default function Footer() {
  return (
    <footer className="relative">
      {/* 상단 소개 영역 */}
      <div className="mx-auto flex max-w-container flex-col items-start gap-6 px-6 pb-16 pt-20 md:flex-row md:items-center md:gap-12 md:px-10 lg:px-60 lg:pb-28 lg:pt-40">
        <p className="shrink-0 text-2xl font-extrabold tracking-tight text-brand md:text-3xl">
          {company.name}
        </p>
        <div className="grow font-medium leading-7 text-neutral-600 md:leading-8">
          {company.intro.map((p) => (
            <p key={p} className="mb-3 last:mb-0 md:mb-6">
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* 하단 블랙 영역 */}
      <div className="bg-black">
        <div className="mx-auto flex max-w-container flex-col gap-8 px-6 pb-10 pt-12 md:px-10 lg:gap-12 lg:px-60 lg:pb-12 lg:pt-20">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            {/* 연락처 */}
            <div className="flex flex-col gap-3">
              <span className="text-lg font-bold text-white">{company.name}</span>
              <ul className="flex flex-col gap-2 text-sm">
                {company.contacts.map((c) => (
                  <li key={c.label} className="flex items-center gap-3">
                    <span className="w-12 shrink-0 font-bold text-neutral-200">{c.label}</span>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-neutral-400 transition hover:text-white"
                    >
                      {c.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 사이트 바로가기 */}
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[14rem] items-center justify-between gap-6 self-start rounded border-2 border-zinc-600 px-6 py-3 text-sm font-bold text-neutral-300 transition hover:border-zinc-400 hover:text-white md:self-auto"
            >
              {company.website}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* 사업자 정보 — 구분자(|) 포함, 모바일에서 자연 줄바꿈 */}
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t-2 border-neutral-800 pt-6 text-xs leading-5 text-neutral-500 md:text-[0.8125rem]">
            {company.businessInfo.map((info, i) => (
              <li key={info} className="flex items-center gap-x-3">
                {i > 0 && <span aria-hidden="true" className="text-neutral-700">|</span>}
                {info}
              </li>
            ))}
          </ul>

          {/* 하단 바 — 정책 링크 + 카피라이트 */}
          <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {company.footerLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={
                      l.strong
                        ? 'font-black text-white'
                        : 'font-medium text-neutral-400 transition hover:text-neutral-200'
                    }
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
