// src/pages/contact/components/BusinessHours.tsx
import { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle, CalendarClock, X, Check } from 'lucide-react';

export const BusinessHoursSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentDay, setCurrentDay] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredDay, setHoveredDay] = useState(null);

    useEffect(() => {
        // Set up intersection observer for animations
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const section = document.querySelector('.business-hours-section');
        if (section) {
            observer.observe(section);
        }

        // Get current day and time
        const updateDateTime = () => {
            const now = new Date();
            const days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
            const day = days[now.getDay()];
            setCurrentDay(day);

            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);

            // Check if currently open
            const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
            const currentHour = now.getHours() + now.getMinutes() / 60;

            if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday to Friday
                setIsOpen(currentHour >= 9 && currentHour < 17);
            } else if (dayOfWeek === 6) { // Saturday
                setIsOpen(currentHour >= 10 && currentHour < 14);
            } else {
                setIsOpen(false);
            }
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 60000); // Update every minute

        return () => {
            if (section) {
                observer.unobserve(section);
            }
            clearInterval(interval);
        };
    }, []);

    const businessHours = [
        { days: 'Ponedeljak - Petak', hours: '09:00 - 17:00', status: 'workday' },
        { days: 'Subota', hours: '10:00 - 14:00', status: 'shorterday' },
        { days: 'Nedelja', hours: 'Zatvoreno', status: 'closed' },
        { days: 'Državni praznici', hours: 'Zatvoreno', status: 'closed' }
    ];

    const getStatusStyles = (status, isHovered) => {
        const baseClasses = `absolute top-0 right-0 px-2 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`;

        switch (status) {
            case 'workday':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'shorterday':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'closed':
                return `${baseClasses} bg-gray-100 text-gray-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const getCardStyles = (status, isHovered) => {
        const baseClasses = "relative border rounded-lg transition-all duration-300";

        if (isHovered) {
            switch (status) {
                case 'workday':
                    return `${baseClasses} border-green-200 bg-green-50/50 shadow-md transform scale-105`;
                case 'shorterday':
                    return `${baseClasses} border-blue-200 bg-blue-50/50 shadow-md transform scale-105`;
                case 'closed':
                    return `${baseClasses} border-gray-200 bg-gray-50/50 shadow-md transform scale-105`;
                default:
                    return `${baseClasses} border-gray-200 shadow-md transform scale-105`;
            }
        } else {
            return `${baseClasses} border-gray-100 bg-white hover:shadow-md`;
        }
    };

    return (
        <section className="business-hours-section py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-50 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute top-1/2 left-0 w-40 h-40 bg-green-50 rounded-full opacity-30 blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                }`}>
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="inline-block text-blue-600 text-sm font-medium tracking-wider uppercase mb-2">Kada smo tu za vas</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Radno Vreme</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
                        <p className="text-gray-600">
                            Posetite naš salon u navedeno radno vreme ili zakažite konsultaciju. Stojimo vam na raspolaganju za sve informacije.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Current status card */}
                        <div className={`mb-10 transition-all duration-700 delay-200 ${
                            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        }`}>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="md:flex">
                                    <div className={`md:w-1/3 p-6 flex flex-col justify-center items-center ${
                                        isOpen ? 'bg-green-50' : 'bg-gray-50'
                                    }`}>
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                                            isOpen
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                        }`}>
                                            {isOpen ? (
                                                <Check className="w-8 h-8" />
                                            ) : (
                                                <X className="w-8 h-8" />
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                                            {isOpen ? 'Otvoreno' : 'Zatvoreno'}
                                        </h3>
                                        <p className="text-sm text-gray-600 text-center">
                                            {isOpen
                                                ? 'Trenutno radimo'
                                                : 'Trenutno ne radimo'}
                                        </p>
                                    </div>
                                    <div className="md:w-2/3 p-6">
                                        <div className="flex items-center mb-4">
                                            <CalendarClock className="w-5 h-5 text-blue-600 mr-2" />
                                            <h3 className="text-lg font-semibold text-gray-800">Trenutno vreme</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center">
                                                <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                                                <div>
                                                    <span className="text-sm text-gray-500">Dan</span>
                                                    <p className="font-medium text-gray-800">{currentDay}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                                                <div>
                                                    <span className="text-sm text-gray-500">Vreme</span>
                                                    <p className="font-medium text-gray-800">{currentTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business hours grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {businessHours.map((schedule, index) => {
                                const isCurrentDayRange =
                                    (schedule.days === 'Ponedeljak - Petak' && ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak'].includes(currentDay)) ||
                                    (schedule.days === currentDay);

                                const isThisDayHovered = hoveredDay === index;

                                return (
                                    <div
                                        key={index}
                                        className={`transition-all duration-700 ${
                                            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                                        }`}
                                        style={{ transitionDelay: `${300 + index * 100}ms` }}
                                        onMouseEnter={() => setHoveredDay(index)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                    >
                                        <div className={`${getCardStyles(schedule.status, isThisDayHovered)} ${
                                            isCurrentDayRange ? 'ring-2 ring-blue-200' : ''
                                        }`}>
                                            <div className="p-6">
                                                <div className="flex justify-between items-center">
                                                    <h3 className={`font-medium text-lg ${isThisDayHovered ? 'text-blue-800' : 'text-gray-800'} transition-colors duration-300`}>
                                                        {schedule.days}
                                                    </h3>
                                                    <div className={`text-right transition-all duration-300 ${
                                                        isThisDayHovered ? 'transform scale-110' : ''
                                                    }`}>
                                                        <span className={`font-medium ${
                                                            schedule.status === 'closed'
                                                                ? 'text-gray-500'
                                                                : (isThisDayHovered ? 'text-blue-600' : 'text-gray-800')
                                                        } transition-colors duration-300`}>
                                                            {schedule.hours}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {isThisDayHovered && (
                                                <div className={getStatusStyles(schedule.status, isThisDayHovered)}>
                                                    {schedule.status === 'workday' && 'Puno radno vreme'}
                                                    {schedule.status === 'shorterday' && 'Skraćeno radno vreme'}
                                                    {schedule.status === 'closed' && 'Zatvoreno'}
                                                </div>
                                            )}
                                            {isCurrentDayRange && (
                                                <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Special note */}
                        <div className={`mt-10 transition-all duration-700 delay-700 ${
                            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        }`}>
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 md:p-6 flex items-start">
                                <div className="flex-shrink-0 mr-4">
                                    <AlertCircle className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-amber-800 mb-2">Posebna napomena</h3>
                                    <p className="text-amber-700 text-sm">
                                        Zakazivanje posete van radnog vremena moguće je uz prethodnu najavu.
                                        Kontaktirajte nas telefonom ili emailom najmanje 24 sata unapred.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mobile quick action - visible only on mobile */}
                        <div className="md:hidden mt-8 transition-all duration-700 delay-800">
                            <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                                <Clock className="w-5 h-5 mr-2" />
                                <span>Zakažite posetu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};