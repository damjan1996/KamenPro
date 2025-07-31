import { LocationData } from '../../../lib/locationData';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface LocationContactProps {
    locationData: LocationData;
}

export function LocationContact({ locationData }: LocationContactProps) {
    const { city, cityGenitive, contactInfo } = locationData;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        location: city
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="kontakt" className="py-20 bg-stone-950 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Kontaktirajte KamenPro {city}
                        </h2>
                        <p className="text-lg text-stone-300 max-w-3xl mx-auto">
                            Zatražite besplatnu procjenu vašeg projekta ili nas posjetite u showroom-u
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-bold mb-6">Informacije o Kontaktu</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Telefon</h4>
                                        <p className="text-stone-300">{contactInfo.phone}</p>
                                        <p className="text-sm text-stone-400 mt-1">Dostupni tokom radnog vremena</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Email</h4>
                                        <p className="text-stone-300">{contactInfo.email}</p>
                                        <p className="text-sm text-stone-400 mt-1">Odgovaramo u roku od 24h</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Radno Vrijeme</h4>
                                        <p className="text-stone-300">Pon-Pet: {contactInfo.workingHours.weekdays}</p>
                                        <p className="text-stone-300">Subota: {contactInfo.workingHours.saturday}</p>
                                        <p className="text-stone-300">Nedjelja: {contactInfo.workingHours.sunday}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Lokacija</h4>
                                        <p className="text-stone-300">Showroom u {cityGenitive}</p>
                                        <p className="text-sm text-stone-400 mt-1">Posjetite nas i pogledajte našu ponudu</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-stone-900 rounded-lg">
                                <h4 className="font-semibold mb-3">Zašto odabrati KamenPro {city}?</h4>
                                <ul className="space-y-2 text-stone-300">
                                    <li className="flex items-center">
                                        <span className="text-amber-600 mr-2">✓</span>
                                        Besplatna procjena projekta
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-amber-600 mr-2">✓</span>
                                        Garantovano najbolje cijene
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-amber-600 mr-2">✓</span>
                                        Profesionalna montaža
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-amber-600 mr-2">✓</span>
                                        5 godina garancije
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-bold mb-6">Zatražite Besplatnu Procjenu</h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Ime i Prezime *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-sm focus:border-amber-600 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-sm focus:border-amber-600 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                            Telefon *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-sm focus:border-amber-600 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Poruka *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Opišite svoj projekat..."
                                        className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-sm focus:border-amber-600 focus:outline-none transition-colors resize-none"
                                    />
                                </div>

                                <div className="bg-stone-900 p-4 rounded-sm">
                                    <p className="text-sm text-stone-400">
                                        <strong>Napomena:</strong> Vaša lokacija je automatski postavljena na <strong>{city}</strong>. 
                                        Kontaktirat ćemo vas u najkraćem mogućem roku.
                                    </p>
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-amber-600 text-white py-4 rounded-sm hover:bg-amber-700 transition-colors duration-300 font-medium text-lg"
                                >
                                    Pošaljite Zahtjev
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}