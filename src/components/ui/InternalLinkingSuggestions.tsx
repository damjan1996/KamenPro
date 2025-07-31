// src/components/ui/InternalLinkingSuggestions.tsx - SEO-optimized internal linking
import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Home, Wrench, Star } from 'lucide-react';

interface InternalLinkingSuggestionsProps {
    currentPage: string;
    currentCategory?: string;
    productName?: string;
    location?: string;
}

interface SuggestionLink {
    href: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    category: 'product' | 'service' | 'location' | 'reference' | 'general';
    priority: 'high' | 'medium' | 'low';
}

export function InternalLinkingSuggestions({ 
    currentPage, 
    currentCategory, 
    productName, 
    location 
}: InternalLinkingSuggestionsProps) {
    const [suggestions, setSuggestions] = useState<SuggestionLink[]>([]);
    const [visibleSuggestions, setVisibleSuggestions] = useState(3);

    useEffect(() => {
        const generateSuggestions = () => {
            const allSuggestions: SuggestionLink[] = [];

            // Product-related suggestions
            if (currentPage.includes('/proizvodi/') && productName) {
                allSuggestions.push(
                    {
                        href: '/proizvodi',
                        title: 'Kompletna ponuda proizvoda',
                        description: 'Pogledajte sve naše dekorativne kamene obloge i rustik cigle',
                        icon: <Home className="h-4 w-4" />,
                        category: 'product',
                        priority: 'high'
                    },
                    {
                        href: '/reference',
                        title: 'Realizovani projekti',
                        description: `Vidite kako se ${productName} koristi u stvarnim projektima`,
                        icon: <Star className="h-4 w-4" />,
                        category: 'reference',
                        priority: 'high'
                    },
                    {
                        href: '/kontakt',
                        title: 'Stručni savet za ugradnju',
                        description: 'Kontaktirajte nas za profesionalne savete o montaži',
                        icon: <Wrench className="h-4 w-4" />,
                        category: 'service',
                        priority: 'medium'
                    }
                );

                // Category-specific suggestions
                if (currentCategory) {
                    if (currentCategory.toLowerCase().includes('dolomite')) {
                        allSuggestions.push({
                            href: '/proizvodi/kategorija/dolomite',
                            title: 'Sve Dolomite obloge',
                            description: 'Istražite kompletnu kolekciju Dolomite kamenih obloga',
                            icon: <ExternalLink className="h-4 w-4" />,
                            category: 'product',
                            priority: 'high'
                        });
                    } else if (currentCategory.toLowerCase().includes('kamen')) {
                        allSuggestions.push({
                            href: '/proizvodi/kategorija/kamen',
                            title: 'Sve kamene obloge',
                            description: 'Pogledajte različite vrste i boje kamenih obloga',
                            icon: <ExternalLink className="h-4 w-4" />,
                            category: 'product',
                            priority: 'high'
                        });
                    } else if (currentCategory.toLowerCase().includes('cigla')) {
                        allSuggestions.push({
                            href: '/proizvodi/kategorija/cigla',
                            title: 'Sve rustik cigle',
                            description: 'Otkrijte sve varijante rustik cigli za topao ambijent',
                            icon: <ExternalLink className="h-4 w-4" />,
                            category: 'product',
                            priority: 'high'
                        });
                    }
                }
            }

            // Location-specific suggestions
            if (location) {
                allSuggestions.push({
                    href: `/lokacije/${location.toLowerCase()}`,
                    title: `Usluge u ${location}`,
                    description: `Montaža i dostava kamenih obloga u ${location}`,
                    icon: <Wrench className="h-4 w-4" />,
                    category: 'location',
                    priority: 'high'
                });
            } else {
                // General location suggestions
                allSuggestions.push(
                    {
                        href: '/lokacije/bijeljina',
                        title: 'Usluge u Bijeljini',
                        description: 'Naš glavni centar - kompletne usluge montaže',
                        icon: <Wrench className="h-4 w-4" />,
                        category: 'location',
                        priority: 'medium'
                    },
                    {
                        href: '/lokacije/brcko',
                        title: 'Usluge u Brčkom',
                        description: 'Dostava i stručna montaža kamenih obloga',
                        icon: <Wrench className="h-4 w-4" />,
                        category: 'location',
                        priority: 'medium'
                    },
                    {
                        href: '/lokacije/tuzla',
                        title: 'Usluge u Tuzli',
                        description: 'Profesionalna ugradnja dekorativnih obloga',
                        icon: <Wrench className="h-4 w-4" />,
                        category: 'location',
                        priority: 'medium'
                    }
                );
            }

            // General suggestions based on current page
            if (!currentPage.includes('/o-nama')) {
                allSuggestions.push({
                    href: '/o-nama',
                    title: 'O KamenPro kompaniji',
                    description: 'Saznajte više o našoj istoriji i vrednostima',
                    icon: <Home className="h-4 w-4" />,
                    category: 'general',
                    priority: 'low'
                });
            }

            if (!currentPage.includes('/reference')) {
                allSuggestions.push({
                    href: '/reference',
                    title: 'Naši projekti i reference',
                    description: 'Pogledajte galeriju realizovanih projekata',
                    icon: <Star className="h-4 w-4" />,
                    category: 'reference',
                    priority: 'medium'
                });
            }

            // Popular cross-links
            allSuggestions.push(
                {
                    href: '/proizvodi/installation-guide',
                    title: 'Vodič za ugradnju',
                    description: 'Korak po korak uputstvo za montažu kamenih obloga',
                    icon: <Wrench className="h-4 w-4" />,
                    category: 'service',
                    priority: 'medium'
                },
                {
                    href: '/proizvodi/faq',
                    title: 'Česta pitanja',
                    description: 'Odgovori na najčešća pitanja o proizvodima',
                    icon: <ExternalLink className="h-4 w-4" />,
                    category: 'general',
                    priority: 'low'
                }
            );

            // Sort by priority and limit to most relevant
            return allSuggestions
                .sort((a, b) => {
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                })
                .slice(0, 8);
        };

        setSuggestions(generateSuggestions());
    }, [currentPage, currentCategory, productName, location]);

    const displayedSuggestions = suggestions.slice(0, visibleSuggestions);
    const hasMoreSuggestions = suggestions.length > visibleSuggestions;

    if (suggestions.length === 0) {
        return null;
    }

    return (
        <section className="py-8 bg-stone-50 border-t border-stone-200">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-lg font-medium text-stone-900 mb-4 flex items-center">
                        <ExternalLink className="h-5 w-5 mr-2 text-amber-600" />
                        Možda vas zanima
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayedSuggestions.map((suggestion, index) => (
                            <SuggestionCard 
                                key={`${suggestion.href}-${index}`}
                                suggestion={suggestion}
                                index={index}
                            />
                        ))}
                    </div>

                    {hasMoreSuggestions && (
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setVisibleSuggestions(prev => Math.min(prev + 3, suggestions.length))}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                            >
                                Prikaži više predloga
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

interface SuggestionCardProps {
    suggestion: SuggestionLink;
    index: number;
}

function SuggestionCard({ suggestion, index }: SuggestionCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'product':
                return 'bg-blue-50 text-blue-600 border-blue-200';
            case 'service':
                return 'bg-green-50 text-green-600 border-green-200'; 
            case 'location':
                return 'bg-purple-50 text-purple-600 border-purple-200';
            case 'reference':
                return 'bg-amber-50 text-amber-600 border-amber-200';
            default:
                return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    return (
        <a
            href={suggestion.href}
            className="group block bg-white rounded-lg border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 p-4"
            style={{ transitionDelay: `${index * 50}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title={suggestion.description}
        >
            <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${getCategoryColor(suggestion.category)} group-hover:scale-110 transition-transform duration-300`}>
                    {suggestion.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-stone-900 group-hover:text-amber-600 transition-colors truncate">
                            {suggestion.title}
                        </h4>
                        <ArrowRight className={`h-4 w-4 text-stone-400 group-hover:text-amber-600 flex-shrink-0 ml-2 transition-all duration-300 ${
                            isHovered ? 'translate-x-1' : ''
                        }`} />
                    </div>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {suggestion.description}
                    </p>
                    
                    {/* Priority indicator */}
                    <div className="mt-2 flex items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                            suggestion.priority === 'high' 
                                ? 'bg-red-100 text-red-700'
                                : suggestion.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'  
                                : 'bg-gray-100 text-gray-600'
                        }`}>
                            {suggestion.priority === 'high' ? 'Preporučeno' : 
                             suggestion.priority === 'medium' ? 'Korisno' : 'Dodatno'}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
}