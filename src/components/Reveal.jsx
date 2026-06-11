import { useEffect, useRef, useState } from 'react'

// ============================================================
// 스크롤 진입 시 페이드인 + 상승 등장 (IntersectionObserver)
// 원본 서브페이지의 카드 등장 연출을 자체 구현한 공용 컴포넌트
// ============================================================
export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        'transition-all duration-700 ease-out',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
