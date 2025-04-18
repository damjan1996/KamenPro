import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import '../styles/globals.css' // Passe diesen Pfad ggf. an

// Für TypeScript: Definiere den window-Typ mit gtag
declare global {
    interface Window {
        gtag: (command: string, target: string, config?: Record<string, unknown>) => void;
        dataLayer: unknown[];
    }
}

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url: string): void => {
            // Google Analytics Page View Tracking
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('config', 'G-HKZ64S51GN', {
                    page_path: url,
                    anonymize_ip: true
                })
            }
        }

        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return <Component {...pageProps} />
}