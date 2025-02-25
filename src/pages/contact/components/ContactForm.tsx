// src/pages/contact/components/ContactForm.tsx
import { useState, useEffect } from 'react';
import { Send, Check } from 'lucide-react';

export const ContactFormSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [focused, setFocused] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleFocus = (field) => {
        setFocused(field);
    };

    const handleBlur = () => {
        setFocused('');
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formState.name.trim()) newErrors.name = 'Ime je obavezno';
        if (!formState.email.trim()) {
            newErrors.email = 'Email je obavezan';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            newErrors.email = 'Email format nije validan';
        }
        if (!formState.message.trim()) newErrors.message = 'Poruka je obavezna';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Ovde bi išao kod za stvarno slanje forme
            console.log('Form submitted:', formState);

            // Simulacija uspešnog slanja
            setSubmitted(true);
            setTimeout(() => {
                setFormState({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                setSubmitted(false);
            }, 3000);
        }
    };

    const inputClasses = (field) => {
        return `w-full px-4 py-3 border ${errors[field]
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
            : focused === field
                ? 'border-blue-400 ring-2 ring-blue-100'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'} 
            rounded-lg transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white`;
    };

    return (
        <section id="contact-form" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-50 opacity-70 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gray-50 opacity-50 translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`max-w-3xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="text-center mb-12">
                        <span className="inline-block text-blue-600 text-sm font-medium tracking-wider uppercase mb-2">Pišite nam</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Pošaljite Nam Poruku</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 max-w-lg mx-auto">
                            Ispunite formular ispod i naš tim će vam odgovoriti u najkraćem mogućem roku. Radujemo se vašoj poruci.
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-500 hover:shadow-2xl">
                        {submitted ? (
                            <div className="py-12 text-center">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                    <Check className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hvala na poruci!</h3>
                                <p className="text-gray-600">Vaša poruka je uspešno poslata. Uskoro ćemo vas kontaktirati.</p>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className={`transition-all duration-500 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ime i prezime</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('name')}
                                            onBlur={handleBlur}
                                            className={inputClasses('name')}
                                            placeholder="Vaše ime i prezime"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>
                                    <div className={`transition-all duration-500 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email adresa</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('email')}
                                            onBlur={handleBlur}
                                            className={inputClasses('email')}
                                            placeholder="vasa.adresa@email.com"
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className={`transition-all duration-500 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formState.phone}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('phone')}
                                        onBlur={handleBlur}
                                        className={inputClasses('phone')}
                                        placeholder="Vaš broj telefona"
                                    />
                                </div>

                                <div className={`transition-all duration-500 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
                                    <select
                                        id="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('subject')}
                                        onBlur={handleBlur}
                                        className={inputClasses('subject')}
                                    >
                                        <option value="">Izaberite temu</option>
                                        <option value="general">Opšte informacije</option>
                                        <option value="quote">Zatražite ponudu</option>
                                        <option value="project">Razgovor o projektu</option>
                                        <option value="other">Drugo</option>
                                    </select>
                                </div>

                                <div className={`transition-all duration-500 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Poruka</label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        value={formState.message}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('message')}
                                        onBlur={handleBlur}
                                        className={inputClasses('message')}
                                        placeholder="Vaša poruka..."
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>

                                <div className={`text-center transition-all duration-500 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    <button
                                        type="submit"
                                        className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Pošaljite Poruku
                                            <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className={`mt-8 text-center text-gray-500 text-sm transition-all duration-500 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <p>Vaši podaci su sigurni i neće biti deljeni sa trećim licima.</p>
                    </div>
                </div>
            </div>

            {/* Responsive animations */}
            <style jsx>{`
                @media (max-width: 640px) {
                    form {
                        gap: 1rem;
                    }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }
            `}</style>
        </section>
    );
};