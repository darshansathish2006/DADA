import { useEffect, useRef } from 'react';
import { destinations, mascotPoses } from '../content';
import { Icon, MascotImage } from './Shared';

export default function Modal({ modal, onClose, onEnquire }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (!modal) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const element = dialog.current;
    element.showModal(); document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus({ preventScroll: true }); };
  }, [modal]);
  const isMascot = modal === 'mascot';
  const destination = destinations[modal];
  return <dialog ref={dialog} className={`modal ${isMascot ? 'mascot-modal' : ''}`} aria-labelledby="modal-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); } }}><button className="modal-close" type="button" aria-label="Close dialog" onClick={onClose}><Icon name="x" /></button>
    {isMascot ? <><p className="eyebrow">SAME CHARACTER. EVERY KIND OF ENERGY.</p><h2 id="modal-title">Meet the DADA mascot.</h2><p>Curious. Creative. Always up for building something together.</p><div className="pose-gallery">{Object.entries(mascotPoses).map(([pose, asset]) => <figure key={pose}><MascotImage pose={pose} loading="lazy" /><figcaption>{asset.label}</figcaption></figure>)}</div></> : destination && <><span className="modal-icon"><Icon name={destination.icon} size={36} /></span><p className="eyebrow">A NEW CHAPTER IS IN THE MAKING</p><h2 id="modal-title">{destination.title}</h2><p>Our dedicated {destination.shortLabel.toLowerCase()} website is coming soon. In the meantime, tell us what you have in mind.</p><button className="button" type="button" onClick={() => onEnquire(destination.enquiryType)}>Enquire about {destination.shortLabel.toLowerCase()}<Icon name="arrow" size={18} /></button><button className="modal-back" type="button" onClick={onClose}>Keep exploring Team DADA</button></>}
  </dialog>;
}
