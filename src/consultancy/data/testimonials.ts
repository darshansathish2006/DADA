/**
 * Client testimonials — real quotes only, with the person's name and business.
 * While this list is empty the Testimonials section is hidden entirely.
 */

export interface Testimonial {
  quote: string;
  name: string;
  business: string;
}

export const testimonials: Testimonial[] = [];
