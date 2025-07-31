// Web Vitals tracking for SEO and performance monitoring
import { trackWebVitals } from './analyticsConfig';

export interface WebVitalMetric {
    id: string;
    name: string;
    value: number;
    delta: number;
    entries: any[];
    navigationType?: string;
}

// Track Core Web Vitals for SEO optimization
export function reportWebVitals(metric: WebVitalMetric) {
    const { name, id, value } = metric;
    const rating = getWebVitalRating(name, value);
    
    // Send to Google Analytics with proper integration
    trackWebVitals(name, value, id, rating);

    // Send to console for development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${name}:`, {
            id,
            value,
            rating: getWebVitalRating(name, value)
        });
    }

    // Track location-specific performance if on location page
    const locationMatch = window.location.pathname.match(/\/lokacije\/(\w+)/);
    if (locationMatch) {
        trackLocationPerformance(locationMatch[1], name, value);
    }
}

// Get performance rating based on Google's thresholds
export function getWebVitalRating(name: string, value: number): 'good' | 'poor' | 'needs-improvement' {
    switch (name) {
        case 'LCP': // Largest Contentful Paint
            if (value <= 2500) return 'good';
            if (value <= 4000) return 'needs-improvement';
            return 'poor';
        case 'FID': // First Input Delay
            if (value <= 100) return 'good';
            if (value <= 300) return 'needs-improvement';
            return 'poor';
        case 'CLS': // Cumulative Layout Shift
            if (value <= 0.1) return 'good';
            if (value <= 0.25) return 'needs-improvement';
            return 'poor';
        case 'FCP': // First Contentful Paint
            if (value <= 1800) return 'good';
            if (value <= 3000) return 'needs-improvement';
            return 'poor';
        case 'TTFB': // Time to First Byte
            if (value <= 800) return 'good';
            if (value <= 1800) return 'needs-improvement';
            return 'poor';
        default:
            return 'good';
    }
}

// Track location-specific performance metrics
export function trackLocationPerformance(location: string, metric: string, value: number) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'location_performance', {
            event_category: 'Location Performance',
            event_label: location,
            custom_map: {
                custom_dimension_1: location,
                custom_dimension_2: metric
            },
            value: Math.round(metric === 'CLS' ? value * 1000 : value)
        });
    }
}

// Track location-specific user interactions
export function trackLocationConversion(location: string, action: string, value?: number) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'location_conversion', {
            event_category: 'Location Conversion',
            event_action: action,
            event_label: location,
            value: value || 1,
            custom_map: {
                custom_dimension_1: location
            }
        });
    }
}

// Initialize web vitals tracking
export function initWebVitals() {
    // Dynamic import of web-vitals library
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals);
        getFID(reportWebVitals);
        getFCP(reportWebVitals);
        getLCP(reportWebVitals);
        getTTFB(reportWebVitals);
    }).catch(error => {
        console.warn('Failed to load web vitals:', error);
    });
}

// SEO-specific performance monitoring
export interface SEOMetrics {
    pageLoadTime: number;
    timeToInteractive: number;
    domContentLoaded: number;
    resourcesLoaded: number;
}

export function trackSEOMetrics(): SEOMetrics {
    if (typeof window === 'undefined' || !window.performance) {
        return {
            pageLoadTime: 0,
            timeToInteractive: 0,
            domContentLoaded: 0,
            resourcesLoaded: 0
        };
    }

    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    const metrics: SEOMetrics = {
        pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        timeToInteractive: navigation.domInteractive - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        resourcesLoaded: window.performance.getEntriesByType('resource').length
    };

    // Send to analytics
    if (window.gtag) {
        window.gtag('event', 'seo_metrics', {
            event_category: 'SEO Performance',
            custom_map: {
                custom_metric_2: 'page_load_time',
                custom_metric_3: 'time_to_interactive'
            },
            page_load_time: Math.round(metrics.pageLoadTime),
            time_to_interactive: Math.round(metrics.timeToInteractive)
        });
    }

    return metrics;
}