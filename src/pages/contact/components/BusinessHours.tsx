// src/pages/contact/components/BusinessHours.tsx
import { useState, useEffect, useRef } from "react";
import { Clock, Calendar, AlertCircle, CalendarClock, X, Check } from "lucide-react";
import { Container } from "../../../components/ui/Container";

interface BusinessHour {
    days: string;
    hours: string;
    status: "workday" | "shorterday" | "closed";
}

export function BusinessHoursSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentDay, setCurrentDay] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredDay, setHoveredDay] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Inicijalizacija IntersectionObserver-a za animacije
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

        // Funkcija za ažuriranje trenutnog dana i vremena
        const updateDateTime = () => {
            const now = new Date();
            const days = ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"];
            const day = days[now.getDay()];
            setCurrentDay(day);

            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            setCurrentTime(`${hours}:${minutes}`);

            // Provera da li je trenutno otvoreno
            const dayOfWeek = now.getDay(); // 0 je Nedelja, 1 je Ponedeljak, itd.
            const currentHour = now.getHours() + now.getMinutes() / 60;

            // Korišćenje tačnog radnog vremena KamenPro: Pon-Sub 09:00-18:00, Ned zatvoreno
            if (dayOfWeek >= 1 && dayOfWeek <= 6) {
                // Ponedeljak do Subota
                setIsOpen(currentHour >= 9 && currentHour < 18);
            } else {
                // Nedelja
                setIsOpen(false);
            }
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 60000); // Ažuriranje svaki minut

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            clearInterval(interval);
        };
    }, []);

    // Tačno radno vreme KamenPro iz dokumenata
    const businessHours: BusinessHour[] = [
        { days: "Ponedeljak - Subota", hours: "09:00 - 18:00", status: "workday" },
        { days: "Nedelja", hours: "Zatvoreno", status: "closed" },
        { days: "Državni praznici", hours: "Zatvoreno", status: "closed" }
    ];

    const getStatusStyles = (status: string, isHovered: boolean) => {
        const baseClasses = `absolute top-0 right-0 px-2 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-80"
        }`;

        switch (status) {
            case "workday":
                return `${baseClasses} bg-amber-100 text-amber-800`;
            case "shorterday":
                return `${baseClasses} bg-amber-100 text-amber-800`;
            case "closed":
                return `${baseClasses} bg-stone-100 text-stone-800`;
            default:
                return `${baseClasses} bg-stone-100 text-stone-800`;
        }
    };

    const getCardStyles = (status: string, isHovered: boolean) => {
        const baseClasses = "relative border rounded-lg transition-all duration-300";

        if (isHovered) {
            switch (status) {
                case "workday":
                    return `${baseClasses} border-amber-200 bg-amber-50/50 shadow-md transform scale-105`;
                case "shorterday":
                    return `${baseClasses} border-amber-200 bg-amber-50/50 shadow-md transform scale-105`;
                case "closed":
                    return `${baseClasses} border-stone-200 bg-stone-50/50 shadow-md transform scale-105`;
                default:
                    return `${baseClasses} border-stone-200 shadow-md transform scale-105`;
            }
        } else {
            return `${baseClasses} border-stone-100 bg-white hover:shadow-md`;
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 bg-stone-50 font-sans relative overflow-hidden"
        >
            {/* Dekorativni elementi */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-50 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-50 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute top-1/2 left-0 w-40 h-40 bg-amber-50 rounded-full opacity-30 blur-3xl"></div>

            <Container>
                <div
                    className={`transition-all duration-1000 ease-out ${
                        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
                    }`}
                >
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide uppercase">
                            Radno <span className="font-medium">vreme</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-stone-600 font-light">
                            Posetite naš salon u navedeno radno vreme ili zakažite konsultaciju. Stojimo vam na
                            raspolaganju za sve informacije o našim dekorativnim oblogama.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Kartica trenutnog statusa */}
                        <div
                            className={`mb-10 transition-all duration-700 delay-200 ${
                                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
                            }`}
                        >
                            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-stone-100">
                                <div className="md:flex">
                                    <div
                                        className={`md:w-1/3 p-6 flex flex-col justify-center items-center ${
                                            isOpen ? "bg-amber-50" : "bg-stone-50"
                                        }`}
                                    >
                                        <div
                                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                                                isOpen ? "bg-amber-100 text-amber-600" : "bg-stone-100 text-stone-600"
                                            }`}
                                        >
                                            {isOpen ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
                                        </div>
                                        <h3 className="text-xl font-medium text-stone-800 mb-1">
                                            {isOpen ? "Otvoreno" : "Zatvoreno"}
                                        </h3>
                                        <p className="text-sm text-stone-600 text-center font-light">
                                            {isOpen ? "Trenutno radimo" : "Trenutno ne radimo"}
                                        </p>
                                    </div>
                                    <div className="md:w-2/3 p-6">
                                        <div className="flex items-center mb-4">
                                            <CalendarClock className="w-5 h-5 text-amber-600 mr-2" />
                                            <h3 className="text-lg font-medium text-stone-800">Trenutno vreme</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center">
                                                <Calendar className="w-5 h-5 text-stone-500 mr-2" />
                                                <div>
                                                    <span className="text-sm text-stone-500 font-light">Dan</span>
                                                    <p className="font-medium text-stone-800">{currentDay}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-5 h-5 text-stone-500 mr-2" />
                                                <div>
                                                    <span className="text-sm text-stone-500 font-light">Vreme</span>
                                                    <p className="font-medium text-stone-800">{currentTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mreža radnog vremena */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {businessHours.map((schedule, index) => {
                                const isCurrentDayRange =
                                    (schedule.days === "Ponedeljak - Subota" &&
                                        ["Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"].includes(currentDay)) ||
                                    schedule.days === currentDay;

                                const isThisDayHovered = hoveredDay === index;

                                return (
                                    <div
                                        key={index}
                                        className={`transition-all duration-700 ${
                                            isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
                                        }`}
                                        style={{ transitionDelay: `${300 + index * 100}ms` }}
                                        onMouseEnter={() => setHoveredDay(index)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                    >
                                        <div
                                            className={`${getCardStyles(schedule.status, isThisDayHovered)} ${
                                                isCurrentDayRange ? "ring-2 ring-amber-200" : ""
                                            }`}
                                        >
                                            <div className="p-6">
                                                <div className="flex justify-between items-center">
                                                    <h3
                                                        className={`font-medium text-lg ${
                                                            isThisDayHovered ? "text-amber-800" : "text-stone-800"
                                                        } transition-colors duration-300`}
                                                    >
                                                        {schedule.days}
                                                    </h3>
                                                    <div
                                                        className={`text-right transition-all duration-300 ${
                                                            isThisDayHovered ? "transform scale-110" : ""
                                                        }`}
                                                    >
                                                        <span
                                                            className={`font-medium ${
                                                                schedule.status === "closed"
                                                                    ? "text-stone-500"
                                                                    : isThisDayHovered
                                                                        ? "text-amber-600"
                                                                        : "text-stone-800"
                                                            } transition-colors duration-300`}
                                                        >
                                                          {schedule.hours}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {isThisDayHovered && (
                                                <div className={getStatusStyles(schedule.status, isThisDayHovered)}>
                                                    {schedule.status === "workday" && "Puno radno vreme"}
                                                    {schedule.status === "shorterday" && "Skraćeno radno vreme"}
                                                    {schedule.status === "closed" && "Zatvoreno"}
                                                </div>
                                            )}
                                            {isCurrentDayRange && (
                                                <div className="absolute -top-2 -left-2 w-4 h-4 bg-amber-500 rounded-full animate-pulse"></div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Posebna napomena */}
                        <div
                            className={`mt-10 transition-all duration-700 delay-700 ${
                                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
                            }`}
                        >
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 md:p-6 flex items-start">
                                <div className="flex-shrink-0 mr-4">
                                    <AlertCircle className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-amber-800 mb-2">Posebna napomena</h3>
                                    <p className="text-amber-700 text-sm font-light">
                                        Zakazivanje posete van radnog vremena moguće je uz prethodnu najavu.
                                        Kontaktirajte nas telefonom na 065 678 634 (Željko) najmanje 24 sata unapred.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Brza akcija za mobilne uređaje - vidljiva samo na mobilnim uređajima */}
                        <div className="md:hidden mt-8 transition-all duration-700 delay-800">
                            <a
                                href="tel:+38765678634"
                                className="w-full py-3 px-4 bg-amber-500 text-stone-900 rounded-sm flex items-center justify-center hover:bg-amber-400 transition-colors shadow-sm"
                            >
                                <Clock className="w-5 h-5 mr-2" />
                                <span>Kontaktirajte nas</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}