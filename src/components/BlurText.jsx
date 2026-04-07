import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

export default function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const fromY = direction === 'bottom' ? 50 : -50

  const variants = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: fromY },
    mid: { filter: 'blur(5px)', opacity: 0.5, y: -5 },
    visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
  }

  return (
    <p ref={ref} className={className}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{
            delay: (i * delay) / 1000,
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: animateBy === 'words' ? 'pre' : 'normal' }}
        >
          {el}{animateBy === 'words' ? ' ' : ''}
        </motion.span>
      ))}
    </p>
  )
}
