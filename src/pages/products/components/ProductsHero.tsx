"use client"

import { useState, useEffect, useRef } from "react"
import { Container } from "../../../components/ui/Container"
import { ArrowRight } from "lucide-react"

export function ProductsHero() {
    const [isVisible, setIsVisible] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const sectionRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        // Initial animation on load
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 300)

        // Track scroll for animations
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const maxScroll = window.innerHeight * 0.5
            const progress = Math.min(scrollTop / maxScroll, 1)
            setScrollProgress(progress)
        }

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            clearTimeout(timer)
            window.removeEventListener("scroll", handleScroll)
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[60vh] flex items-center overflow-hidden font-sans pt-16 md:pt-20"
        >
            {/* Background image with gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10"></div>
                <img
                    src="/images/products/pozadina%20ii.jpg"
                    alt="KamenPro dekorativne kamene obloge - pririkaz različitih tekstura i boja dekorativnog kamena za enterijer i eksterijer"
                    className="w-full h-full object-cover object-center z-0 transition-transform duration-10000 ease-out"
                    style={{
                        transform: `scale(${1 + scrollProgress * 0.05})`,
                        opacity: 1 - scrollProgress * 0.3,
                    }}
                />
            </div>

            <Container className="relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <div
                        className={`transition-all duration-1000 ease-out ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 tracking-wide leading-tight">
                            <span className="block">Dekorativne</span>
                            <span className="block font-medium text-amber-400">kamene obloge</span>
                        </h1>
                    </div>

                    <div
                        className={`transition-all duration-1000 delay-300 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        <p className="text-lg text-white/90 mb-8 leading-relaxed font-light">
                            Prirodna estetika i kvalitet za vaš prostor.
                        </p>
                    </div>

                    <div
                        className={`transition-all duration-1000 delay-500 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        <a
                            href="/kontakt"
                            className="group inline-flex items-center ml-4 border border-white/70 text-white px-6 py-3 rounded-sm hover:bg-white/10 transition-all duration-300 text-sm uppercase tracking-wider font-light"
                        >
                            <span>Kontaktirajte nas</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </Container>

            <style>{`
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
    )
}
