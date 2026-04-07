import { ArrowUpRight } from 'lucide-react'
import HlsVideo from './HlsVideo'
import BlurText from './BlurText'

const START_VIDEO = 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8'

export default function StartSection() {
  return (
    <section className="relative" style={{ minHeight: '700px' }}>
      {/* HLS Video background */}
      <HlsVideo
        src={START_VIDEO}
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
      <div
        className="relative z-20 flex flex-col items-center text-center px-6 py-32"
        style={{ minHeight: '500px', justifyContent: 'center' }}
      >
        {/* Badge */}
        <div className="liquid-glass rounded-full px-3.5 py-1 mb-6">
          <span className="text-white text-xs font-medium font-body">How It Works</span>
        </div>

        {/* Heading */}
        <BlurText
          text="You dream it. We ship it."
          delay={120}
          animateBy="words"
          direction="bottom"
          className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-xl mb-6"
        />

        {/* Subtext */}
        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-md mb-8">
          Share your vision. Our AI handles the rest—wireframes, design, code, launch. All in days, not quarters.
        </p>

        {/* CTA */}
        <button className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 text-white text-sm font-body font-medium hover:bg-white/10 transition-colors">
          Get Started
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
