import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import RevealController from './components/layout/RevealController';
import Hero from './components/sections/Hero';
import ClientStrip from './components/sections/ClientStrip';
import Services from './components/sections/Services';
import Work from './components/sections/Work';
import Process from './components/sections/Process';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import CaseStudy from './CaseStudy';
import './styles.css';

const path = window.location.pathname;
const slug = path.match(/^\/consultancy\/work\/([^/]+)\/?$/)?.[1];
createRoot(document.getElementById('root')!).render(<StrictMode>
  <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-ink">Skip to content</a>
  <Navigation />
  <main id="main">{slug ? <CaseStudy slug={slug} /> : <><Hero /><ClientStrip /><Services /><Work /><Process /><Testimonials /><Contact /></>}</main>
  <Footer /><RevealController />
</StrictMode>);
