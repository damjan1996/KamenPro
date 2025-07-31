// Enhanced analytics tracking for local SEO optimization

export interface AnalyticsEvent {
    action: string;
    category: string;
    label?: string;
    value?: number;
    location?: string;
    customDimensions?: Record<string, string | number>;
}

export interface SEOEvent {
    type: 'keyword_ranking' | 'organic_click' | 'local_search' | 'gmb_action' | 'conversion';
    location?: string;
    keyword?: string;
    position?: number;
    page?: string;
    value?: number;
}

// Enhanced Google Analytics 4 tracking
export class AnalyticsService {
    private static instance: AnalyticsService;
    private initialized = false;
    
    private constructor() {}
    
    static getInstance(): AnalyticsService {
        if (!AnalyticsService.instance) {
            AnalyticsService.instance = new AnalyticsService();
        }
        return AnalyticsService.instance;
    }
    
    init(measurementId: string = 'G-HKZ64S51GN') {
        if (typeof window === 'undefined' || this.initialized) return;
        
        // Load Google Analytics 4
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            window.dataLayer.push(arguments);
        };

        window.gtag('js', new Date());
        window.gtag('config', measurementId, {
            anonymize_ip: true,
            custom_map: {
                custom_dimension_1: 'location',
                custom_dimension_2: 'keyword',
                custom_dimension_3: 'position',
                custom_dimension_4: 'page_type'
            }
        });
        
        this.initialized = true;
    }
    
    // Track general events
    trackEvent(event: AnalyticsEvent) {
        if (typeof window === 'undefined' || !window.gtag) return;
        
        const eventData: any = {
            event_category: event.category,
            event_label: event.label,
            value: event.value
        };
        
        // Add location dimension
        if (event.location) {
            eventData.location = event.location;
        }
        
        // Add custom dimensions
        if (event.customDimensions) {
            Object.assign(eventData, event.customDimensions);
        }
        
        window.gtag('event', event.action, eventData);
    }
    
    // Track SEO-specific events
    trackSEOEvent(event: SEOEvent) {
        if (typeof window === 'undefined' || !window.gtag) return;
        
        const eventData: any = {
            event_category: 'SEO',
            event_label: event.type
        };
        
        if (event.location) eventData.location = event.location;
        if (event.keyword) eventData.keyword = event.keyword;
        if (event.position) eventData.position = event.position;
        if (event.page) eventData.page_type = event.page;
        if (event.value) eventData.value = event.value;
        
        window.gtag('event', `seo_${event.type}`, eventData);
    }
    
    // Track page views with location context
    trackPageView(path: string, title: string, location?: string) {
        if (typeof window === 'undefined' || !window.gtag) return;
        
        const eventData: any = {
            page_path: path,
            page_title: title
        };
        
        if (location) {
            eventData.location = location;
        }
        
        window.gtag('config', 'G-HKZ64S51GN', eventData);
    }
    
    // Track location-specific conversions
    trackLocationConversion(location: string, action: string, value: number = 1) {
        this.trackEvent({
            action: 'conversion',
            category: 'Location',
            label: `${location}_${action}`,
            value,
            location,
            customDimensions: {
                conversion_type: action
            }
        });
    }
    
    // Track GMB interactions
    trackGMBInteraction(location: string, action: 'view' | 'call' | 'directions' | 'website') {
        this.trackEvent({
            action: 'gmb_interaction',
            category: 'Google My Business',
            label: `${location}_${action}`,
            location,
            customDimensions: {
                gmb_action: action
            }
        });
    }
    
    // Track keyword performance
    trackKeywordPerformance(keyword: string, position: number, location?: string) {
        this.trackSEOEvent({
            type: 'keyword_ranking',
            keyword,
            position,
            location
        });
    }
    
    // Track form submissions
    trackFormSubmission(formType: string, location?: string) {
        this.trackEvent({
            action: 'form_submission',
            category: 'Lead Generation',
            label: formType,
            location,
            customDimensions: {
                form_type: formType
            }
        });
    }
    
    // Track phone number clicks
    trackPhoneClick(location?: string) {
        this.trackEvent({
            action: 'phone_click',
            category: 'Contact',
            label: location || 'general',
            location,
            customDimensions: {
                contact_method: 'phone'
            }
        });
    }
    
    // Track email clicks
    trackEmailClick(location?: string) {
        this.trackEvent({
            action: 'email_click',
            category: 'Contact',
            label: location || 'general',
            location,
            customDimensions: {
                contact_method: 'email'
            }
        });
    }
    
    // Track product interest
    trackProductInterest(productName: string, action: 'view' | 'inquiry', location?: string) {
        this.trackEvent({
            action: `product_${action}`,
            category: 'Product Interest',
            label: productName,
            location,
            customDimensions: {
                product_name: productName
            }
        });
    }
    
    // Track image optimizations
    trackImageOptimization(imageSrc: string, format: string, loadTime: number) {
        this.trackEvent({
            action: 'image_optimized',
            category: 'Performance',
            label: format,
            value: Math.round(loadTime),
            customDimensions: {
                image_format: format,
                load_time: loadTime
            }
        });
    }
}

// Convenience functions
export const analytics = AnalyticsService.getInstance();

export const trackLocationView = (location: string) => {
    analytics.trackSEOEvent({
        type: 'local_search',
        location,
        page: 'location'
    });
};

export const trackProductView = (productName: string, location?: string) => {
    analytics.trackProductInterest(productName, 'view', location);
};

export const trackContactFormSubmission = (location?: string) => {
    analytics.trackFormSubmission('contact', location);
    analytics.trackLocationConversion(location || 'general', 'contact_form');
};

export const trackQuoteRequest = (location?: string) => {
    analytics.trackFormSubmission('quote', location);
    analytics.trackLocationConversion(location || 'general', 'quote_request', 5); // Higher value for quotes
};

// Enhanced ecommerce tracking for product catalog
export const trackProductCatalogView = (location?: string) => {
    analytics.trackEvent({
        action: 'view_item_list',
        category: 'Ecommerce',
        label: 'product_catalog',
        location,
        customDimensions: {
            item_list_name: 'Product Catalog'
        }
    });
};

// Track search functionality if implemented
export const trackSiteSearch = (searchTerm: string, results: number, location?: string) => {
    analytics.trackEvent({
        action: 'search',
        category: 'Site Search',
        label: searchTerm,
        value: results,
        location,
        customDimensions: {
            search_term: searchTerm,
            search_results: results
        }
    });
};

// Track scroll depth for engagement
export const trackScrollDepth = (depth: number, location?: string) => {
    analytics.trackEvent({
        action: 'scroll',
        category: 'Engagement',
        label: `${depth}%`,
        value: depth,
        location,
        customDimensions: {
            scroll_depth: depth
        }
    });
};

// Initialize analytics on app start
export const initializeAnalytics = () => {
    if (typeof window !== 'undefined') {
        analytics.init();
        
        // Track initial page view
        const location = window.location.pathname.match(/\/lokacije\/(\w+)/)?.[1];
        analytics.trackPageView(
            window.location.pathname,
            document.title,
            location
        );
    }
};

// Export for use in React components
export default analytics;