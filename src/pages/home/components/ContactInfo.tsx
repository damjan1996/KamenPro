// src/components/home/components/ContactInfoSection.tsx
import { useState, useEffect, useRef } from "react";
import { Phone, Mail, MapPin, ExternalLink, ArrowRight, AlertCircle, Check } from "lucide-react";
import { Container } from "../../../components/ui/Container";

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface FormErrors {
    [key: string]: string;
}

interface ContactItem {
    id: number;
    title: string;
    content: string[];
    icon: JSX.Element;
    action: string;
    actionText: string;
}

const contactInfo: ContactItem[] = [
    {
        id: 1,
        title: 'Pozovite nas',
        content: ['+387 65 678 634'],
        icon: <Phone className="h-6 w-6" />,
        action: 'tel:+38765678634',
        actionText: 'Pozovite odmah'
    },
    {
        id: 2,
        title: 'Email',
        content: ['info@kamenpro.net'],
        icon: <Mail className="h-6 w-6" />,
        action: 'mailto:info@kamenpro.net',
        actionText: 'Pošaljite email'
    },
    {
        id: 3,
        title: 'Lokacija',
        content: ['Bijeljina', 'Republika Srpska, BiH'],
        icon: <MapPin className="h-6 w-6" />,
        action: 'https://www.google.com/maps/place/Patkova%C4%8Da,+Bosnien+und+Herzegowina/@44.7310864,19.2181241,15z/data=!3m1!4b1!4m6!3m5!1s0x475be870bd8d2f95:0x37bb3398d4447f3d!8m2!3d44.7305556!4d19.2281741!16s%2Fm%2F0cc7vf_?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D',
        actionText: 'Pogledajte na mapi'
    }
];

export function ContactInfoSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    // Form states
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

    useEffect(() => {
        const currentRef = sectionRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // Form handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                setIsLoading(true);
                setApiError(null);

                const requestData = {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || "Nije unet",
                    message: formData.message,
                    productName: formData.subject || "Kontakt upit",
                    productCode: "KONTAKT",
                    productId: "kontakt-forma",
                    quantity: "1"
                };

                const response = await fetch('/api/send-inquiry', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                if (!response.ok) {
                    throw new Error('Došlo je do greške pri slanju poruke.');
                }

                setIsSubmitted(true);
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

            } catch (err) {
                setApiError(err instanceof Error ? err.message : 'Došlo je do nepoznate greške');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 bg-white font-sans overflow-hidden"
        >
            <Container>
                {/* Section Heading */}
                <div
                    className={`mb-12 text-center transition-all duration-700 transform ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide uppercase">
                        Kontaktirajte <span className="font-medium">nas</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-xl mx-auto font-light">
                        Dostupni smo za sva vaša pitanja i konsultacije. Javite nam se i pomozite vam da transformišete vaš prostor.
                    </p>
                </div>

                {/* Contact Form */}
                <div className={`max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                                            Ime i prezime
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm ${errors.name ? 'border-red-300' : 'border-stone-200'} focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all`}
                                            placeholder="Vaše ime i prezime"
                                            disabled={isLoading}
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                                            Email adresa
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm ${errors.email ? 'border-red-300' : 'border-stone-200'} focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all`}
                                            placeholder="vasa.adresa@email.com"
                                            disabled={isLoading}
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-stone-200 rounded-sm focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                                        placeholder="Vaš broj telefona"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">
                                        Tema
                                    </label>
                                    <select
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-stone-200 rounded-sm focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
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

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                                        Poruka
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-sm ${errors.message ? 'border-red-300' : 'border-stone-200'} focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all`}
                                        placeholder="Vaša poruka..."
                                        disabled={isLoading}
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>

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
                </div>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {contactInfo.map((item, index) => (
                        <div
                            key={item.id}
                            className={`text-center p-8 bg-white border border-stone-200 rounded-lg shadow-sm transition-all duration-500 ${
                                hoveredCard === item.id
                                    ? "border-amber-500 shadow-md transform -translate-y-1"
                                    : "hover:border-amber-300 hover:shadow-md hover:-translate-y-1"
                            } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                            style={{ transitionDelay: `${200 + index * 100}ms` }}
                            onMouseEnter={() => setHoveredCard(item.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                                hoveredCard === item.id
                                    ? "bg-amber-500 text-white"
                                    : "bg-amber-100 text-amber-700"
                            }`}>
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-medium mb-4 text-stone-800">{item.title}</h3>

                            <div className="min-h-16 mb-6">
                                {item.content.map((line, i) => (
                                    <p key={i} className="text-stone-600 font-light">{line}</p>
                                ))}
                            </div>

                            <a
                                href={item.action}
                                className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors group"
                                target={item.id === 3 ? "_blank" : undefined}
                                rel={item.id === 3 ? "noopener noreferrer" : undefined}
                            >
                                <span className="mr-2 font-light">{item.actionText}</span>
                                {item.id === 3 ? (
                                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                ) : (
                                    <span className="h-4 w-4 font-medium group-hover:translate-x-1 transition-transform">→</span>
                                )}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Business Hours */}
                <div
                    className={`mt-16 p-6 md:p-8 bg-stone-50 rounded-lg border border-stone-200 text-center transition-all duration-700 delay-700 transform ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    <h3 className="text-xl font-medium mb-4 text-stone-800">Radno vreme</h3>
                    <div className="flex justify-center space-x-8 md:space-x-16">
                        <div>
                            <p className="text-stone-600 font-light">Ponedeljak - Subota</p>
                            <p className="text-stone-800 font-medium">09:00 - 18:00</p>
                        </div>
                        <div>
                            <p className="text-stone-600 font-light">Nedelja</p>
                            <p className="text-stone-800 font-medium">Zatvoreno</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}