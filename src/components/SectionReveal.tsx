import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

type SectionRevealProps = PropsWithChildren<{
  id?: string
  className?: string
}>

function SectionReveal({ id, className, children }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default SectionReveal
