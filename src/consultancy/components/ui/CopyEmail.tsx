import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Shows the team email as a mailto link, with a button that copies it to the clipboard. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={`mailto:${email}`} className="break-all font-heading text-h3 font-bold hover:underline">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-xs font-semibold transition-colors hover:border-fg hover:bg-fg/5"
        aria-label={copied ? 'Email copied' : 'Copy email address'}
      >
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}
