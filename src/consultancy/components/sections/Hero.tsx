import { Image } from '@/lib/navigation';
import { ArrowUpRight } from 'lucide-react';
import { bookingHref } from '@/data/site-config';
import { projects } from '@/data/projects';
import { publicPath } from '@/lib/paths';
import Button from '@/components/ui/Button';
import Process from './Process';

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="pb-12 pt-10 md:pb-20 md:pt-16">
      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow">Team DADA · Consultancy · Chennai</p>
            <h1 id="hero-heading" className="mt-5 max-w-[14ch] text-display font-bold">
              Your vision.<br />Our expertise.<br /><span className="text-accent">Built together.</span>
            </h1>
            <p className="mt-6 max-w-xl text-body text-muted">
              Websites shaped around your business. We help you define what you need, design the
              experience, and build the right way for customers to find you and get in touch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#work" size="lg">Explore our projects</Button>
              <Button href={bookingHref} variant="secondary" size="lg">Discuss your project</Button>
            </div>
            <p className="mt-7 flex items-center gap-3 text-small text-muted">
              <span className="inline-block size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {projects.length} consultancy projects · Built for businesses and professionals
            </p>
          </div>
          <figure className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-line bg-surface lg:col-span-5">
            <Image
              src={publicPath('/mascot/dada-pointing.png')}
              alt="The DADA mascot in a DADA hoodie, pointing toward you"
              width={1024}
              height={1536}
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 448px, 90vw"
              priority
              className="h-auto w-full"
            />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-lg border border-line bg-bg/95 px-5 py-4">
              <div>
                <p className="eyebrow">A familiar face. A focused purpose.</p>
                <p className="mt-1 font-heading text-body font-bold">Let’s build your next chapter.</p>
              </div>
              <ArrowUpRight className="shrink-0 text-accent" size={24} aria-hidden="true" />
            </figcaption>
          </figure>
        </div>
        <Process />
      </div>
    </section>
  );
}
