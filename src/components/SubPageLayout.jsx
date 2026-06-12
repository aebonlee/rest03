import { NavLink } from 'react-router-dom'
import Placeholder from './Placeholder'

// ============================================================
// 서브페이지 공통 레이아웃 (원본 실측값 기반)
//  - sticky 블록에 음수 top 적용 → 스크롤 시 타이틀은 사라지고 탭 줄만 고정
//  - 타이틀: 52px / stone-500 / bold, 탭: text-lg bold, py-7 px-10
//  - 비활성 탭도 border-b-2(white) 유지 → 활성 전환 시 높이 변동 없음
//  - head prop으로 페이지별 커스텀 헤드(스크롤 연출 등) 주입 가능
// ============================================================
export default function SubPageLayout({ sectionTitle, tabs, headLabel, head, children }) {
  return (
    <div>
      {/* sticky 탭 블록 — top 음수: 헤더(96px) 아래에 탭 줄만 남도록 계산 */}
      <div className="sticky top-[-4.5rem] z-30 bg-white shadow-sm md:top-[-5.25rem]">
        <div className="mx-auto max-w-container px-4 pt-10 md:px-20 md:pt-16">
          <div className="flex flex-col-reverse justify-between md:flex-row">
            <h2 className="mb-10 text-[2.5rem] font-bold leading-none text-stone-500 md:mb-16 md:text-[3.25rem]">
              {sectionTitle}
            </h2>
            <p className="mb-4 text-sm font-medium text-zinc-600 md:mb-0">
              홈<span className="ml-3 pl-3">{sectionTitle}</span>
            </p>
          </div>

          <ul className="flex w-full justify-around overflow-x-auto text-lg font-bold">
            {tabs.map((t) => (
              <li key={t.to} className="shrink-0">
                <NavLink
                  to={t.to}
                  className={({ isActive }) =>
                    [
                      'block whitespace-nowrap border-b-2 px-4 py-5 transition md:px-10 md:py-7',
                      isActive
                        ? 'border-brand text-brand'
                        : 'border-white text-neutral-800 hover:text-brand',
                    ].join(' ')
                  }
                >
                  {t.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 페이지헤드 — 커스텀 헤드(스크롤 연출 등) 또는 기본 이미지 */}
      {head || (
        <div className="aspect-[16/10] md:aspect-[32/9]">
          <Placeholder label={`PAGE HEAD — ${headLabel}`} ratio="auto" className="h-full" />
        </div>
      )}

      {/* 본문 — 원본: py-28, border-b-2 neutral-200 */}
      <div className="border-b-2 border-neutral-200 py-16 md:py-28">{children}</div>
    </div>
  )
}
