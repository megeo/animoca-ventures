import { ArrowUpRight } from 'lucide-react'
import logoIcon from '../assets/logo-icon.svg'

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logoIcon} alt="Studio" className="h-12 w-12 object-contain" />
      </div>

      {/* Center nav links - desktop only */}
      <div className="hidden md:flex items-center">
        <div className="liquid-glass rounded-full px-1.5 py-1 flex items-center gap-1">
          {['Home', 'Services', 'Work', 'Process', 'Pricing'].map((link) =>
            link === 'Get Started' ? null : (
              <a
                key={link}
                href="#"
                className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors"
              >
                {link}
              </a>
            )
          )}
          <a
            href="#"
            className="flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium font-body hover:bg-white/90 transition-colors"
          >
            Get Started
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Right side placeholder to balance layout */}
      <div className="w-[120px]" />
    </nav>
  )
}
