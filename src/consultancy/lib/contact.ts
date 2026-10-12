import { validateContactDetails } from '../../contact-validation.js';

/** Consultancy contact-form schema and validation. */

export interface ContactInput {
  name: string;
  phone: string;
  email: string;
  enquiryType: string;
  budget?: string;
  timeline?: string;
  message: string;
  /** Honeypot — must stay empty. */
  company?: string;
  /** Epoch ms when the form was rendered — used as a time trap. */
  startedAt?: number;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; message: string; code?: string };

export const limits = {
  name: 80,
  phone: 30,
  email: 120,
  enquiryType: 60,
  budget: 60,
  timeline: 60,
  message: 2000,
} as const;

export const sanitize = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';

export const normalizeContact = (raw: Record<string, unknown>): ContactInput => ({
  name: sanitize(raw.name, limits.name),
  phone: typeof raw.phone === 'string' ? raw.phone.trim() : '',
  email: sanitize(raw.email, limits.email),
  enquiryType: sanitize(raw.enquiryType, limits.enquiryType),
  budget: sanitize(raw.budget, limits.budget),
  timeline: sanitize(raw.timeline, limits.timeline),
  message: typeof raw.message === 'string' ? raw.message.trim().slice(0, limits.message) : '',
  company: typeof raw.company === 'string' ? raw.company : '',
  startedAt: typeof raw.startedAt === 'number' ? raw.startedAt : Number(raw.startedAt) || 0,
});

export const validateContact = (input: ContactInput): ContactErrors => {
  const errors: ContactErrors = {};
  if (input.name.length < 2) errors.name = 'Please tell us your name.';
  Object.assign(errors, validateContactDetails(input));
  if (!input.enquiryType) errors.enquiryType = 'Please choose what this is about.';
  if (input.message.length < 20) errors.message = 'Please share a little more detail (20+ characters).';
  if ((input.message.match(/https?:\/\//gi) ?? []).length > 3)
    errors.message = 'Please keep links to a minimum.';
  return errors;
};

export const hasErrors = (errors: ContactErrors): boolean => Object.keys(errors).length > 0;
