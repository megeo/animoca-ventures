import { useEffect, useRef } from 'react'

export default function HlsVideo({ src, className = '', style = {}, desaturate = false }) {
  const videoRef = useRef(null)

  useEffect(() => {
    let hls = null
    const video = videoRef.current
    if (!video) return

    const setup = async () => {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS (Safari)
        video.src = src
        video.play().catch(() => {})
      } else {
        const Hls = (await import('hls.js')).default
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: false })
          hls.loadSource(src)
          hls.attachMedia(video)
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {})
          })
        }
      }
    }

    setup()

    return () => {
      if (hls) hls.destroy()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      style={{
        ...style,
        ...(desaturate ? { filter: 'saturate(0)' } : {}),
      }}
    />
  )
}
