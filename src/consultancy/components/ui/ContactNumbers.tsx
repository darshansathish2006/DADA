import { MessageCircle, Phone } from 'lucide-react';
import { phoneLinks, whatsappLinks } from '@/data/site-config';

export default function ContactNumbers({ compact = false }: { compact?: boolean }) {
  return <div>
    <p className="eyebrow mb-2">Call / WhatsApp</p>
    <ul className="grid gap-4">
      {phoneLinks.map(phone => {
        const chat = whatsappLinks.find(link => link.number === phone.number);
        return <li key={phone.number}>
          <p className={compact ? 'font-semibold' : 'font-heading text-h3 font-bold'}>{phone.display}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-small">
            <a href={phone.href} aria-label={`Call ${phone.display}`} className="inline-flex min-h-11 items-center gap-2 hover:underline">
              <Phone size={16} aria-hidden="true" />Call
            </a>
            {chat && <a href={chat.href} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${phone.display} (opens in a new tab)`} className="inline-flex min-h-11 items-center gap-2 hover:underline">
              <MessageCircle size={16} aria-hidden="true" />WhatsApp
            </a>}
          </div>
        </li>;
      })}
    </ul>
  </div>;
}
