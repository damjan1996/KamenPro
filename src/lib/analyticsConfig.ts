// Google Analytics 4 Configuration for Vite/React
// Replaces Next.js document setup with proper Vite configuration

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

export const GA_MEASUREMENT_ID = 'G-HKZ64S51GN';

// Initialize Google Analytics 4
export function initializeAnalytics() {
    if (typeof window === 'undefined') return;
    
    // Only initialize once
    if (window.gtag) return;
    
    // Create script element for gtag
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };

    // Configure Google Analytics
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
        // Privacy-compliant settings
        anonymize_ip: true,
        respect_dnt: true,
        
        // Custom dimensions for local SEO
        custom_map: {
            custom_dimension_1: 'location',
            custom_dimension_2: 'page_type',
            custom_dimension_3: 'user_action'
        },
        
        // Enhanced ecommerce and conversion tracking
        send_page_view: true,
        allow_google_signals: false, // GDPR compliance
        
        // Debugging in development
        debug_mode: process.env.NODE_ENV === 'development'
    });
    
    console.log('Google Analytics 4 initialized');
}

// Track page views with location context
export function trackPageView(path: string, title: string, location?: string) {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title,
        ...(location && { location })
    });
}

// Track location-specific events
export function trackLocationEvent(eventName: string, location: string, parameters: Record<string, any> = {}) {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', eventName, {
        event_category: 'Location Interaction',
        location,
        page_type: 'location_page',
        ...parameters
    });
}

// Track conversions with enhanced data
export function trackConversion(conversionType: 'form_submit' | 'phone_click' | 'quote_request', data: {
    location?: string;
    value?: number;
    currency?: string;
}) {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', 'conversion', {
        event_category: 'Conversion',
        event_label: conversionType,
        value: data.value || 1,
        currency: data.currency || 'BAM',
        location: data.location || 'unknown'
    });
    
    // Enhanced ecommerce conversion
    window.gtag('event', 'generate_lead', {
        currency: 'BAM',
        value: data.value || 50, // Estimated lead value
        location: data.location
    });
}

// Track Core Web Vitals with proper GA4 integration
export function trackWebVitals(name: string, value: number, id: string, rating: string) {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: name,
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        metric_id: id,
        metric_rating: rating,
        non_interaction: true
    });
}

// Track GMB interactions
export function trackGMBInteraction(action: 'view' | 'call' | 'directions' | 'website' | 'reviews', location: string) {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', 'gmb_interaction', {
        event_category: 'Google My Business',
        event_label: `${location}_${action}`,
        location,
        gmb_action: action
    });
}

export default {
    initialize: initializeAnalytics,
    trackPageView,
    trackLocationEvent,
    trackConversion,
    trackWebVitals,
    trackGMBInteraction
};