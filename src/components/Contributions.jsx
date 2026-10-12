import { useEffect, useRef, useState } from 'react';
import { contributions } from '../content';
import { engagements, projects, technicalInitiatives } from '../portfolio';
import { Icon } from './Shared';
import EventGallery from './EventGallery';

const previews = {
  projects: { image: projects[0].image, label: 'EchoSenseAI / A closer look' },
  initiatives: { image: technicalInitiatives[1].image, label: 'Smart Ability / The winning moment' },
  engagements: { image: engagements[2].photos[0].src, label: 'CLICK / Learning, shared' },
};

function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);
  const screen = useRef(null);
  const project = projects[index];
  const move = direction => setIndex(current => (current + direction + projects.length) % projects.length);

  useEffect(() => {
    const element = screen.current;
    function handleMove(event) {
      const start = touchStart.current;
      if (!start || event.touches.length !== 1) return;
      const touch = event.touches[0];
      const horizontal = Math.abs(touch.clientX - start.x);
      if (horizontal > 10 && horizontal > Math.abs(touch.clientY - start.y) * 1.5 && event.cancelable) event.preventDefault();
    }
    element.addEventListener('touchmove', handleMove, { passive: false });
    return () => element.removeEventListener('touchmove', handleMove);
  }, []);

  return <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="DADA projects"
    onKeyDown={event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
      }
    }}>
    <div className="project-selector" aria-label="Choose a project">
      {projects.map((item, itemIndex) => <button type="button" key={item.id} aria-pressed={index === itemIndex}
        onClick={() => setIndex(itemIndex)}><span className="mono">0{itemIndex + 1}</span>{item.name}</button>)}
    </div>
    <div className="project-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.name}`}>
      <figure className="project-screen" ref={screen}
        onTouchStart={event => { touchStart.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={event => {
          const start = touchStart.current; touchStart.current = null;
          const end = event.changedTouches[0];
          if (!start || !end || event.touches.length) return;
          const distance = end.clientX - start.x;
          if (Math.abs(distance) > 45 && Math.abs(distance) > Math.abs(end.clientY - start.y) * 1.5) move(distance < 0 ? 1 : -1);
        }}>
        <div className="project-screen-bar mono"><span><i /><i /><i /></span><span>{project.name} / INTERFACE</span><Icon name="code" size={16} /></div>
        <img src={project.image} alt={project.alt} width="1280" height="800" draggable="false" />
        <figcaption className="mono">{project.imageCaption || 'Interface from Darshan’s portfolio'}</figcaption>
      </figure>
      <div className="project-description" aria-live="polite" aria-atomic="true">
        <span className="project-category mono">{project.category}</span>
        <h4>{project.name}</h4>
        <p className="project-subtitle">{project.subtitle}</p>
        <p>{project.description}</p>
        <ul className="project-stack" aria-label="Technologies">{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <p className="project-highlight"><Icon name={index < 2 ? 'trophy' : 'zap'} size={17} />{project.highlight}</p>
      </div>
    </div>
    <div className="carousel-bottom">
      <span className="carousel-hint mono">FOUR BUILDS. FOUR DIFFERENT POSSIBILITIES.</span>
      <div className="carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous project"><Icon name="chevron" className="previous-chevron" /></button>
        <span className="mono" aria-live="off">0{index + 1}<span> / 0{projects.length}</span></span>
        <button type="button" onClick={() => move(1)} aria-label="Next project"><Icon name="chevron" /></button>
      </div>
    </div>
  </div>;
}

function TechnicalInitiatives() {
  const wins = technicalInitiatives.filter(item => item.result === 'Winner').length;
  const finalists = technicalInitiatives.length - wins;
  return <div className="initiative-content">
    <div className="records-intro"><h4>BUILT UNDER<br /><span className="orange-text">PRESSURE.</span></h4><p><strong>{wins}</strong> wins <span>/</span> <strong>{finalists}</strong> finalist {finalists === 1 ? 'finish' : 'finishes'}</p></div>
    <div className="initiative-grid">{technicalInitiatives.map(item => <article className="initiative-record" key={item.id}>
      <img src={item.image} alt={item.alt} loading="lazy" width="1200" height="900" style={{ objectPosition: item.position || 'center' }} />
      <div className="record-copy"><div className="record-meta mono"><span className={item.result === 'Winner' ? 'result-winner' : 'result-finalist'}>{item.result}</span><span>{item.date}</span></div><h5>{item.title}</h5><p className="record-detail">{item.detail}</p><p>{item.description}</p><span className="record-project mono">{item.project}</span></div>
    </article>)}</div>
  </div>;
}

function Engagements({ motionPaused }) {
  return <div className="engagement-content">
    <div className="records-intro"><h4>KNOWLEDGE<br /><span className="pink-text">GOES FURTHER.</span></h4><p>On stage. In the classroom.<br />Learning, shared.</p></div>
    <div className="engagement-grid">{engagements.map(item => <article className="engagement-record" key={item.id}>
      <EventGallery event={item} motionPaused={motionPaused} />
      <div className="record-copy"><div className="record-meta mono"><span>{item.category}</span><span>{item.date}</span></div><h5>{item.title}</h5><p className="record-detail">{item.detail}</p><p>{item.description}</p></div>
    </article>)}</div>
  </div>;
}

export default function ContributionsSection({ motionPaused = false }) {
  const [active, setActive] = useState(null);
  const lastTrigger = useRef(null);
  const selectionLocked = useRef(false);
  function open(id, reveal = false) {
    // A deliberate click/keyboard choice takes precedence over hover previews.
    if (!reveal && selectionLocked.current) return;
    if (reveal) selectionLocked.current = true;
    lastTrigger.current = id; setActive(id);
    if (reveal) requestAnimationFrame(() => {
      const panel = document.getElementById(`contribution-panel-${id}`);
      panel?.focus({ preventScroll: true });
      panel?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  }
  function close() {
    selectionLocked.current = false;
    setActive(null);
    document.getElementById(`contribution-trigger-${lastTrigger.current}`)?.focus();
  }
  return <section id="contributions" className="section contributions-section" onKeyDown={event => {
    if (event.key === 'Escape' && active) { event.stopPropagation(); close(); }
  }}><div className="container">
    <p className="chapter mono"><span>[ 06 ]</span>GOOD ENERGY TRAVELS<span className="chapter-line" aria-hidden="true" /></p>
    <div className="contribution-heading reveal"><span className="micro-label">OUTSIDE OUR OWN BUBBLE.</span><h2>THE RIPPLE<br /><span className="outline-title">EFFECT.</span></h2><p>Projects, technical initiatives, and shared experiences. Explore the things we build and the communities we learn with.</p></div>
    <p className="gallery-open-hint"><Icon name="pointer" size={21} /><span><strong>Click a card to open its gallery.</strong> Explore the photos, stories, and project details inside.</span></p>
    <div className="contribution-network gallery-channels">{contributions.map(item => <article className={`contribution-node node-${item.number} reveal ${active === item.id ? 'node-active' : ''}`} key={item.id}>
      <button className="contribution-trigger" id={`contribution-trigger-${item.id}`} type="button"
        aria-expanded={active === item.id} aria-controls={`contribution-panel-${item.id}`}
        aria-labelledby={`contribution-title-${item.id} contribution-action-${item.id}`} aria-describedby={`contribution-description-${item.id}`}
        onPointerMove={event => { if (event.pointerType === 'mouse' && (event.movementX || event.movementY)) open(item.id); }} onClick={() => open(item.id, true)}>
        <span className="node-preview" aria-hidden="true"><img src={previews[item.id].image} alt="" loading="lazy" width="1200" height="750" /><span className="node-preview-caption mono">{previews[item.id].label}</span><span className="node-open-badge mono"><Icon name="pointer" size={13} />{active === item.id ? 'OPEN BELOW' : 'CLICK TO OPEN'}</span></span>
        <span className="node-copy"><span className="node-label mono"><span>{item.meta}</span><Icon name={item.icon} size={22} /></span>
          <span className="node-title" id={`contribution-title-${item.id}`}>{item.title}</span>
          <span className="node-description" id={`contribution-description-${item.id}`}>{item.text}</span>
        </span>
        <span className="node-action" id={`contribution-action-${item.id}`}>{item.action}<Icon name="down" size={20} /></span>
      </button>
    </article>)}</div>
    {contributions.map(item => <div key={item.id} id={`contribution-panel-${item.id}`} hidden={active !== item.id}
      className={`contribution-detail detail-${item.id}`} role="region" tabIndex={-1} aria-labelledby={`contribution-title-${item.id}`}>
      {active === item.id && <><div className="contribution-detail-top mono"><span><i className="status-dot" />{item.title} / OPEN CHANNEL</span><button type="button" onClick={close} aria-label={`Close ${item.title}`}><span>CLOSE</span><Icon name="x" size={18} /></button></div>
        {item.id === 'projects' ? <ProjectCarousel /> : item.id === 'initiatives' ? <TechnicalInitiatives /> : <Engagements motionPaused={motionPaused} />}
      </>}
    </div>)}
  </div></section>;
}
