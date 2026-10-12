import { useEffect, useRef, useState } from 'react';
import { enquiryTypes, siteConfig } from '../content';
import { submitEnquiry, validateEnquiry } from '../enquiry';
import { Icon, MascotImage } from './Shared';
import ContactDetails from './ContactDetails';
import { contactEmail } from '../contact-details';

const initialValues = { name: '', email: '', organization: '', enquiryType: '', message: '', website: '' };
export default function Contact({ enquiryType }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const inFlight = useRef(false);
  const formRef = useRef(null);
  const activeRequest = useRef(null);
  const requestIdentity = useRef({ payload: '', id: '' });
  useEffect(() => { if (enquiryType) setValues(previous => ({ ...previous, enquiryType: enquiryType.type })); }, [enquiryType]);
  useEffect(() => () => activeRequest.current?.abort(), []);
  function onChange(event) {
    const { name, value } = event.target;
    setValues(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
    setStatus(null); setCopied(false);
  }
  async function onSubmit(event) {
    event.preventDefault(); if (inFlight.current) return;
    const nextErrors = validateEnquiry(values); setErrors(nextErrors); setStatus(null);
    if (Object.keys(nextErrors).length) { formRef.current.elements[Object.keys(nextErrors)[0]]?.focus(); return; }
    inFlight.current = true; setSubmitting(true);
    const payload = JSON.stringify(values);
    if (requestIdentity.current.payload !== payload) requestIdentity.current = { payload, id: crypto.randomUUID() };
    const controller = new AbortController(); activeRequest.current = controller;
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const result = await submitEnquiry(siteConfig.enquiryEndpoint, values, { signal: controller.signal, requestId: requestIdentity.current.id });
      setStatus(result);
      if (result.ok) { setValues(initialValues); requestIdentity.current = { payload: '', id: '' }; }
    } finally { clearTimeout(timeout); inFlight.current = false; setSubmitting(false); activeRequest.current = null; }
  }
  const enquiryText = `Name: ${values.name}\nEmail: ${values.email}\nOrganization: ${values.organization || '—'}\nEnquiry: ${values.enquiryType}\n\n${values.message}`;
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(`DADA main site enquiry — ${values.enquiryType}`)}&body=${encodeURIComponent(enquiryText)}`;
  async function copyEnquiry() {
    try { await navigator.clipboard.writeText(enquiryText); setCopied(true); }
    catch { setStatus({ ok: false, message: 'Your browser could not access the clipboard. You can select and copy your message directly from the form.' }); }
  }
  const fieldProps = name => ({ name, id: `enquiry-${name}`, value: values[name], onChange, 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `error-${name}` : undefined, disabled: submitting });
  const error = name => errors[name] && <span id={`error-${name}`} className="field-error">{errors[name]}</span>;
  return <section id="contact" className="section contact-section"><div className="container contact-layout">
    <div className="contact-copy reveal"><p className="eyebrow"><span>[ 08 ]</span> LET'S CONNECT THE DOTS</p><h2>SEND A<br /><span className="outline-title">SIGNAL.</span><span className="contact-arrow" aria-hidden="true">↗</span></h2><p>A rough idea. A tricky problem. Something you'd love to learn. We're listening.</p><ContactDetails /><div className="contact-character"><span className="hello-sticker mono">YOUR NEXT<br />COLLABORATOR<br />IS RIGHT HERE. ↗</span><MascotImage pose="waving" loading="lazy" /></div><div className="contact-topics"><span><Icon name="code" size={16} /> Projects</span><span><Icon name="lightbulb" size={16} /> Ideas</span><span><Icon name="users" size={16} /> Collaborations</span></div></div>
    <form className="enquiry-form reveal" noValidate onSubmit={onSubmit} ref={formRef} aria-busy={submitting}>
      <div className="form-heading mono"><span>NEW TRANSMISSION</span><span>↗ DADA / CONTACT</span></div>
      <div className="enquiry-trap" aria-hidden="true"><label htmlFor="enquiry-website">Leave this field empty</label><input {...fieldProps('website')} tabIndex={-1} autoComplete="off" /></div>
      <div className="form-row"><div className="form-field"><label htmlFor="enquiry-name">Full name <span>*</span></label><input {...fieldProps('name')} placeholder="Your name" autoComplete="name" maxLength={120} required />{error('name')}</div><div className="form-field"><label htmlFor="enquiry-email">Email address <span>*</span></label><input {...fieldProps('email')} placeholder="you@example.com" type="email" autoComplete="email" maxLength={254} required />{error('email')}</div></div>
      <div className="form-row"><div className="form-field"><label htmlFor="enquiry-organization">Organization / Institution <small>Optional</small></label><input {...fieldProps('organization')} placeholder="Where are you from?" autoComplete="organization" maxLength={180} /></div><div className="form-field"><label htmlFor="enquiry-enquiryType">Enquiry type <span>*</span></label><select {...fieldProps('enquiryType')} required><option value="">Select an enquiry type</option>{enquiryTypes.map(type => <option key={type}>{type}</option>)}</select>{error('enquiryType')}</div></div>
      <div className="form-field"><label htmlFor="enquiry-message">Your message <span>*</span></label><textarea {...fieldProps('message')} placeholder="What's on your mind? Tell us a little about your idea…" rows="5" maxLength={5000} required />{error('message')}</div>
      {status && <div className={`form-status ${status.ok ? 'status-success' : ''}`} role={status.ok ? 'status' : 'alert'}><Icon name={status.ok ? 'check' : 'lightbulb'} size={20} /><p>{status.message}</p></div>}
      {status && !status.ok && <div className="enquiry-fallback"><a className="copy-enquiry" href={mailto}>Send from my email app<Icon name="arrow" size={16} /></a><button className="copy-enquiry" type="button" onClick={copyEnquiry}><Icon name={copied ? 'check' : 'copy'} size={16} />{copied ? 'Enquiry copied' : 'Copy my enquiry'}</button></div>}
      <div className="form-bottom"><p>Big idea or a small question.<br /><strong>We're all ears.</strong></p><button className="button" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send Enquiry'}<Icon className={submitting ? 'sending-icon' : ''} name={submitting ? 'workflow' : 'arrow'} size={20} /></button></div>
      <p className="delivery-note">{siteConfig.enquiryEndpoint ? `Your enquiry is emailed to ${contactEmail}. We’ll use your details to respond.` : `Direct sending is not available yet. Email ${contactEmail}, call or WhatsApp us, or prepare your enquiry here.`}</p>
    </form>
  </div></section>;
}
