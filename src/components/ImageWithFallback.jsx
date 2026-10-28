import { useState } from 'react'
import { Layers3 } from 'lucide-react'

export default function ImageWithFallback({ src, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className={`image-fallback ${className}`} role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}><Layers3 /></div>
  }

  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
}