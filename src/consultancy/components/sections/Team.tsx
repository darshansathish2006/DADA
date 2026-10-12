import { Image } from '@/lib/navigation';
import { ArrowUpRight } from 'lucide-react';
import { memberId, pendingMembers, team, type TeamMember } from '@/data/team';
import { reveal } from '@/lib/reveal';
import { publicPath } from '@/lib/paths';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Tag from '@/components/ui/Tag';
import Todo from '@/components/ui/Todo';

/** Member cards: consistent square photo crop, name, role and profile links. Data: data/team.ts. */
export default function Team() {
  const total = team.length + pendingMembers;
  return (
    <Section id="team" labelledBy="team-heading" className="border-t border-line">
      <SectionHeader
        id="team-heading"
        eyebrow="Team"
        title="The people behind Team DADA"
        intro="A student-led collective based in Chennai."
      />

      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <li key={member.name} {...reveal((index % 3) * 80)}>
            <MemberCard member={member} />
          </li>
        ))}
        {Array.from({ length: pendingMembers }, (_, index) => (
          <li key={`pending-${index}`} {...reveal(((team.length + index) % 3) * 80)}>
            <PendingCard number={team.length + index + 1} total={total} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ProfileLink({ href, label, name }: { href: string; label: string; name: string }) {
  return (
    <a
      href={publicPath(href)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 hover:underline"
    >
      {label}
      <ArrowUpRight size={14} aria-hidden="true" />
      <span className="sr-only">
        : {name} (opens in a new tab)
      </span>
    </a>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article id={memberId(member.name)} className="group scroll-mt-28">
      <div className="aspect-square overflow-hidden rounded-lg border border-line bg-surface group-target:ring-2 group-target:ring-accent">
        {member.photo ? (
          <Image
            src={publicPath(member.photo.src)}
            alt={member.photo.alt}
            width={member.photo.width}
            height={member.photo.height}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
            quality={75}
            className="size-full object-cover"
            style={member.photo.position ? { objectPosition: member.photo.position } : undefined}
          />
        ) : (
          <div className="flex size-full items-center justify-center p-4 text-center">
            <Todo>photo</Todo>
          </div>
        )}
      </div>
      <h3 className="mt-4 text-h3 group-target:text-accent">{member.name}</h3>
      <p className="mt-1 text-muted">{member.role ?? <Todo>role</Todo>}</p>
      {member.focus && member.focus.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${member.name}'s focus`}>
          {member.focus.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>
      ) : null}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-small font-semibold">
        {member.linkedin ? (
          <li>
            <ProfileLink href={member.linkedin} label="LinkedIn" name={member.name} />
          </li>
        ) : null}
        {member.github ? (
          <li>
            <ProfileLink href={member.github} label="GitHub" name={member.name} />
          </li>
        ) : null}
        {member.website ? (
          <li>
            <ProfileLink href={member.website} label="Portfolio" name={member.name} />
          </li>
        ) : null}
        {member.resume ? (
          <li>
            <ProfileLink href={member.resume} label="Resume" name={member.name} />
          </li>
        ) : (
          <li>
            <Todo>resume</Todo>
          </li>
        )}
        {!member.linkedin && !member.github ? (
          <li>
            <Todo>LinkedIn / GitHub</Todo>
          </li>
        ) : null}
      </ul>
    </article>
  );
}

/** Same shape as a member card, so the grid stays even while details are still to come. */
function PendingCard({ number, total }: { number: number; total: number }) {
  return (
    <article>
      <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-line-strong p-4 text-center">
        <Todo>photo</Todo>
      </div>
      <p className="eyebrow mt-4">
        Member {number} of {total}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <Todo>name</Todo>
        <Todo>role</Todo>
        <Todo>LinkedIn / GitHub</Todo>
      </div>
    </article>
  );
}
