// src/components/about/components/OurStoryHero.tsx
import { useState, useEffect } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight } from 'lucide-react';

export function OurStoryHero() {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // Inicijalna animacija pri učitavanju
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        // Parallax efekat
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth - 0.5,
                y: e.clientY / window.innerHeight - 0.5,
            });
        };

        // Scroll progress
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = window.innerHeight * 0.5;
            const progress = Math.min(scrollTop / maxScroll, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#f5f5f3]">
            {/* Background parallax image */}
            <div
                className="absolute inset-0 transition-transform duration-300 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) scale(${1 + scrollProgress * 0.1})`,
                    opacity: 1 - scrollProgress * 0.5
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-0"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/hero.png')",
                        opacity: 0.9
                    }}
                ></div>
            </div>

            {/* Floating design elements */}
            <div className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full border border-white/20 opacity-60 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-[10%] w-48 h-48 rounded-full border border-white/10 opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Main content */}
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    {/* Left content */}
                    <div className="lg:col-span-3">
                        <div className={`transition-all duration-1000 ease-out ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="h-[2px] w-10 bg-white/60"></div>
                                <span className="uppercase tracking-widest text-white/80 text-sm font-light">Naša priča</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight leading-tight">
                                <span className="block overflow-hidden">
                                    <span className="block transform transition-all duration-1000 delay-100">
                                        <span className="font-light">Contemporary</span>
                                    </span>
                                </span>
                                <span className="block overflow-hidden mt-2">
                                    <span className="block transform transition-all duration-1000 delay-300">
                                        <span className="font-bold">Dizajn kamena</span>
                                    </span>
                                </span>
                            </h1>
                        </div>

                        <div className={`transition-all duration-1000 delay-500 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
                                Više od 15 godina posvećeni smo stvaranju vrhunskih kamenih obloga
                                koje harmonično spajaju prirodnu lepotu sa savremenim dizajnom.
                            </p>
                        </div>

                        <div className={`transition-all duration-1000 delay-700 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                            <a
                                href="/o-nama/istorija"
                                className="group inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
                            >
                                <span className="text-white">Saznajte više</span>
                                <ArrowRight className="h-5 w-5 text-white transform transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>

                    {/* Right content - Featured image card */}
                    <div className={`lg:col-span-2 transition-all duration-1000 delay-700 ${
                        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
                    }`}>
                        <div className="relative bg-black/30 backdrop-blur-sm rounded-xl p-6 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>

                            <div className="relative z-10">
                                <p className="text-white/70 text-sm mb-4">
                                    Crafting spaces that harmonize modern interior design with nature's elegance. Our interior works redefine the essence of chic living.
                                </p>

                                <div className="mt-4 mb-6 h-[1px] w-full bg-white/20"></div>

                                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                                    <img
                                        src="/images/featured-interior.jpg"
                                        alt="Interior design"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <a
                                    href="/galerija"
                                    className="inline-flex items-center space-x-2 text-white text-sm"
                                >
                                    <span>View More</span>
                                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300">
                                        <ArrowRight className="h-3 w-3 text-white" />
                                    </span>
                                </a>
                            </div>

                            {/* Circular design element */}
                            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full border border-white/10 opacity-70"></div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Circular aesthetic element */}
            <div className="absolute bottom-8 right-8 hidden md:flex items-center justify-center">
                <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full rotate-animation">
                        <path
                            id="circlePath"
                            d="M50,90 a40,40 0 1,1 0,-80 a40,40 0 1,1 0,80"
                            fill="none"
                            stroke="none"
                        />
                        <text fontSize="8" fill="white" opacity="0.6">
                            <textPath href="#circlePath" startOffset="0%">
                                minimalist • contemporary • aesthetic • minimalist • contemporary •
                            </textPath>
                        </text>
                    </svg>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 cursor-pointer ${
                scrollProgress > 0.2 ? 'opacity-0' : 'opacity-70'
            }`}>
                <span className="text-white/70 text-sm mb-2">Scroll down</span>
                <div className="w-6 h-10 rounded-full border border-white/30 flex items-center justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full animate-scroll"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .rotate-animation {
                    animation: rotate 20s linear infinite;
                }
                
                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    30% { transform: translateY(4px); opacity: 1; }
                    60% { transform: translateY(0); opacity: 0.5; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                .animate-scroll {
                    animation: scroll 1.5s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}