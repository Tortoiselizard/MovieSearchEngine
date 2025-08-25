import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

export default function LazyImage ({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const image = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          observer.disconnect()
        }
      })
    })

    if (image.current) {
      observer.observe(image.current)
    }

    return () => {
      if (image.current) {
        observer.unobserve(image.current)
      }
    }
  }, [])

  return (
    <img
      ref={image}
      src={isLoaded ? src : null}
      alt={alt}
      {...props}
    />

  )
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}
