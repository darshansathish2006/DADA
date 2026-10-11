import { useEffect, useRef, useState } from 'react';
import { navigation } from '../content';
import { Icon, Wordmark } from './Shared';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  const menu = useRef(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update(); window.addEventListener('scroll', update, { passive: true });
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    navigation.forEach(([, id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => { window.removeEventListener('scroll', update); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = event => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (event.key === 'Tab') {
        const items = [toggle.current, ...menu.current.querySelectorAll('a')];
        const first = items[0], last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const desktop = window.matchMedia('(min-width: 1100px)');
    const onResize = event => { if (event.matches) setOpen(false); };
    document.addEventListener('keydown', onKey); desktop.addEventListener('change', onResize);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKey); desktop.removeEventListener('change', onResize); };
  }, [open]);
  function closeMenu(event) {
    setOpen(false);
    const target = document.querySelector(event.currentTarget.hash);
    if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  }
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}><div className="nav-container">
    <a href="#home" className="brand" aria-label="Team DADA home"><Wordmark /><span className="brand-caption">STUDENT-LED.<br />FUTURE-FOCUSED.</span></a>
    <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)}><Icon name={open ? 'x' : 'menu'} /></button>
    <nav ref={menu} id="primary-navigation" className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      {navigation.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
      <a className="button button-small" href="#contact" onClick={closeMenu}>Work With Us <Icon name="arrow" size={16} /></a>
      <span className="mobile-nav-note mono">GOOD IDEAS START WITH A CONVERSATION.</span>
    </nav>
  </div></header>;
}
