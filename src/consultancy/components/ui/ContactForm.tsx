import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import { siteConfig } from '@/data/site-config';
import { hasErrors, normalizeContact, validateContact, type ContactErrors } from '@/lib/contact';
import Button from './Button';

const initialValues = { name: '', email: '', enquiryType: '', budget: '', timeline: '', message: '' };
type Field = keyof typeof initialValues;
const labels: Record<Field, string> = {
  name: 'Name', email: 'Email', enquiryType: 'What is this about?',
  budget: 'Budget (optional)', timeline: 'Timeline (optional)', message: 'Message',
};

/** Prepare locally, then let the visitor send through their own email app. */
export default function ContactForm() {
  const id = useId();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [prepared, setPrepared] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const input = normalizeContact(values);
  const body = `Name: ${input.name}\nEmail: ${input.email}\nAbout: ${input.enquiryType}\nBudget: ${input.budget || 'Not specified'}\nTimeline: ${input.timeline || 'Not specified'}\n\n${input.message}`;
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Consultancy enquiry — ${input.enquiryType}`)}&body=${encodeURIComponent(body)}`;

  function update(field: Field, value: string) {
    setValues(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
    setPrepared(false); setCopyStatus('');
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(input);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    setPrepared(true);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(body); setCopyStatus('Enquiry copied. Paste it into your email.'); }
    catch { setCopyStatus('Select and copy the enquiry text below.'); }
  }
  return <form onSubmit={submit} noValidate className="grid gap-6 rounded-lg border border-line bg-surface p-6 md:p-8">
    <div><h3 className="text-h3">Start a conversation</h3><p className="mt-2 text-small text-muted">Prepare your enquiry here, then send it from your email app.</p></div>
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
    <Button type="submit" size="lg">Prepare enquiry</Button>
    {prepared && <div className="grid gap-4 rounded-md border border-line-strong p-4">
      <p role="status" className="text-small">Your enquiry is ready. Open your email app to send it to {siteConfig.email}.</p>
      <textarea readOnly aria-label="Prepared enquiry" className="field text-small" rows={8} value={body} />
      <div className="flex flex-wrap gap-3"><Button href={mailto}>Open email app</Button><Button onClick={copy} variant="secondary">Copy enquiry</Button></div>
      <p className="text-small" role="status">{copyStatus}</p>
    </div>}
  </form>;
}
