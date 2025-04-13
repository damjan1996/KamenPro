import { Container } from '../components/ui/Container';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '../lib/validation';
import { Alert } from '../components/ui/Alert';
import DOMPurify from 'dompurify';

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const sanitizeFormData = (data: ContactFormData): ContactFormData => {
    return {
      name: DOMPurify.sanitize(data.name),
      email: DOMPurify.sanitize(data.email),
      phone: DOMPurify.sanitize(data.phone),
      message: DOMPurify.sanitize(data.message)
    };
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    try {
      const sanitizedData = sanitizeFormData(data);

      // Hier würde normalerweise der API-Aufruf stattfinden
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Form data:', sanitizedData);
      setSubmitStatus('success');
      reset();

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch {
      // Catch ohne Parameter - keine unbenutzte Variable
      setSubmitStatus('error');
      setErrorMessage('Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovo.');
    }
  };

  return (
      <>
        <Container>
          <div className="py-12 md:py-16 lg:py-20">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-light mb-6 text-stone-900">
                Kontaktirajte nas
              </h1>
              <p className="text-stone-600 mb-10">
                Imate pitanje ili želite da zakažete konsultaciju? Pošaljite nam poruku i odgovorićemo u najkraćem roku.
              </p>

              <div className="grid md:grid-cols-2 gap-12 md:gap-10 lg:gap-16">
                {/* Contact Form */}
                <div>
                  <h2 className="text-xl font-medium mb-6 text-stone-800">Pošaljite poruku</h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {submitStatus === 'success' && (
                        <Alert
                            variant="success"
                            title="Poruka poslata"
                            description="Vaša poruka je uspešno poslata. Odgovorićemo vam uskoro."
                        />
                    )}

                    {submitStatus === 'error' && (
                        <Alert
                            variant="error"
                            title="Greška"
                            description={errorMessage}
                        />
                    )}

                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-stone-700">
                        Ime i prezime <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="text"
                          id="name"
                          className={`w-full px-4 py-2 border rounded-sm focus:ring-amber-500 focus:border-amber-500 ${errors.name ? 'border-red-500' : 'border-stone-300'}`}
                          {...register('name')}
                      />
                      {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-stone-700">
                        Email adresa <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="email"
                          id="email"
                          className={`w-full px-4 py-2 border rounded-sm focus:ring-amber-500 focus:border-amber-500 ${errors.email ? 'border-red-500' : 'border-stone-300'}`}
                          {...register('email')}
                      />
                      {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-stone-700">
                        Telefon
                      </label>
                      <input
                          type="tel"
                          id="phone"
                          className={`w-full px-4 py-2 border rounded-sm focus:ring-amber-500 focus:border-amber-500 ${errors.phone ? 'border-red-500' : 'border-stone-300'}`}
                          {...register('phone')}
                      />
                      {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block mb-2 text-sm font-medium text-stone-700">
                        Poruka <span className="text-red-500">*</span>
                      </label>
                      <textarea
                          id="message"
                          rows={5}
                          className={`w-full px-4 py-2 border rounded-sm focus:ring-amber-500 focus:border-amber-500 ${errors.message ? 'border-red-500' : 'border-stone-300'}`}
                          {...register('message')}
                      ></textarea>
                      {errors.message && (
                          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                      )}
                    </div>

                    <button
                        type="submit"
                        disabled={submitStatus === 'loading'}
                        className="w-full bg-amber-500 text-stone-900 px-6 py-3 rounded-sm hover:bg-amber-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitStatus === 'loading' ? 'Slanje...' : 'Pošaljite poruku'}
                    </button>
                  </form>
                </div>

                {/* Contact Info */}
                <div>
                  <h2 className="text-xl font-medium mb-6 text-stone-800">Kontakt informacije</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <MapPin className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-base font-medium text-stone-800">Adresa</h3>
                        <p className="mt-1 text-stone-600">
                          Ulica Petra Kočića 14<br />
                          78000 Banja Luka<br />
                          Bosna i Hercegovina
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Mail className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-base font-medium text-stone-800">Email</h3>
                        <p className="mt-1 text-stone-600">
                          <a href="mailto:info@kamenpro.ba" className="hover:text-amber-500">
                            info@kamenpro.ba
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Phone className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-base font-medium text-stone-800">Telefon</h3>
                        <p className="mt-1 text-stone-600">
                          <a href="tel:+38765123456" className="hover:text-amber-500">
                            +387 65 123 456
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-base font-medium text-stone-800 mb-3">Radno vreme</h3>
                    <div className="bg-stone-100 p-4 rounded-md text-stone-600">
                      <p>Ponedeljak - Petak: 8:00 - 16:00</p>
                      <p>Subota: 9:00 - 13:00</p>
                      <p>Nedelja: Zatvoreno</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
  );
}