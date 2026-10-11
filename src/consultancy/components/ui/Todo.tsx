import { cn } from '@/lib/utils';

/**
 * Visible marker for content that has not been supplied yet. Used instead of invented
 * names, numbers, quotes or links — search the codebase for `<Todo` to list what is missing.
 */
export default function Todo({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-dashed border-todo px-2 py-0.5 font-body text-xs font-medium normal-case leading-normal tracking-normal text-todo',
        className,
      )}
    >
      <span className="sr-only">Missing content: </span>
      TODO: {children}
    </span>
  );
}
