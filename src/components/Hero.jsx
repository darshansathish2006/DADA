import { DestinationLink, Icon, MascotImage } from './Shared';
import { siteConfig } from '../content';

export default function Hero({ onMascot, onDestination }) {
  return <section id="home" className="hero" aria-labelledby="hero-title">
    <div className="container">
      <div className="hero-topline"><p className="eyebrow"><span className="status-dot" /> INDEPENDENT MINDS. COLLECTIVE ENERGY.</p><span className="mono">TEAM DADA / STUDENT COLLECTIVE</span></div>
      <h1 id="hero-title"><span>DIFFERENT MINDS.</span><span className="outline-title">SAME FREQUENCY<span className="title-period">.</span></span></h1>
      <p className="hero-expansion"><span>DADA /</span> {siteConfig.fullName}</p>
      <div className="hero-stage">
        <div className="hero-editorial"><span className="micro-label">[ IDEAS → REAL THINGS ]</span><p>Do your project<br /><em>with us.</em></p><div className="hero-description"><strong>Want to organize &amp; conduct a workshop?</strong>We’re here for you. Build your next idea with our team, or bring hands-on learning to your campus or workplace.</div><DestinationLink destination="consultancy" onDestination={onDestination} className="button">Start a project <Icon name="arrow" size={21} /></DestinationLink><DestinationLink destination="workshops" onDestination={onDestination} className="text-link">Plan a workshop <span>↗</span></DestinationLink></div>
        <div className="hero-visual"><div className="signal-ring ring-one" aria-hidden="true" /><div className="signal-ring ring-two" aria-hidden="true" /><span className="coordinate coordinate-top mono" aria-hidden="true">+ X: IDEAS / Y: IMPACT</span><div className="mascot-stage"><MascotImage pose="pointing" loading="eager" fetchPriority="high" /></div><span className="mascot-label mono">THE HUMAN SIDE<br />OF THE HARDWARE.</span><button className="mascot-signature" type="button" onClick={onMascot}>Meet the DADA mascot <Icon name="arrow" size={15} /></button></div>
      </div>
      <div className="hero-foot"><a href="#about" className="scroll-cue"><Icon name="down" size={17} /><span className="mono">SCROLL TO FIND YOUR FREQUENCY</span></a><span className="mono">IDEAS / CODE / COMMUNITY / REPEAT</span><span className="hero-page mono">[ 01 — 08 ]</span></div>
    </div>
    <div className="signal-ticker" aria-hidden="true"><div>{[0, 1].map(copy => <span key={copy}>BUILD SOMETHING <b>↗</b> BREAK THE PATTERN <b>↗</b> STAY CURIOUS <b>↗</b> MAKE IT MATTER <b>↗</b> </span>)}</div></div>
  </section>;
}
