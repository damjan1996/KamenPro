// src/pages/contact/components/ContactForm.tsx
import React, { useState } from 'react';
import { Container } from '../../../components/ui/Container';
import { Check, ArrowRight, AlertCircle } from 'lucide-react';

// Einfachere Typdefinitionen
type FormData = {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

type FormErrors = {
    [key: string]: string;
}

// Beide API-Endpunkte definieren
const CONTACT_API_URL = '/api/contact';
const INQUIRY_API_URL = '/api/send-inquiry';

export const ContactFormSection: React.FC = () => {
    // State mit expliziten Typdefinitionen
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [debugInfo, setDebugInfo] = useState<string | null>(null);
    const [currentEndpoint, setCurrentEndpoint] = useState<string>(CONTACT_API_URL);
    const [attemptCount, setAttemptCount] = useState<number>(0);

    // Event-Handler mit einfacheren Typen
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Formularvalidierung
    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Ime je obavezno';
        if (!formData.email.trim()) {
            newErrors.email = 'Email je obavezan';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email format nije validan';
        }
        if (!formData.message.trim()) newErrors.message = 'Poruka je obavezna';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Formular absenden mit expliziten Promise-Handling
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDebugInfo(null);

        if (validateForm()) {
            try {
                setIsLoading(true);
                setApiError(null);
                setAttemptCount(prev => prev + 1);

                // Wenn beim ersten Versuch der erste Endpunkt verwendet wurde und ein Fehler auftrat,
                // beim zweiten Versuch den anderen Endpunkt verwenden
                if (attemptCount > 0 && currentEndpoint === CONTACT_API_URL) {
                    setCurrentEndpoint(INQUIRY_API_URL);
                }

                // Debug-Info
                setDebugInfo(`Sending to: ${currentEndpoint}`);

                // Anfrage-Daten vorbereiten je nach Endpunkt
                let requestData;
                if (currentEndpoint === CONTACT_API_URL) {
                    // Daten für /api/contact
                    requestData = {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone || "Nije unet",
                        message: formData.message,
                        subject: formData.subject || 'Opšti upit'
                    };
                } else {
                    // Daten für /api/send-inquiry
                    requestData = {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone || "Nije unet",
                        message: formData.message,
                        productName: formData.subject ? `Kontakt forma - ${formData.subject}` : 'Kontakt forma',
                        productCode: 'CONTACT',
                        quantity: 1
                    };
                }

                // API-Anfrage senden
                const response = await fetch(currentEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                // Wir kopieren die Response, da wir sie potenziell zweimal lesen müssen
                const clonedResponse = response.clone();
                setDebugInfo(prev => `${prev}\nResponse status: ${response.status}`);

                try {
                    // Versuche JSON-Antwort zu parsen
                    const responseData = await response.json();
                    setDebugInfo(prev => `${prev}\nResponse data: ${JSON.stringify(responseData).substring(0, 100)}...`);

                    if (!response.ok) {
                        let errorMessage = 'Došlo je do greške pri slanju poruke.';
                        if (responseData && responseData.error) {
                            errorMessage = responseData.error;
                        }
                        if (responseData && responseData.details) {
                            setDebugInfo(prev => `${prev}\nError details: ${responseData.details}`);
                        }
                        throw new Error(errorMessage);
                    }

                    // Erfolgreiche Übermittlung
                    setIsSubmitted(true);
                    setAttemptCount(0); // Reset für nächstes Mal

                    // Formular zurücksetzen
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: ''
                    });

                    // Nach 6 Sekunden die Erfolgsmeldung zurücksetzen
                    setTimeout(() => {
                        setIsSubmitted(false);
                    }, 6000);

                } catch (jsonError) {
                    // Falls JSON-Parsing fehlschlägt, versuche Text-Antwort
                    console.error('Error parsing JSON response:', jsonError);
                    setDebugInfo(prev => `${prev}\nJSON parsing error: ${jsonError}`);

                    const text = await clonedResponse.text();
                    setDebugInfo(prev => `${prev}\nText response: ${text.substring(0, 100)}...`);

                    if (!response.ok) {
                        throw new Error(`Server error: ${text || response.statusText}`);
                    } else {
                        // Wenn Status OK ist, trotz JSON-Fehler, betrachten wir es als Erfolg
                        setIsSubmitted(true);
                        setAttemptCount(0); // Reset für nächstes Mal

                        setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            subject: '',
                            message: ''
                        });
                        setTimeout(() => {
                            setIsSubmitted(false);
                        }, 6000);
                    }
                }

            } catch (err) {
                // Wenn nach einem Fehler noch nicht der alternative Endpunkt versucht wurde
                if (attemptCount === 1 && currentEndpoint === CONTACT_API_URL) {
                    // Alternative API-Route (send-inquiry) im nächsten Versuch verwenden
                    setCurrentEndpoint(INQUIRY_API_URL);
                    setDebugInfo(prev => `${prev}\nRetrying with alternative endpoint: ${INQUIRY_API_URL}`);

                    // Automatisch zweiten Versuch starten
                    setIsLoading(false);
                    handleSubmit(e);
                    return;
                }

                // Vereinfachte Fehlerbehandlung wenn beide Endpunkte fehlgeschlagen sind
                console.error('Form submission error:', err);
                setDebugInfo(prev => `${prev}\nError: ${err instanceof Error ? err.message : 'Unknown error'}`);
                setApiError(err instanceof Error ? err.message : 'Došlo je do nepoznate greške');

                // Für den nächsten Versuch zurück zum ersten Endpunkt
                setCurrentEndpoint(CONTACT_API_URL);
                setAttemptCount(0);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Erfolgskomponente ohne separate Definition
    return (
        <section id="kontakt-forma" className="py-16 md:py-24 bg-white font-sans">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 uppercase tracking-wide">
                            Pošaljite nam <span className="font-medium">poruku</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-stone-600 max-w-lg mx-auto font-light">
                            Ispunite formular ispod i naš tim će vam odgovoriti u najkraćem mogućem roku.
                            Stojimo vam na raspolaganju za sve informacije o našim proizvodima.
                        </p>
                    </div>

                    <div className="bg-stone-50 rounded-lg shadow-md p-6 md:p-8">
                        {isSubmitted ? (
                            <div className="py-12 text-center">
                                <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                                    <Check className="w-8 h-8 text-amber-600" />
                                </div>
                                <h3 className="text-2xl font-medium text-stone-800 mb-2">Hvala na poruci!</h3>
                                <p className="text-stone-600 font-light">Vaša poruka je uspešno poslata. Uskoro ćemo vas kontaktirati.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {apiError && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start mb-6">
                                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-red-700 mb-1">Greška</h4>
                                            <p className="text-red-600 text-sm">{apiError}</p>
                                            {debugInfo && (
                                                <details className="mt-2">
                                                    <summary className="text-xs text-red-400 cursor-pointer">Tehnički detalji</summary>
                                                    <pre className="mt-1 text-xs bg-red-50 p-2 overflow-auto max-h-40 whitespace-pre-wrap">
                                                        {debugInfo}
                                                    </pre>
                                                </details>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                                            Ime i prezime
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm ${errors.name ? 'border-red-300' : 'border-stone-200'}`}
                                            placeholder="Vaše ime i prezime"
                                            disabled={isLoading}
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                                            Email adresa
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm ${errors.email ? 'border-red-300' : 'border-stone-200'}`}
                                            placeholder="vasa.adresa@email.com"
                                            disabled={isLoading}
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-stone-200 rounded-sm"
                                        placeholder="Vaš broj telefona"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">
                                        Tema
                                    </label>
                                    <select
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-stone-200 rounded-sm"
                                        disabled={isLoading}
                                    >
                                        <option value="">Izaberite temu</option>
                                        <option value="info">Informacije o proizvodima</option>
                                        <option value="quote">Zatražite ponudu</option>
                                        <option value="project">Konsultacije za projekat</option>
                                        <option value="installation">Ugradnja dekorativnih obloga</option>
                                        <option value="other">Drugo</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                                        Poruka
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-sm ${errors.message ? 'border-red-300' : 'border-stone-200'}`}
                                        placeholder="Vaša poruka..."
                                        disabled={isLoading}
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className={`group inline-flex items-center bg-amber-500 text-stone-900 px-6 py-3 rounded-sm hover:bg-amber-400 transition-all duration-300 text-sm uppercase tracking-wider font-light shadow-md hover:shadow-lg ${
                                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                        disabled={isLoading}
                                    >
                                        <span>{isLoading ? 'Slanje poruke...' : 'Pošaljite poruku'}</span>
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="mt-8 text-center text-stone-500 text-sm font-light">
                        <p>Vaši podaci su sigurni i neće biti deljeni sa trećim licima.</p>
                    </div>

                    {/* Contact Options */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a href="tel:+38765678634" className="p-4 bg-stone-50 rounded-lg border border-stone-200 hover:border-amber-200 hover:shadow-sm transition-all duration-300 text-center group">
                            <h3 className="font-medium text-stone-800 mb-1 transition-colors duration-300 group-hover:text-amber-600">Pozovite nas</h3>
                            <p className="text-stone-600 font-light text-sm">+387 65 678 634</p>
                        </a>

                        <a href="mailto:info@kamenpro.net" className="p-4 bg-stone-50 rounded-lg border border-stone-200 hover:border-amber-200 hover:shadow-sm transition-all duration-300 text-center group">
                            <h3 className="font-medium text-stone-800 mb-1 transition-colors duration-300 group-hover:text-amber-600">Pošaljite email</h3>
                            <p className="text-stone-600 font-light text-sm">info@kamenpro.net</p>
                        </a>

                        <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-center">
                            <h3 className="font-medium text-stone-800 mb-1">Radno vreme</h3>
                            <p className="text-stone-600 font-light text-sm">Pon - Sub: 09:00 - 18:00</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ContactFormSection;