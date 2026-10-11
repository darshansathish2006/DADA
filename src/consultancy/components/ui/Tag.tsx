import { cn } from '@/lib/utils';

/** Small pill for deliverables, stacks and categories. */
export default function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line px-3 py-1 text-xs font-medium text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
