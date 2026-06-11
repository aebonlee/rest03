import { useState } from 'react'
import { useDemoImages } from '../data/site'

// ============================================================
// 이미지 플레이스홀더
//  - useDemoImages = false : 라벨/비율을 표시하는 회색 박스 (기본 골격 확인용)
//  - useDemoImages = true  : 무료 데모 이미지(picsum.photos)를 자동 로드
//    → 라벨 기반 시드라서 새로고침해도 같은 자리는 같은 이미지가 유지됨
//  실제 운영 시에는 이 컴포넌트를 <img src="..."> 로 교체하세요.
// ============================================================

// "16/9" → [w, h] 픽셀 크기 계산
function sizeFromRatio(ratio) {
  if (!ratio || ratio === 'auto') return [1600, 900]
  const [w, h] = String(ratio).split('/').map(Number)
  if (!w || !h) return [1200, 800]
  const width = 1200
  return [width, Math.round((width * h) / w)]
}

export default function Placeholder({
  label = 'IMAGE',
  ratio = '16/9',
  className = '',
  rounded = false,
  dark = false,
}) {
  const [failed, setFailed] = useState(false)
  const showImage = useDemoImages && !failed

  if (showImage) {
    const [w, h] = sizeFromRatio(ratio)
    const seed = encodeURIComponent(label.replace(/\s+/g, '-').toLowerCase())
    return (
      <div
        style={{ aspectRatio: ratio === 'auto' ? undefined : ratio }}
        className={[
          'relative w-full overflow-hidden bg-neutral-300',
          ratio === 'auto' ? 'h-full' : '',
          rounded ? 'rounded-xl' : '',
          className,
        ].join(' ')}
      >
        <img
          src={`https://picsum.photos/seed/${seed}/${w}/${h}`}
          alt={label}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* 데모 이미지 표식 (운영 시 제거) */}
        <span className="absolute bottom-2 right-2 z-10 rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white/80">
          DEMO
        </span>
      </div>
    )
  }

  return (
    <div
      style={{ aspectRatio: ratio }}
      className={[
        'relative flex w-full items-center justify-center overflow-hidden',
        dark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200 text-neutral-500',
        rounded ? 'rounded-xl' : '',
        className,
      ].join(' ')}
    >
      {/* 사선 패턴 */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 14px, rgba(0,0,0,0.05) 14px, rgba(0,0,0,0.05) 28px)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-1 px-2 text-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="text-xs font-semibold tracking-wide md:text-sm">{label}</span>
        <span className="text-[10px] opacity-70">{ratio}</span>
      </div>
    </div>
  )
}
