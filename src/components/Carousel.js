'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../app/page.module.css'

export default function Carousel() {
  const slides = [
    { src: '/img1.jpeg', alt: 'Slide 1' },
    { src: '/img2.jpeg', alt: 'Slide 2' },
    { src: '/img3.jpeg', alt: 'Slide 3' },
  ]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent(c => (c + 1) % slides.length),
      5000
    )
    return () => clearInterval(interval)
  }, [slides.length])

  const prevSlide = () => setCurrent(c => (c - 1 + slides.length) % slides.length)
  const nextSlide = () => setCurrent(c => (c + 1) % slides.length)
  const goTo = idx => setCurrent(idx)

  return (
    <div className={styles['carousel-container']}>
      <div className={styles.slides}>
        {slides.map((slide, idx) => (
          <Image
            key={idx}
            src={slide.src}
            alt={slide.alt}
            width={600}
            height={350}
            className={idx === current ? styles.active : styles.inactive}
          />
        ))}
      </div>
      <span onClick={prevSlide} className={styles.prev}>&#10094;</span>
      <span onClick={nextSlide} className={styles.next}>&#10095;</span>
      <div className={styles['dotsContainer']}>
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${idx === current ? styles.active : ''}`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </div>
  )
}
