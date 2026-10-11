import { useEffect, useRef } from 'react';

// Decorative signal traces. Drawing is capped at 30 fps and stops in hidden tabs.
export default function SignalField({ paused, mode = 'sine', frequency = 1 }) {
  const canvas = useRef(null);
  const refresh = useRef(null);
  const settings = useRef({ paused, mode, frequency });
  settings.current = { paused, mode, frequency };
  useEffect(() => {
    const element = canvas.current;
    const context = element.getContext('2d');
    if (!context) return;
    let width = 0, height = 0, frame = 0, last = 0, phase = 0;
    const colors = ['#1489ff', '#ff6d24', '#a3ff37', '#ff3eb5'];
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * ratio); element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    function draw() {
      context.clearRect(0, 0, width, height);
      const { mode: waveMode, frequency: speed } = settings.current;
      colors.forEach((color, channel) => {
        context.beginPath();
        for (let x = -5; x <= width + 5; x += 4) {
          const t = x / width;
          const envelope = Math.pow(Math.sin(t * Math.PI), 2);
          const wave = Math.sin(t * Math.PI * (5 + channel * .3) * speed + phase + channel * .6);
          const signal = waveMode === 'pulse' ? Math.tanh(wave * 4) : wave;
          const y = height * (.54 + channel * .035) + signal * height * .15 * envelope
            + Math.sin(t * Math.PI * 3 - phase * .4) * height * .045;
          if (x === -5) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.strokeStyle = color;
        context.lineWidth = channel === 0 ? 1.6 : 1;
        context.globalAlpha = channel === 0 ? .65 : .4;
        context.shadowColor = color; context.shadowBlur = 8;
        context.stroke(); context.shadowBlur = 0;
      });
      context.globalAlpha = 1;
    }
    function tick(time) {
      frame = requestAnimationFrame(tick);
      if (time - last < 33) return;
      if (!settings.current.paused) phase += Math.min(time - last, 50) * .00055;
      last = time;
      draw();
    }
    function visibility() {
      cancelAnimationFrame(frame);
      draw();
      if (!document.hidden && !settings.current.paused) { last = performance.now(); frame = requestAnimationFrame(tick); }
    }
    refresh.current = visibility;
    resize(); visibility();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    return () => { refresh.current = null; cancelAnimationFrame(frame); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => { refresh.current?.(); }, [paused, mode, frequency]);
  return <canvas ref={canvas} className="signal-field" aria-hidden="true" />;
}

export function WaveTrace({ className = '', mode = 'sine', frequency = 1 }) {
  const path = (amplitude, phase) => Array.from({ length: 351 }, (_, index) => {
    const x = index * 4 - 400;
    const wave = Math.sin(x * Math.PI / 100 * frequency + phase);
    const y = 80 + (mode === 'pulse' ? Math.tanh(wave * 4) : wave) * amplitude;
    return `${index ? 'L' : 'M'}${x},${y.toFixed(2)}`;
  }).join('');
  return <svg className={`wave-trace ${className}`} style={{ '--wave-shift': `${-200 / frequency}px` }} viewBox="0 0 600 160" fill="none" aria-hidden="true"><path className="wave-axis" d="M0 80H600M100 0V160M200 0V160M300 0V160M400 0V160M500 0V160" /><path className="wave-path" d={path(65, 0)} /><path className="wave-echo" d={path(34, 1)} /></svg>;
}
