import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import feature1 from '../assets/feature-1.gif'
import feature2 from '../assets/feature-2.gif'

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

function ChessRow({ title, body, buttonText, gif, reverse = false }) {
  const [ref, inView] = useInView()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Text content */}
      <div className="flex-1 flex flex-col gap-5">
        <h3 className="text-3xl md:text-4xl font-heading italic text-white leading-[1]">
          {title}
        </h3>
        <p className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed max-w-md">
          {body}
        </p>
        <button className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white text-sm font-body font-medium w-fit hover:bg-white/10 transition-colors">
          {buttonText}
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* GIF */}
      <div className="flex-1 w-full">
        <div className="liquid-glass rounded-2xl overflow-hidden">
          <img
            src={gif}
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturesChess() {
  const [ref, inView] = useInView()

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center text-center mb-20"
      >
        <div className="liquid-glass rounded-full px-3.5 py-1 mb-5">
          <span className="text-white text-xs font-medium font-body">Capabilities</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Pro features. Zero complexity.
        </h2>
      </motion.div>

      {/* Alternating rows */}
      <div className="flex flex-col gap-24">
        <ChessRow
          title="Designed to convert. Built to perform."
          body="Every pixel is intentional. Our AI studies what works across thousands of top sites—then builds yours to outperform them all."
          buttonText="Learn more"
          gif={feature1}
          reverse={false}
        />
        <ChessRow
          title="It gets smarter. Automatically."
          body="Your site evolves on its own. AI monitors every click, scroll, and conversion—then optimizes in real time. No manual updates. Ever."
          buttonText="See how it works"
          gif={feature2}
          reverse={true}
        />
      </div>
    </section>
  )
}
