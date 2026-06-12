import Placeholder from '../components/Placeholder'

// 아직 콘텐츠가 정해지지 않은 단순 페이지용 공통 템플릿
export default function SimplePage({ title }) {
  return (
    <div>
      {/* 페이지 타이틀 영역 */}
      <div className="bg-white">
        <div className="mx-auto max-w-container px-4 pb-10 pt-12 md:px-10 lg:px-20">
          <div className="flex flex-col-reverse justify-between md:flex-row">
            <h2 className="mb-6 text-4xl font-bold leading-none text-stone-500 md:mb-0 md:text-5xl">
              {title}
            </h2>
            <p className="mb-4 text-sm font-medium text-zinc-500 md:mb-0">
              홈<span className="ml-3 border-l border-zinc-300 pl-3">{title}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="aspect-[16/10] md:aspect-[32/9]">
        <Placeholder label={`PAGE HEAD — ${title}`} ratio="auto" className="h-full" />
      </div>

      <div className="mx-auto max-w-container px-4 py-24 text-center md:px-10 lg:px-40">
        <p className="text-xl font-medium text-neutral-600">
          “{title}” 페이지 콘텐츠가 들어갈 영역입니다.
        </p>
        <p className="mt-3 text-neutral-400">
          템플릿에 포함된 구조를 기반으로 실제 내용을 추가하세요.
        </p>
        <div className="mx-auto mt-12 max-w-4xl">
          <Placeholder label={`${title} CONTENT`} ratio="21/9" rounded />
        </div>
      </div>
    </div>
  )
}
