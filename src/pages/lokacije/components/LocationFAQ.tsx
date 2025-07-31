import { motion } from 'framer-motion';
import { useState } from 'react';

interface LocationFAQProps {
    city: string;
    cityGenitive: string;
}

export function LocationFAQ({ city, cityGenitive }: LocationFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: `Koliko brzo možete dostaviti dekorativni kamen u ${city}?`,
            answer: `Za područje ${city} i okolinu, standardna dostava je unutar 24-48 sati od narudžbe. Za hitne slučajeve, nudimo i ekspresnu dostavu istog dana uz dodatnu naknadu.`
        },
        {
            question: `Da li nudite uslugu montaže kamenih obloga u ${cityGenitive}?`,
            answer: `Da, nudimo kompletnu uslugu profesionalne montaže dekorativnog kamena. Naši stručni timovi imaju preko 10 godina iskustva i garantuju kvalitetnu ugradnju sa 5 godina garancije.`
        },
        {
            question: `Koja je minimalna narudžba za besplatnu dostavu?`,
            answer: `Besplatnu dostavu nudimo za sve narudžbe preko 500 KM na području ${city} i okolnih mjesta. Za manje narudžbe, troškovi dostave se računaju prema udaljenosti.`
        },
        {
            question: `Mogu li vidjeti uzorke prije kupovine?`,
            answer: `Naravno! Posjetite naš showroom u ${cityGenitive} gdje možete vidjeti i dodirnuti sve naše proizvode. Također nudimo mogućnost slanja manjih uzoraka na vašu adresu.`
        },
        {
            question: `Kakva je garancija na vaše proizvode?`,
            answer: `Svi naši proizvodi dolaze sa 5-godišnjom garancijom na kvalitet materijala. Za montažu koju izvode naši timovi, dodatno dajemo 2 godine garancije na izvedene radove.`
        },
        {
            question: `Da li radite sa firmama i izvođačima?`,
            answer: `Da, imamo posebne partnerske uslove za firme, izvođače i arhitekte. Nudimo količinske popuste, prioritetnu isporukou i stručnu podršku za veće projekte.`
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                            Često Postavljana Pitanja - {city}
                        </h2>
                        <p className="text-lg text-stone-600">
                            Odgovori na najčešća pitanja o dekorativnom kamenu
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-stone-50 rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-stone-100 transition-colors duration-200"
                                >
                                    <h3 className="text-lg font-semibold text-stone-900 pr-4">
                                        {faq.question}
                                    </h3>
                                    <svg
                                        className={`w-5 h-5 text-amber-600 transform transition-transform duration-200 ${
                                            openIndex === index ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: openIndex === index ? 'auto' : 0,
                                        opacity: openIndex === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4 text-stone-600">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Schema Markup for FAQ */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": faqs.map(faq => ({
                                    "@type": "Question",
                                    "name": faq.question,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": faq.answer
                                    }
                                }))
                            })
                        }}
                    />
                </div>
            </div>
        </section>
    );
}