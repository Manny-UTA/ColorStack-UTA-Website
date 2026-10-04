"use client";
import { useRef, useState } from "react";
export default function TraditionGallery({ slides }) {
  const [index, setIndex] = useState(0);
  const touch = useRef(null);
  if (!slides.length) return null;
  const move = delta => setIndex(current => (current + delta + slides.length) % slides.length);
  const slide = slides[index];
  return <section className="about-gallery" aria-label="Secured the Bag historical graphics" aria-roledescription="carousel" tabIndex={0} onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }} onTouchStart={event => { touch.current = event.touches[0].clientX; }} onTouchEnd={event => { if (touch.current !== null) { const delta = event.changedTouches[0].clientX-touch.current; if (Math.abs(delta)>50) move(delta>0?-1:1); touch.current=null; } }}>
    <p className="cs-eyebrow">THE ARCHIVE {slide.semester && ` / ${slide.semester}`}</p>
    <figure><img src={slide.src} alt={slide.alt} key={slide.src}/>{slide.caption && <figcaption className="about-caption">{slide.caption}</figcaption>}</figure>
    <div className="about-gallery-controls"><button type="button" aria-label="Previous graphic" onClick={()=>move(-1)} disabled={slides.length<2}>←</button><span aria-live="polite" aria-atomic="true">{String(index+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</span><button type="button" aria-label="Next graphic" onClick={()=>move(1)} disabled={slides.length<2}>→</button></div>
    <div className="about-gallery-credit"><h3>{slide.memberName}</h3><p>{[slide.role,slide.company].filter(Boolean).join(" · ")}</p></div>
  </section>;
}
