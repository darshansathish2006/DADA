import { Mail, MessageCircle, Phone } from 'lucide-react';
import { contactEmail, teamNumbers, whatsappHref } from '../contact-details';

export default function ContactDetails() {
  return <address className="direct-contact" aria-label="Team DADA contact details">
    <p className="direct-contact-label">Email</p>
    <a className="direct-contact-email" href={`mailto:${contactEmail}`}><Mail size={18} aria-hidden="true" />{contactEmail}</a>
    <p className="direct-contact-label">Call / WhatsApp</p>
    <ul>{teamNumbers.map(phone => <li key={phone.number}>
      <span className="direct-contact-number">{phone.display}</span>
      <div className="direct-contact-actions">
        <a href={`tel:${phone.number}`} aria-label={`Call ${phone.display}`}><Phone size={16} aria-hidden="true" />Call</a>
        <a href={whatsappHref(phone.number)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${phone.display} (opens in a new tab)`}><MessageCircle size={16} aria-hidden="true" />WhatsApp</a>
      </div>
    </li>)}</ul>
  </address>;
}
