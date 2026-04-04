import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export type TimelineEntry = {
  title: string
  content: React.ReactNode
}

type TimelineProps = {
  data: readonly TimelineEntry[]
  className?: string
}

function Timeline({ data, className = '' }: TimelineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!wrapperRef.current) {
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!wrapperRef.current) {
        return
      }

      setHeight(wrapperRef.current.getBoundingClientRect().height)
    })

    resizeObserver.observe(wrapperRef.current)
    setHeight(wrapperRef.current.getBoundingClientRect().height)

    return () => resizeObserver.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div ref={wrapperRef} className="relative pb-8">
        {data.map((entry, index) => (
          <div
            key={`${entry.title}-${index}`}
            className="flex justify-start pt-10 md:gap-10 md:pt-24"
          >
            <div className="sticky top-28 z-30 hidden self-start md:block md:w-full md:max-w-xs lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#fcfaf7]">
                <div className="h-4 w-4 rounded-full border border-stone-300 bg-stone-200 shadow-[0_0_0_6px_rgba(252,250,247,0.92)]" />
              </div>
              <div className="md:pl-20">
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="text-3xl leading-tight text-slate-400 lg:text-5xl"
                >
                  {entry.title}
                </motion.h3>
              </div>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="absolute left-3 top-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#fcfaf7] md:hidden">
                <div className="h-4 w-4 rounded-full border border-stone-300 bg-stone-200 shadow-[0_0_0_6px_rgba(252,250,247,0.92)]" />
              </div>
              <div className="mb-5 md:hidden">
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="text-2xl leading-tight text-slate-400"
                >
                  {entry.title}
                </motion.h3>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="pb-6 md:pb-12"
              >
                {entry.content}
              </motion.div>
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-stone-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-violet-500 via-sky-500 to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  )
}

export default Timeline
