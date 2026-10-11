import { useState } from 'react';
import { achievements, destinations, members, principles, services } from '../content';
export { default as ContributionsSection } from './Contributions';
import { DestinationLink, Icon, MascotImage } from './Shared';
import { WaveTrace } from './SignalField';

function Chapter({ number, children, className = '' }) {
  return <p className={`chapter mono ${className}`}><span>[ {number} ]</span>{children}<span className="chapter-line" aria-hidden="true" /></p>;
}

export function AboutSection({ onMascot }) {
  return <section id="about" className="section about-section"><div className="container">
    <Chapter number="02">THE PEOPLE BEHIND THE SIGNAL</Chapter>
    <div className="about-composition"><div className="about-aside reveal"><span className="micro-label">A LITTLE ABOUT US</span><p>No single way to think.<br />No limit to what we can try.</p><button className="about-mascot" onClick={onMascot} aria-label="Meet our curious DADA mascot"><MascotImage pose="thinking" loading="lazy" /><span className="thought-label mono">WHAT IF... ↗</span></button></div><div className="about-manifesto reveal"><h2>STUDENTS.<br />BUILDERS.<br /><span className="outline-title">ALWAYS</span><br /><span className="orange-text">CURIOUS.</span></h2><p>We learn by making things real. Team DADA brings student perspectives together to build, experiment, and solve problems that go beyond the classroom.</p></div><div className="principles-list">{principles.map((item, index) => <article className="principle reveal" key={item.title}><span className="mono">0{index + 1} /</span><Icon name={item.icon} size={21} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div>
    <div className="about-end mono"><span>INDEPENDENT THINKING</span><span className="about-connector" aria-hidden="true">──────────────────→</span><span>SHARED DIRECTION</span></div>
  </div></section>;
}

export function WhatWeDoSection({ onDestination }) {
  const [active, setActive] = useState(0);
  return <section id="what-we-do" className="section what-section"><div className="container">
    <Chapter number="03">FOUR CHANNELS. ONE COLLECTIVE.</Chapter>
    <div className="services-intro reveal"><h2>FIND YOUR<br /><span className="green-text">CHANNEL.</span></h2><p>Pick a direction.<br />We'll bring the curiosity,<br />the code, and the crew.</p><div className="spectrum" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ '--bar': `${22 + ((i * 37) % 78)}%`, '--delay': `${i * -.12}s` }} />)}</div></div>
    <div className="channel-list">{services.map((service, index) => {
      const isConsultancy = service.destination === 'consultancy';
      const heading = <><span className="channel-number mono">CH / {service.number}</span><h3>{service.title}</h3><span className="channel-tag mono">{service.tag}</span><span className="channel-symbol" aria-hidden="true">{isConsultancy ? '↗' : active === index ? '−' : '+'}</span></>;
      return <article key={service.number} className={`service-channel channel-${index + 1} ${active === index ? 'is-active' : ''}`}>
        {isConsultancy ? <DestinationLink destination="consultancy" onDestination={onDestination} className="channel-heading">{heading}</DestinationLink> : <button className="channel-heading" type="button" onClick={() => setActive(index)} aria-expanded={active === index} aria-controls={`channel-panel-${index}`}>{heading}</button>}
        {!isConsultancy && <div className="channel-panel" id={`channel-panel-${index}`} hidden={active !== index}><Icon name={service.icon} size={32} /><p>{service.text}</p>{service.destination ? <DestinationLink destination={service.destination} onDestination={onDestination} className="channel-link">Explore {service.destination}<Icon name="arrow" size={20} /></DestinationLink> : <a className="channel-link" href={service.target}>Take a closer look<Icon name="arrow" size={20} /></a>}<WaveTrace /></div>}
      </article>;
    })}</div>
  </div></section>;
}

export function ExploreWorkSection({ onDestination }) {
  return <section id="work" className="section work-section"><div className="container">
    <Chapter number="04">OPEN A NEW POSSIBILITY</Chapter>
    <div className="work-heading reveal"><h2>LESS TALK.<br /><span className="pink-text">MORE MAKING.</span></h2><span className="oversize-arrow" aria-hidden="true">↘</span></div>
    <div className="work-composition"><DestinationLink destination="consultancy" onDestination={onDestination} className="work-card work-consultancy reveal"><div className="work-card-top mono"><span>01 / FOR YOUR NEXT BIG IDEA</span><span>[ BUILD ]</span></div><div className="work-card-copy"><span className="work-kicker">DADA / CONSULTANCY</span><h3>FROM<br />“WHAT IF”<br /><span>TO WHAT'S NEXT.</span></h3><p>{destinations.consultancy.description}</p></div><div className="code-art" aria-hidden="true"><div className="code-art-top mono"><span>idea → reality</span><Icon name="code" size={18} /></div><code><span>const</span> next = {'{'}<br />&nbsp; curiosity: <b>unlimited</b>,<br />&nbsp; team: <b>'DADA'</b><br />{'}'};<br /><span>await</span> build(next);</code><span className="code-crosshair">+</span></div><div className="work-card-link">Explore Consultancy <Icon name="arrow" size={25} /></div></DestinationLink>
      <DestinationLink destination="workshops" onDestination={onDestination} className="work-card work-workshops reveal"><div className="work-card-top mono"><span>02 / LEARN IT BY DOING IT</span><span>[ LEARN ]</span></div><div className="workshop-art"><span className="workshop-word" aria-hidden="true">HANDS<br />ON.</span><MascotImage pose="laptop" loading="lazy" decorative /><span className="workshop-caption mono">CURIOUS MINDS WELCOME.</span></div><div className="work-card-copy"><span className="work-kicker">DADA / WORKSHOPS</span><h3>GET YOUR<br /><span>IDEAS DIRTY.</span></h3><p>{destinations.workshops.description}</p></div><div className="work-card-link">Explore Workshops <Icon name="arrow" size={25} /></div></DestinationLink>
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
