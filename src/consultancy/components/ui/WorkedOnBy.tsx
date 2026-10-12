import { Fragment } from 'react';
import { memberHref } from '@/data/team';
import { publicPath } from '@/lib/paths';
import Todo from '@/components/ui/Todo';

/**
 * Names of the team members who worked on a project. Each name jumps to that person's card in the
 * Team section; a name not in data/team.ts is shown as plain text.
 *
 * These are plain anchors on purpose: next/link's client-side navigation changes the URL without
 * updating the browser's :target state, so the card's highlight (group-target styles in Team.tsx)
 * would never show. A native jump also works on the homepage, and from a case-study page it loads
 * the (static) homepage at the card.
 */
export default function WorkedOnBy({ names }: { names?: string[] }) {
  if (!names || names.length === 0) return <Todo>who worked on it</Todo>;
  return (
    <span className="font-semibold">
      {names.map((name, index) => {
        const href = memberHref(name);
        return (
          <Fragment key={name}>
            {index > 0 ? ', ' : null}
            {href ? (
              <a href={publicPath(href)} className="underline-offset-4 hover:underline">
                {name}
              </a>
            ) : (
              name
            )}
          </Fragment>
        );
      })}
    </span>
  );
}
