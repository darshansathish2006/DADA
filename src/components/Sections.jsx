import { useState } from 'react';
import { achievements, members, principles, services } from '../content';
export { default as ContributionsSection } from './Contributions';
import { DestinationLink, Icon, MascotImage } from './Shared';
import { WaveTrace } from './SignalField';
import AboutVisual from './AboutVisual';
import { sitePath } from '../site-paths';

function Chapter({ number, children, className = '' }) {
  return <p className={`chapter mono ${className}`}><span>[ {number} ]</span>{children}<span className="chapter-line" aria-hidden="true" /></p>;
}

export function AboutSection({ onMascot }) {
  return <section id="about" className="section about-section"><div className="container">
    <Chapter number="02">THE PEOPLE BEHIND THE SIGNAL</Chapter>
    <div className="about-layout">
      <div className="about-story reveal"><p className="micro-label">A LITTLE ABOUT US / A LOT OF CURIOSITY</p><h2>STUDENTS.<br />BUILDERS.<br /><span className="outline-title">ALWAYS</span><br /><span className="orange-text">CURIOUS.</span></h2><p>We learn by making things real. Team DADA brings student perspectives together to build, experiment, and solve problems that go beyond the classroom.</p><div className="about-build-loop mono"><span>AN IDEA</span><Icon name="arrow" size={17} /><span>A PROTOTYPE</span><Icon name="arrow" size={17} /><span>A POSSIBILITY</span></div></div>
      <AboutVisual onMascot={onMascot} />
    </div>
    <div className="about-values">{principles.map((item, index) => <article className={`about-value value-${index + 1} reveal`} key={item.title}><div className="about-value-symbol"><Icon name={item.icon} size={27} /><span className="mono">0{index + 1}</span><i aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
  </div></section>;
}

export function WhatWeDoSection({ onDestination }) {
  const [active, setActive] = useState(0);
  return <section id="what-we-do" className="section what-section"><div className="container">
    <Chapter number="03">FOUR CHANNELS. ONE COLLECTIVE.</Chapter>
    <div className="services-intro reveal"><h2>FIND YOUR<br /><span className="green-text">CHANNEL.</span></h2><p>Pick a direction.<br />We'll bring the curiosity,<br />the code, and the crew.</p><div className="spectrum" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ '--bar': `${22 + ((i * 37) % 78)}%`, '--delay': `${i * -.12}s` }} />)}</div></div>
    <div className="channel-list">{services.map((service, index) => {
      const isDestination = Boolean(service.destination);
      const heading = <><span className="channel-number mono">CH / {service.number}</span><h3>{service.title}</h3><span className="channel-tag mono">{service.tag}</span><span className="channel-symbol" aria-hidden="true">{isDestination ? '↗' : active === index ? '−' : '+'}</span></>;
      return <article key={service.number} className={`service-channel channel-${index + 1} ${active === index ? 'is-active' : ''}`}>
        {isDestination ? <DestinationLink destination={service.destination} onDestination={onDestination} className="channel-heading">{heading}</DestinationLink> : <button className="channel-heading" type="button" onClick={() => setActive(index)} aria-expanded={active === index} aria-controls={`channel-panel-${index}`}>{heading}</button>}
        {!isDestination && <div className="channel-panel" id={`channel-panel-${index}`} hidden={active !== index}><Icon name={service.icon} size={32} /><p>{service.text}</p><a className="channel-link" href={service.target}>Take a closer look<Icon name="arrow" size={20} /></a><WaveTrace /></div>}
      </article>;
    })}</div>
  </div></section>;
}

export function ExploreWorkSection({ onDestination }) {
  return <section id="work" className="section work-section"><div className="container">
    <Chapter number="04">OPEN A NEW POSSIBILITY</Chapter>
    <div className="work-heading reveal"><h2>LESS TALK.<br /><span className="pink-text">MORE MAKING.</span></h2><p className="section-open-hint"><Icon name="pointer" size={22} /><span>Have something in mind?<strong>Click a card to get started.</strong></span></p></div>
    <div className="work-composition work-invitations">
      <DestinationLink destination="consultancy" onDestination={onDestination} className="work-card work-consultancy reveal" aria-label="Build your company's project with us. Explore consultancy and client work.">
        <div className="work-card-top mono"><span>01 / DADA CONSULTANCY</span><span className="click-cue"><Icon name="pointer" size={14} /> CLICK TO EXPLORE</span></div>
        <div className="work-card-copy"><h3>Build your company's<br /><span>project with us.</span></h3><p>Websites, web apps, and tech & AI advice. Explore our client work and tell us what you want to build.</p></div>
        <div className="client-work-preview" aria-hidden="true"><div className="client-preview-screen"><div className="about-window-bar mono"><span><i /><i /><i /></span>SS BUILDERS<Icon name="arrow" size={13} /></div><img src={sitePath('/consultancy/projects/ss-builders/desktop-fold.jpg')} alt="" loading="lazy" width="1600" height="1000" /></div><div className="client-preview-screen preview-second"><div className="about-window-bar mono"><span><i /><i /><i /></span>DR. BELIN'S DENTISTRY</div><img src={sitePath('/consultancy/projects/belin-dentistry/desktop-fold.jpg')} alt="" loading="lazy" width="1600" height="1000" /></div><span className="client-preview-caption mono">REAL CLIENTS. WORKING WEBSITES.</span></div>
        <div className="work-card-link"><span>Explore our work & start a project<small>OPEN CONSULTANCY PORTFOLIO</small></span><Icon name="arrow" size={28} /></div>
      </DestinationLink>
      <DestinationLink destination="workshops" onDestination={onDestination} className="work-card work-workshops reveal" aria-label="Need a workshop to be conducted? Plan a workshop with DADA.">
        <div className="work-card-top mono"><span>02 / DADA WORKSHOPS</span><span className="click-cue"><Icon name="pointer" size={14} /> CLICK TO EXPLORE</span></div>
        <div className="work-card-copy"><h3>Need a workshop<br /><span>to be conducted?</span></h3><p>Bring hands-on learning to your campus or team. Tell us the topic, audience, and date you have in mind.</p></div>
        <div className="workshop-art"><span className="workshop-word" aria-hidden="true">LEARN.<br />MAKE.</span><MascotImage pose="laptop" loading="lazy" decorative /><span className="workshop-caption mono">LESS THEORY. MORE “I BUILT THIS.”</span><span className="workshop-topic"><Icon name="terminal" size={17} /> CODE. TRY. REPEAT.</span></div>
        <div className="work-card-link"><span>Let's plan your workshop<small>EXPLORE WORKSHOPS & ACTIVITIES</small></span><Icon name="arrow" size={28} /></div>
      </DestinationLink>
    </div>
  </div></section>;
}

export function AchievementsSection() {
  return <section id="achievements" className="section achievements-section"><div className="container">
    <Chapter number="05">THE BUILD LOG</Chapter>
    <div className="build-log-layout"><div className="build-log-intro reveal"><h2>SMALL STEPS.<br /><span className="blue-text">BIG ENERGY.</span></h2><p>Every challenge leaves us with something new. A skill. A connection. A better question.</p><div className="celebration-art"><span className="celebration-orbit" aria-hidden="true" /><MascotImage pose="celebrating" loading="lazy" /><span className="mono">KEEP. SHOWING. UP.</span></div></div><div className="build-log"><span className="log-status mono"><span className="status-dot" /> THREE WINS. MORE TO BUILD.</span>{achievements.map(item => <article className="achievement-card reveal" key={item.id}><div className="log-marker" aria-hidden="true" /><div className="achievement-top mono"><span>{item.category}</span><span>ENTRY / {item.id}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="achievement-meta mono"><span>{item.event} / {item.year}</span><span>{item.type}</span></div></article>)}</div></div>
  </div></section>;
}

export function TeamSection() {
  return <section id="team" className="section team-section"><div className="container">
    <Chapter number="07">THE CORE CREW</Chapter>
    <div className="team-composition"><div className="team-intro reveal"><span className="crew-count" aria-hidden="true">04<span>↗</span></span><h2>MINDS.<br /><span className="pink-text">ONE SIGNAL.</span></h2><p>Four students, different perspectives, and a shared urge to make things happen.</p><WaveTrace /></div><div className="crew-list">{members.map(member => <article className={`member-card crew-${member.id} reveal`} key={member.id}><div className="member-photo">{member.image ? <img src={member.image} alt={member.name} loading="lazy" width="480" height="540" /> : <><span aria-hidden="true">0{member.id}</span><Icon name="fingerprint" size={34} /></>}</div><div className="member-details"><span className="member-index mono">DADA / MEMBER 0{member.id}</span><h3>{member.name}</h3><p className="member-role">{member.role}</p><p className="member-introduction">{member.introduction}</p>{(member.github || member.linkedin || member.portfolio) && <div className="member-socials">{member.github && <a href={member.github} aria-label={`${member.name} on GitHub`}><Icon name="github" size={17} /></a>}{member.linkedin && <a href={member.linkedin} aria-label={`${member.name} on LinkedIn`}><Icon name="linkedin" size={17} /></a>}{member.portfolio && <a href={member.portfolio}>Portfolio <Icon name="arrow" size={15} /></a>}</div>}</div><span className="member-edge mono" aria-hidden="true">CORE CREW</span></article>)}</div></div>
  </div></section>;
}
