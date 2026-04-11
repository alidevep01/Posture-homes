import { memo } from 'react'

type PostureHomesLogoProps = {
  className?: string
  compact?: boolean
}

function PostureHomesLogo({
  className = '',
  compact = false,
}: PostureHomesLogoProps) {
  const logoHeightClassName = compact ? 'h-14' : 'h-16'
  const wordmarkSizeClassName = compact ? 'text-[2.55rem]' : 'text-[2.9rem]'

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="Posture Homes"
        className={`${logoHeightClassName} w-auto`}
      />
      <span
        className={`${wordmarkSizeClassName} leading-none tracking-[0.08em] text-black`}
        style={{
          fontFamily: '"Bodoni Moda", "Times New Roman", serif',
          fontWeight: 400,
        }}
      >
        POSTURE
      </span>
    </div>
  )
}

export default memo(PostureHomesLogo)
