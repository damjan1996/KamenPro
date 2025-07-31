import { LocationData } from '../../../lib/locationData';
import { motion } from 'framer-motion';

interface LocalTestimonialsProps {
    locationData: LocationData;
}

export function LocalTestimonials({ locationData }: LocalTestimonialsProps) {
    const { city, content } = locationData;
    const testimonials = content.testimonials || [];

    if (testimonials.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                            Šta Kažu Naši Klijenti iz {city}
                        </h2>
                        <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                            Zadovoljstvo naših klijenata je naš najveći uspjeh
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-stone-50 p-8 rounded-lg relative"
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-4 right-4 text-6xl text-amber-200 opacity-50">
                                    "
                                </div>
                                
                                {/* Rating Stars */}
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-500' : 'text-stone-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-stone-700 mb-6 relative z-10 italic">
                                    "{testimonial.text}"
                                </p>

                                <div>
                                    <p className="font-semibold text-stone-900">
                                        {testimonial.name}
                                    </p>
                                    {testimonial.project && (
                                        <p className="text-sm text-stone-600">
                                            {testimonial.project}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                    >
                        <div>
                            <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
                            <p className="text-stone-600">Zadovoljnih Klijenata</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-amber-600 mb-2">10+</div>
                            <p className="text-stone-600">Godina Iskustva</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
                            <p className="text-stone-600">Vrsta Kamena</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-amber-600 mb-2">4.9/5</div>
                            <p className="text-stone-600">Prosječna Ocjena</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}