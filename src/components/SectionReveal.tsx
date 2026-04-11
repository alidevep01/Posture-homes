import { useEffect, useRef, useState, type PropsWithChildren } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

type SectionRevealProps = PropsWithChildren<{
  id?: string
  className?: string
  revealMode?: 'default' | 'footer'
}>

function SectionReveal({
  id,
  className,
  children,
  revealMode = 'default',
}: SectionRevealProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isMobileViewport, setIsMobileViewport] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  })

  const revealProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.6,
  })

  const scale = useTransform(revealProgress, [0, 1], [0.94, 1])
  const opacity = useTransform(revealProgress, [0, 0.25, 1], [0, 0.72, 1])
  const y = useTransform(revealProgress, [0, 1], [72, 0])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')

    const updateViewport = () => {
      setIsMobileViewport(mediaQuery.matches)
    }

    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)

    return () => {
      mediaQuery.removeEventListener('change', updateViewport)
    }
  }, [])

  if (revealMode === 'footer' && !isMobileViewport) {
    return (
      <motion.section
        ref={sectionRef}
        id={id}
        style={{ scale, opacity, y, transformOrigin: 'center bottom' }}
        className={['scroll-mt-28', className].filter(Boolean).join(' ')}
      >
        {children}
      </motion.section>
    )
  }

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={['scroll-mt-28', className].filter(Boolean).join(' ')}
    >
      {children}
    </motion.section>
  )
}

export default SectionReveal
