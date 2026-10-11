import { useEffect, useRef, useState } from 'react';
import { Icon } from './Shared';

export default function EventGallery({ event, motionPaused }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);
  const gallery = useRef(null);
  const { photos, title } = event;
  const playing = !paused && !motionPaused && !hovered && !focused && visible && tabVisible;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    observer.observe(gallery.current);
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);

  useEffect(() => {
    if (!playing || photos.length < 2) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % photos.length), 4500);
    return () => window.clearInterval(timer);
  }, [playing, photos.length]);

  function select(next) {
    setIndex((next + photos.length) % photos.length);
    setPaused(true);
  }

  return <div className="event-gallery" ref={gallery} role="region" aria-roledescription="carousel" aria-label={`${title} photos`}
    onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
    onPointerLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); select(index + (event.key === 'ArrowRight' ? 1 : -1)); }
    }}>
    <div className="event-gallery-window">
      <div className="event-gallery-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {photos.map((photo, photoIndex) => <div className="event-gallery-slide" key={photo.src} role="group" aria-roledescription="slide"
          aria-label={`${photoIndex + 1} of ${photos.length}`} aria-hidden={photoIndex !== index}>
          <img src={photo.src} alt={photo.alt} loading={photoIndex === index || photoIndex === (index + 1) % photos.length ? 'eager' : 'lazy'} decoding="async" width="1400" height="1400" />
        </div>)}
      </div>
      <span className="event-gallery-count mono" aria-hidden="true">0{index + 1} / 0{photos.length}</span>
    </div>
    <div className="event-gallery-controls">
      <button type="button" aria-label={`Previous ${title} photo`} onClick={() => select(index - 1)}><Icon name="chevron" className="previous-chevron" size={17} /></button>
      <div className="event-gallery-dots" aria-label="Choose a photo">{photos.map((photo, photoIndex) => <button type="button" key={photo.src}
        aria-label={`Show ${title} photo ${photoIndex + 1}`} aria-pressed={index === photoIndex} onClick={() => select(photoIndex)}><span /></button>)}</div>
      <button type="button" className="event-gallery-toggle" disabled={motionPaused} aria-label={`${paused || motionPaused ? 'Play' : 'Pause'} ${title} slideshow`}
        onClick={() => { setPaused(value => !value); setFocused(false); setHovered(false); }}><span aria-hidden="true">{paused || motionPaused ? '▶' : 'Ⅱ'}</span></button>
      <button type="button" aria-label={`Next ${title} photo`} onClick={() => select(index + 1)}><Icon name="chevron" size={17} /></button>
    </div>
    <p className="event-gallery-caption" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">{photos[index].caption}</p>
  </div>;
}
