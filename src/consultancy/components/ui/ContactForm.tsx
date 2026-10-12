import { useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { siteConfig } from '@/data/site-config';
import { hasErrors, normalizeContact, validateContact, type ContactErrors } from '@/lib/contact';
import Button from './Button';
import { enquiryEndpoint } from '../../../contact-details';
import { sendEnquiry } from '../../../enquiry-delivery';

const initialValues = { name: '', email: '', enquiryType: '', budget: '', timeline: '', message: '' };
type Field = keyof typeof initialValues;
const labels: Record<Field, string> = {
  name: 'Name', email: 'Email', enquiryType: 'What is this about?',
  budget: 'Budget (optional)', timeline: 'Timeline (optional)', message: 'Message',
};

/** Email the team through the shared endpoint, with an email-app fallback. */
export default function ContactForm() {
  const id = useId();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [prepared, setPrepared] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [website, setWebsite] = useState('');
  const inFlight = useRef(false);
  const request = useRef({ payload: '', id: '' });
  const input = normalizeContact(values);
  const body = `Name: ${input.name}\nEmail: ${input.email}\nAbout: ${input.enquiryType}\nBudget: ${input.budget || 'Not specified'}\nTimeline: ${input.timeline || 'Not specified'}\n\n${input.message}`;
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Consultancy enquiry — ${input.enquiryType}`)}&body=${encodeURIComponent(body)}`;

  function update(field: Field, value: string) {
    setValues(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
    setPrepared(false); setCopyStatus(''); setStatus(null);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    setStatus(null); setPrepared(false);
    const nextErrors = validateContact(input);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    if (!enquiryEndpoint) { setPrepared(true); return; }
    const payload = { ...input, source: 'consultancy', website };
    const serialised = JSON.stringify(payload);
    if (request.current.payload !== serialised) request.current = { payload: serialised, id: crypto.randomUUID() };
    inFlight.current = true; setBusy(true);
    try {
      const result = await sendEnquiry(enquiryEndpoint, payload, { requestId: request.current.id });
      setStatus(result);
      if (result.ok) { setValues(initialValues); setWebsite(''); request.current = { payload: '', id: '' }; }
      else setPrepared(true);
    } finally { inFlight.current = false; setBusy(false); }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(body); setCopyStatus('Enquiry copied. Paste it into your email.'); }
    catch { setCopyStatus('Select and copy the enquiry text below.'); }
  }
  return <form onSubmit={submit} noValidate aria-busy={busy} className="grid gap-6 rounded-lg border border-line bg-surface p-6 md:p-8">
    <div><h3 className="text-h3">Start a conversation</h3><p className="mt-2 text-small text-muted">{enquiryEndpoint ? <>Your enquiry is emailed to <a href={`mailto:${siteConfig.email}`} className="underline break-all">{siteConfig.email}</a>. We’ll reply using your contact details.</> : <>Prepare an email to <a href={`mailto:${siteConfig.email}`} className="underline break-all">{siteConfig.email}</a>, or use the call and WhatsApp links beside this form.</>}</p></div>
    <fieldset disabled={busy} className="grid min-w-0 gap-6"><legend className="sr-only">Consultancy enquiry</legend>
    <div className="absolute -left-[10000px] size-px overflow-hidden" aria-hidden="true"><label htmlFor={`${id}-website`}>Leave this field empty</label><input id={`${id}-website`} name="website" value={website} onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" /></div>
    <div className="grid gap-6 md:grid-cols-2">{(['name', 'email'] as Field[]).map(field => <div key={field}>
      <label htmlFor={`${id}-${field}`} className="mb-2 block text-small font-semibold">{labels[field]}</label>
      <input id={`${id}-${field}`} name={field} type={field === 'email' ? 'email' : 'text'} autoComplete={field}
        maxLength={field === 'name' ? 80 : 120} required value={values[field]} onChange={e => update(field, e.target.value)}
        className="field" aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${id}-${field}-error` : undefined} />
      {errors[field] && <p id={`${id}-${field}-error`} className="mt-2 text-small text-[#b42323]" role="alert">{errors[field]}</p>}
    </div>)}</div>
    {(['enquiryType', 'budget', 'timeline'] as const).map(field => {
      const options = field === 'enquiryType' ? siteConfig.contactForm.enquiryTypes : field === 'budget' ? siteConfig.contactForm.budgets : siteConfig.contactForm.timelines;
      return <div key={field}>
        <label htmlFor={`${id}-${field}`} className="mb-2 block text-small font-semibold">{labels[field]}</label>
        <select id={`${id}-${field}`} name={field} value={values[field]} onChange={e => update(field, e.target.value)}
          required={field === 'enquiryType'} className="field" aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${id}-${field}-error` : undefined}>
          <option value="">{field === 'enquiryType' ? 'Choose one' : 'Not specified'}</option>
          {options.map(option => <option key={option}>{option}</option>)}
        </select>
        {errors[field] && <p id={`${id}-${field}-error`} className="mt-2 text-small text-[#b42323]" role="alert">{errors[field]}</p>}
      </div>;
    })}
    <div><label htmlFor={`${id}-message`} className="mb-2 block text-small font-semibold">Message</label>
      <textarea id={`${id}-message`} name="message" required rows={5} maxLength={2000} className="field resize-y" value={values.message}
        onChange={e => update('message', e.target.value)} placeholder="Tell us about your project or question."
        aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${id}-message-error` : undefined} />
      {errors.message && <p id={`${id}-message-error`} className="mt-2 text-small text-[#b42323]" role="alert">{errors.message}</p>}
    </div>
    <Button type="submit" size="lg" disabled={busy}>{busy ? 'Sending enquiry…' : enquiryEndpoint ? 'Send enquiry' : 'Prepare enquiry'}</Button>
    </fieldset>
    {status && <p role={status.ok ? 'status' : 'alert'} className="rounded-md border border-line-strong p-4 text-small">{status.message}</p>}
    {prepared && <div className="grid gap-4 rounded-md border border-line-strong p-4">
      <p role="status" className="text-small">{enquiryEndpoint ? 'Automatic delivery could not be confirmed. You can use your email app instead.' : `Your enquiry has not been sent. Open your email app to send it to ${siteConfig.email}.`}</p>
      <textarea readOnly aria-label="Prepared enquiry" className="field text-small" rows={8} value={body} />
      <div className="flex flex-wrap gap-3"><Button href={mailto}>Open email app</Button><Button onClick={copy} variant="secondary">Copy enquiry</Button></div>
      <p className="text-small" role="status">{copyStatus}</p>
    </div>}
  </form>;
}
