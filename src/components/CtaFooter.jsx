import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import HlsVideo from './HlsVideo'
import BlurText from './BlurText'

const CTA_VIDEO = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

function useInView(threshold = 0.1) {
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

export default function CtaFooter() {
  const [ref, inView] = useInView()

  return (
    <section className="relative">
      {/* Video background */}
      <HlsVideo
        src={CTA_VIDEO}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 pt-40 pb-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6 max-w-3xl"
        >
          <BlurText
            text="Your next website starts here."
            delay={100}
            animateBy="words"
            direction="bottom"
            className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.85]"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/60 font-body font-light text-sm md:text-base max-w-md"
          >
            Book a free strategy call. See what AI-powered design can do. No commitment, no pressure. Just possibilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-4"
          >
            <button className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 text-white text-sm font-body font-medium hover:bg-white/10 transition-colors">
              Book a Call
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-body font-medium hover:bg-white/90 transition-colors">
              View Pricing
            </button>
          </motion.div>
        </motion.div>

        {/* Footer bar */}
        <div className="mt-32 pt-8 border-t border-white/10 w-full flex items-center justify-between pb-8 max-w-7xl mx-auto px-6">
          <span className="text-white/40 text-xs font-body">
            &copy; 2026 Studio. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/40 text-xs font-body hover:text-white/60 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
