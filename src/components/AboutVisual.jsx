import { Icon, MascotImage } from './Shared';
import { sitePath } from '../site-paths';

/** Real moments and real work, connected by a small animated circuit. */
export default function AboutVisual({ onMascot }) {
  return <div className="about-visual reveal">
    <div className="about-visual-grid" aria-hidden="true" />
    <svg className="about-circuit" viewBox="0 0 640 530" fill="none" aria-hidden="true">
      <path className="circuit-line" d="M20 90H140L188 42H580V270L535 315V480H290L245 435H30V310" />
      <path className="circuit-pulse" d="M20 90H140L188 42H580V270L535 315V480H290L245 435H30V310" />
      <circle cx="20" cy="90" r="5" /><circle cx="30" cy="310" r="5" />
      <path className="circuit-wave" d="M310 420h28l9-17 17 35 15-56 17 67 15-29h50" />
    </svg>
    <span className="about-visual-note mono"><i className="status-dot" /> IDEAS BECOME REAL HERE</span>
    <figure className="about-team-shot">
      <img src={sitePath('/assets/events/ainexus-stall.jpg')} alt="The DADA team with students and faculty at the AI Nexus expo" loading="lazy" width="1200" height="675" />
      <figcaption><span className="mono">01 / OUT IN THE WORLD</span><span>AI Nexus · REC</span></figcaption>
    </figure>
    <figure className="about-project-shot">
      <div className="about-window-bar mono"><span><i /><i /><i /></span>CLICK / BUILT BY DADA<Icon name="code" size={15} /></div>
      <img src={sitePath('/assets/projects/click.webp')} alt="The CLICK learning platform built by DADA" loading="lazy" width="1280" height="800" />
      <figcaption className="mono"><Icon name="check" size={13} /> FROM AN IDEA TO A WORKING PRODUCT</figcaption>
    </figure>
    <button type="button" className="about-character" onClick={onMascot} aria-label="Meet the DADA mascot">
      <span className="about-thought mono">WHAT IF?<Icon name="lightbulb" size={16} /></span>
      <MascotImage pose="thinking" loading="lazy" decorative />
      <span className="about-character-action">Meet our mascot <Icon name="arrow" size={15} /></span>
    </button>
    <span className="about-coordinate mono" aria-hidden="true">LEARN ↗ BUILD ↗ REPEAT</span>
  </div>;
}
