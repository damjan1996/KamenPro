import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Ime mora imati najmanje 2 karaktera')
    .max(50, 'Ime ne može biti duže od 50 karaktera'),
  email: z
    .string()
    .email('Unesite validnu email adresu'),
  phone: z
    .string()
    .min(6, 'Broj telefona mora imati najmanje 6 cifara')
    .max(20, 'Broj telefona ne može biti duži od 20 karaktera')
    .regex(/^[0-9+\-\s()]*$/, 'Unesite validan broj telefona'),
  message: z
    .string()
    .min(10, 'Poruka mora imati najmanje 10 karaktera')
    .max(1000, 'Poruka ne može biti duža od 1000 karaktera')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;