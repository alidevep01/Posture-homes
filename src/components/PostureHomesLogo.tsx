import { memo } from 'react'

type PostureHomesLogoProps = {
  className?: string
  compact?: boolean
}

function PostureHomesLogo({
  className = '',
  compact = false,
}: PostureHomesLogoProps) {
  const markSize = compact ? 'h-9 w-9' : 'h-12 w-12'
  const wordmarkSize = compact ? 'text-[1.65rem]' : 'text-[2.2rem]'
  const submarkSize = compact ? 'text-[0.6rem]' : 'text-[0.72rem]'

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className={`${markSize} shrink-0 text-slate-950`}
        fill="none"
      >
        <path
          d="M8 8H56V38H30"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M12 56V14H48"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      <div className="flex flex-col leading-none text-slate-950">
        <span
          className={`${wordmarkSize} tracking-[0.18em]`}
          style={{
            fontFamily: 'Baskerville, "Times New Roman", Georgia, serif',
            fontWeight: 400,
          }}
        >
          POSTURE
        </span>
        <span
          className={`mt-2 pl-[0.24em] ${submarkSize} tracking-[0.5em] text-slate-700`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
        >
          HOMES
        </span>
      </div>
    </div>
  )
}

export default memo(PostureHomesLogo)
