import { ArrowDown, ArrowUpRight, BrainCircuit, Building2, Check, ChevronRight, Code2, Copy, Github, Layers3, Lightbulb, Linkedin, Laptop, Menu, Mic2, Plus, Send, Sparkles, Terminal, Users, Workflow, X, Zap, Trophy, Fingerprint } from 'lucide-react';
import { mascotPoses, siteConfig } from '../content';

const icons = { arrow: ArrowUpRight, down: ArrowDown, brain: BrainCircuit, building: Building2, check: Check, chevron: ChevronRight, code: Code2, copy: Copy, github: Github, layers: Layers3, linkedin: Linkedin, laptop: Laptop, lightbulb: Lightbulb, menu: Menu, mic: Mic2, plus: Plus, send: Send, sparkles: Sparkles, terminal: Terminal, users: Users, workflow: Workflow, x: X, zap: Zap, trophy: Trophy, fingerprint: Fingerprint };
export function Icon({ name, size = 22, ...props }) { const Component = icons[name] || Sparkles; return <Component size={size} strokeWidth={1.6} aria-hidden="true" {...props} />; }

export function Wordmark({ className = '' }) { return <span className={`wordmark ${className}`}><img src="/assets/branding/dada-logo-blue.png" alt="DADA" width="1536" height="1024" /></span>; }

export function SectionHeading({ index, label, title, accent, description, children }) {
  return <div className="section-heading reveal"><div><p className="eyebrow"><span>{index} /</span> {label}</p><h2>{title}{accent && <><br /><span className="accent">{accent}</span></>}</h2></div><div className="section-heading-aside">{description && <p>{description}</p>}{children}</div></div>;
}

export function MascotImage({ className = '', pose = 'pointing', decorative = false, miniature = false, ...props }) {
  const asset = mascotPoses[pose] || mascotPoses.pointing;
  return <img className={`mascot-image mascot-${pose} ${miniature ? 'mascot-miniature' : ''} ${className}`} src={asset.src} alt={decorative ? '' : asset.alt} width="1024" height="1536" {...props} />;
}

export function DestinationLink({ destination, onDestination, children, className = '', ...props }) {
  const url = destination === 'consultancy' ? siteConfig.consultancyUrl : siteConfig.workshopsUrl;
  return url ? <a href={url} className={className} {...props}>{children}</a> : <button type="button" className={className} onClick={() => onDestination(destination)} {...props}>{children}</button>;
}
