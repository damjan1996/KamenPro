// src/pages/contact/components/ContactForm.tsx
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Container } from '../../../components/ui/Container';
import { Check, ArrowRight } from 'lucide-react';

interface FormState {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface FormErrors {
    [key: string]: string;
}

export const ContactFormSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formState, setFormState] = useState<FormState>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [focused, setFocused] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleFocus = (field: string) => {
        setFocused(field);
    };

    const handleBlur = () => {
        setFocused('');
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

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

    const handleSubmit = (e: FormEvent) => {
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

    const inputClasses = (field: string) => {
        return `w-full px-4 py-3 border ${errors[field]
            ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-200'
            : focused === field
                ? 'border-amber-400 ring-1 ring-amber-200'
                : 'border-stone-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-200'} 
            rounded-sm transition-all duration-300 bg-white hover:bg-white/95 font-light text-stone-800`;
    };

    // Pomoćna funkcija za dobijanje klasa animacije
    const getAnimationClasses = (delay: string = '') => `
        transition-all duration-700 ${delay} ease-out transform 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
    `.trim();

    // Komponente za formularska polja
    const FormField = ({
                           id,
                           label,
                           type = 'text',
                           placeholder,
                           value,
                           delay,
                           isTextarea = false,
                           rows = 5,
                           options = []
                       }: {
        id: keyof FormState;
        label: string;
        type?: string;
        placeholder?: string;
        value: string;
        delay: string;
        isTextarea?: boolean;
        rows?: number;
        options?: Array<{value: string; label: string}>;
    }) => (
        <div className={getAnimationClasses(delay)}>
            <label htmlFor={id} className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
            {isTextarea ? (
                <textarea
                    id={id}
                    rows={rows}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => handleFocus(id)}
                    onBlur={handleBlur}
                    className={inputClasses(id)}
                    placeholder={placeholder}
                ></textarea>
            ) : type === 'select' ? (
                <select
                    id={id}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => handleFocus(id)}
                    onBlur={handleBlur}
                    className={inputClasses(id)}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => handleFocus(id)}
                    onBlur={handleBlur}
                    className={inputClasses(id)}
                    placeholder={placeholder}
                />
            )}
            {errors[id] && <p className="mt-1 text-sm text-red-600">{errors[id]}</p>}
        </div>
    );

    // Komponenta za prikaz uspeha nakon slanja forme
    const SuccessMessage = () => (
        <div className="py-12 text-center">
            <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-medium text-stone-800 mb-2">Hvala na poruci!</h3>
            <p className="text-stone-600 font-light">Vaša poruka je uspešno poslata. Uskoro ćemo vas kontaktirati.</p>
        </div>
    );

    // Komponenta za brzu kontakt opciju
    const ContactOption = ({
                               href,
                               title,
                               content,
                               isClickable = true
                           }: {
        href?: string;
        title: string;
        content: string;
        isClickable?: boolean
    }) => {
        const baseClasses = "p-4 bg-stone-50 rounded-lg border border-stone-200 hover:border-amber-200 hover:shadow-sm transition-all duration-300 text-center";

        const content_el = (
            <>
                <h3 className="font-medium text-stone-800 mb-1 transition-colors duration-300 group-hover:text-amber-600">{title}</h3>
                <p className="text-stone-600 font-light text-sm">{content}</p>
            </>
        );

        return isClickable && href ? (
            <a href={href} className={`${baseClasses} group`}>
                {content_el}
            </a>
        ) : (
            <div className={baseClasses}>
                {content_el}
            </div>
        );
    };

    return (
        <section
            ref={sectionRef}
            id="kontakt-forma"
            className="py-16 md:py-24 bg-white overflow-hidden font-sans"
        >
            <Container>
                <div className="max-w-3xl mx-auto">
                    <div className={`text-center mb-12 ${getAnimationClasses()}`}>
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 uppercase tracking-wide">
                            Pošaljite nam <span className="font-medium">poruku</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-stone-600 max-w-lg mx-auto font-light">
                            Ispunite formular ispod i naš tim će vam odgovoriti u najkraćem mogućem roku.
                            Stojimo vam na raspolaganju za sve informacije o našim proizvodima.
                        </p>
                    </div>

                    <div className={`bg-stone-50 rounded-lg shadow-md p-6 md:p-8 ${getAnimationClasses('delay-200')}`}>
                        {submitted ? (
                            <SuccessMessage />
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        id="name"
                                        label="Ime i prezime"
                                        placeholder="Vaše ime i prezime"
                                        value={formState.name}
                                        delay="delay-300"
                                    />
                                    <FormField
                                        id="email"
                                        label="Email adresa"
                                        type="email"
                                        placeholder="vasa.adresa@email.com"
                                        value={formState.email}
                                        delay="delay-400"
                                    />
                                </div>

                                <FormField
                                    id="phone"
                                    label="Telefon"
                                    type="tel"
                                    placeholder="Vaš broj telefona"
                                    value={formState.phone}
                                    delay="delay-500"
                                />

                                <FormField
                                    id="subject"
                                    label="Tema"
                                    type="select"
                                    value={formState.subject}
                                    delay="delay-600"
                                    options={[
                                        { value: "", label: "Izaberite temu" },
                                        { value: "info", label: "Informacije o proizvodima" },
                                        { value: "quote", label: "Zatražite ponudu" },
                                        { value: "project", label: "Konsultacije za projekat" },
                                        { value: "installation", label: "Ugradnja dekorativnih obloga" },
                                        { value: "other", label: "Drugo" }
                                    ]}
                                />

                                <FormField
                                    id="message"
                                    label="Poruka"
                                    placeholder="Vaša poruka..."
                                    value={formState.message}
                                    delay="delay-700"
                                    isTextarea={true}
                                />

                                <div className={`text-center ${getAnimationClasses('delay-800')}`}>
                                    <button
                                        type="submit"
                                        className="group inline-flex items-center bg-amber-500 text-stone-900 px-6 py-3 rounded-sm hover:bg-amber-400 transition-all duration-300 text-sm uppercase tracking-wider font-light shadow-md hover:shadow-lg"
                                    >
                                        <span>Pošaljite poruku</span>
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className={`mt-8 text-center text-stone-500 text-sm font-light ${getAnimationClasses('delay-900')}`}>
                        <p>Vaši podaci su sigurni i neće biti deljeni sa trećim licima.</p>
                    </div>

                    {/* Dodatne informacije i brze kontakt opcije */}
                    <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 ${getAnimationClasses('delay-1000')}`}>
                        <ContactOption
                            href="tel:+38765678634"
                            title="Pozovite nas"
                            content="065 678 634"
                        />
                        <ContactOption
                            href="mailto:info@kamenpro.rs"
                            title="Pošaljite email"
                            content="info@kamenpro.rs"
                        />
                        <ContactOption
                            title="Radno vreme"
                            content="Pon - Sub: 09:00 - 18:00"
                            isClickable={false}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};