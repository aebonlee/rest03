import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, company } from '../data/site'

// ============================================================
// 상단 GNB
//  - 메인 최상단: 투명 배경 + 흰 글자 → 스크롤/호버 시 흰 배경 전환
//  - 데스크탑: 호버 시 전체 컬럼이 한 번에 펼쳐지는 풀 메가메뉴
//  - 모바일: 햄버거 → 아코디언 패널
// ============================================================
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSub, setOpenSub] = useState(null) // 모바일 아코디언
  const [megaOpen, setMegaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 라우트 이동 시 메뉴 닫기
  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
    setOpenSub(null)
  }, [pathname])

  // 투명 모드: 메인 + 최상단 + 메가메뉴 닫힘
  const transparent = isHome && !scrolled && !megaOpen

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav
        className={[
          'transition-colors duration-300',
          transparent ? 'bg-transparent' : 'bg-white shadow-sm',
        ].join(' ')}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div
          className={[
            'mx-auto flex h-20 max-w-container items-center justify-between px-4 md:px-10 lg:px-20',
            transparent ? 'border-b border-white/20' : 'border-b border-neutral-200',
          ].join(' ')}
        >
          {/* 로고 */}
          <Link
            to="/"
            className={[
              'text-2xl font-extrabold tracking-tight transition-colors',
              transparent ? 'text-white' : 'text-brand',
            ].join(' ')}
          >
            {company.name}
          </Link>

          {/* 데스크탑 대메뉴 */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map((item) => (
              <li
                key={item.label}
                className="flex items-center"
                onMouseEnter={() => setMegaOpen(true)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'px-7 py-7 text-lg font-semibold transition-colors',
                      transparent
                        ? 'text-white hover:text-white/70'
                        : isActive
                          ? 'text-brand'
                          : 'text-neutral-800 hover:text-brand',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 햄버거 (모바일) */}
          <button
            type="button"
            aria-label="메뉴 열기"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <span className={transparent ? 'h-0.5 w-6 bg-white' : 'h-0.5 w-6 bg-neutral-800'} />
            <span className={transparent ? 'h-0.5 w-6 bg-white' : 'h-0.5 w-6 bg-neutral-800'} />
            <span className={transparent ? 'h-0.5 w-6 bg-white' : 'h-0.5 w-6 bg-neutral-800'} />
          </button>
        </div>

        {/* 데스크탑 풀 메가메뉴 — 전체 컬럼이 한 번에 펼쳐짐 */}
        <div
          className={[
            'hidden overflow-hidden bg-white transition-all duration-300 lg:block',
            megaOpen
              ? 'max-h-96 border-b border-neutral-200 opacity-100'
              : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="mx-auto flex max-w-container justify-end px-20">
            {nav.map((item) => (
              <ul
                key={item.label}
                className="flex w-44 flex-col gap-3 border-l border-neutral-100 py-8 first:border-l-0"
              >
                {item.children.map((c) => (
                  <li key={c.label + c.to}>
                    <NavLink
                      to={c.to}
                      className={({ isActive }) =>
                        [
                          'block text-center text-[0.95rem] transition',
                          isActive
                            ? 'font-semibold text-brand'
                            : 'text-neutral-500 hover:font-semibold hover:text-brand',
                        ].join(' ')
                      }
                    >
                      {c.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </nav>

      {/* 모바일 패널 — 아코디언 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-extrabold text-brand">{company.name}</span>
              <button
                type="button"
                aria-label="메뉴 닫기"
                className="text-2xl text-neutral-500"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-col">
              {nav.map((item) => {
                const opened = openSub === item.label
                return (
                  <li key={item.label} className="border-b border-neutral-100">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-4 text-left text-lg font-bold text-neutral-900"
                      onClick={() => setOpenSub(opened ? null : item.label)}
                      aria-expanded={opened}
                    >
                      {item.label}
                      <span
                        className={[
                          'text-neutral-400 transition-transform',
                          opened ? 'rotate-180' : '',
                        ].join(' ')}
                      >
                        ⌄
                      </span>
                    </button>
                    <ul
                      className={[
                        'overflow-hidden transition-all duration-300',
                        opened ? 'max-h-72 pb-3' : 'max-h-0',
                      ].join(' ')}
                    >
                      {item.children.map((c) => (
                        <li key={c.label + c.to}>
                          <Link
                            to={c.to}
                            className="block py-2 pl-3 text-[0.95rem] text-neutral-500"
                            onClick={() => setMobileOpen(false)}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
