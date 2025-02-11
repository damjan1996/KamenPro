import { Container } from '../components/ui/Container';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Seo } from '../components/Seo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '../lib/validation';
import { Alert } from '../components/ui/Alert';
import { useState } from 'react';

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

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    try {
      // Hier würde normalerweise der API-Aufruf stattfinden
      // Simuliere API-Aufruf mit Timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simuliere erfolgreichen API-Aufruf
      console.log('Form data:', data);
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovo.');
    }
  };

  return (
    <div className="pt-24">
      <Seo 
        title="Kontakt"
        description="Kontaktirajte KamenPro za besplatnu konsultaciju o kamenim oblogama. Posetite našu lokaciju u Beogradu ili nas pozovite za više informacija."
        canonical="/contact"
        keywords="kontakt kamenpro, konsultacije, lokacija, kontakt forma, besplatna procena"
      />
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontaktirajte nas</h1>
            <p className="text-xl text-gray-600">
              Želite saznati više o našim proizvodima? Kontaktirajte nas za besplatnu konsultaciju.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Pošaljite nam poruku</h2>
              
              {submitStatus === 'success' && (
                <Alert type="success">
                  Vaša poruka je uspešno poslata! Kontaktiraćemo vas uskoro.
                </Alert>
              )}
              
              {submitStatus === 'error' && (
                <Alert type="error">
                  {errorMessage}
                </Alert>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ime i prezime
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-stone-500 focus:border-stone-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email adresa
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-stone-500 focus:border-stone-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-stone-500 focus:border-stone-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Poruka
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message')}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-stone-500 focus:border-stone-500 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className={`w-full bg-stone-900 text-white px-6 py-3 rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                      Slanje...
                    </>
                  ) : (
                    'Pošaljite poruku'
                  )}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Kontakt informacije</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-stone-900 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adresa</h3>
                    <p className="text-gray-600">Ulica Primer 123<br />11000 Beograd</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-stone-900 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-gray-600">+381 (0) 11 123 456</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-stone-900 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">info@kamenpro.rs</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Radno vreme</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Ponedeljak - Petak: 08:00 - 17:00</p>
                  <p>Subota: 09:00 - 13:00</p>
                  <p>Nedelja: Zatvoreno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}