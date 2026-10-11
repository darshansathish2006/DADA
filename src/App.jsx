import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { AboutSection, AchievementsSection, ContributionsSection, ExploreWorkSection, TeamSection, WhatWeDoSection } from './components/Sections';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import SignalField from './components/SignalField';

export default function App() {
  const [modal, setModal] = useState(null);
  const [enquiryType, setEnquiryType] = useState(null);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = event => { if (event.matches) setPaused(true); };
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const nodes = [...document.querySelectorAll('.reveal')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('will-reveal'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    nodes.forEach(node => { if (node.getBoundingClientRect().top > window.innerHeight) { node.classList.add('will-reveal'); observer.observe(node); } });
    return () => { observer.disconnect(); nodes.forEach(node => node.classList.remove('will-reveal')); };
  }, []);
  function enquire(type) {
    setModal(null); setEnquiryType({ type, timestamp: Date.now() });
    requestAnimationFrame(() => {
      document.getElementById('contact').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      document.getElementById('enquiry-name')?.focus({ preventScroll: true });
    });
  }
  return <div className={`site-shell ${paused ? 'motion-paused' : ''}`}><SignalField paused={paused} /><a href="#main" className="skip-link">Skip to content</a><Navbar /><main id="main"><Hero onMascot={() => setModal('mascot')} /><AboutSection onMascot={() => setModal('mascot')} /><WhatWeDoSection onDestination={setModal} /><ExploreWorkSection onDestination={setModal} /><AchievementsSection /><ContributionsSection motionPaused={paused} /><TeamSection /><Contact enquiryType={enquiryType} /></main><Footer onDestination={setModal} onMascot={() => setModal('mascot')} paused={paused} onToggleMotion={() => setPaused(value => !value)} /><Modal modal={modal} onClose={() => setModal(null)} onEnquire={enquire} /></div>;
}
