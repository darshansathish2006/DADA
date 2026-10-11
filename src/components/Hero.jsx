import { Icon, MascotImage } from './Shared';
import { siteConfig } from '../content';

export default function Hero({ onMascot }) {
  return <section id="home" className="hero" aria-labelledby="hero-title">
    <div className="container">
      <div className="hero-topline"><p className="eyebrow"><span className="status-dot" /> INDEPENDENT MINDS. COLLECTIVE ENERGY.</p><span className="mono">TEAM DADA / STUDENT COLLECTIVE</span></div>
      <h1 id="hero-title"><span>DIFFERENT MINDS.</span><span className="outline-title">SAME FREQUENCY<span className="title-period">.</span></span></h1>
      <p className="hero-expansion"><span>DADA /</span> {siteConfig.fullName}</p>
      <div className="hero-stage">
        <div className="hero-editorial"><span className="micro-label">[ IDEAS → REAL THINGS ]</span><p>We build things.<br />Break a few.<br /><em>Figure it out together.</em></p><div className="hero-description">A student-led technical team exploring the space between code, curiosity, and what comes next.</div><a className="button" href="#work">Explore Our Work <Icon name="arrow" size={21} /></a><a className="text-link" href="#team">Meet the Crew <span>↗</span></a></div>
        <div className="hero-visual"><div className="signal-ring ring-one" aria-hidden="true" /><div className="signal-ring ring-two" aria-hidden="true" /><span className="coordinate coordinate-top mono" aria-hidden="true">+ X: IDEAS / Y: IMPACT</span><div className="mascot-stage"><MascotImage pose="pointing" loading="eager" fetchPriority="high" /></div><span className="mascot-label mono">THE HUMAN SIDE<br />OF THE HARDWARE.</span><button className="mascot-signature" type="button" onClick={onMascot}>Meet the DADA mascot <Icon name="arrow" size={15} /></button></div>
      </div>
      <div className="hero-foot"><a href="#about" className="scroll-cue"><Icon name="down" size={17} /><span className="mono">SCROLL TO FIND YOUR FREQUENCY</span></a><span className="mono">IDEAS / CODE / COMMUNITY / REPEAT</span><span className="hero-page mono">[ 01 — 08 ]</span></div>
    </div>
    <div className="signal-ticker" aria-hidden="true"><div>{[0, 1].map(copy => <span key={copy}>BUILD SOMETHING <b>↗</b> BREAK THE PATTERN <b>↗</b> STAY CURIOUS <b>↗</b> MAKE IT MATTER <b>↗</b> </span>)}</div></div>
  </section>;
}
