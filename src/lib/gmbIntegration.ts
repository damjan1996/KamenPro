// Enhanced Google My Business Integration for KamenPro
// Provides comprehensive GMB API integration, post management, and analytics

import { getAllLocations, LocationData } from './locationData';
import { analytics } from './analytics';

export interface GMBLocation {
    name: string;
    locationKey: string;
    address: {
        addressLines: string[];
        locality: string;
        region: string;
        postalCode: string;
        country: string;
    };
    primaryPhone: string;
    websiteUrl: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    businessHours: {
        [key: string]: {
            openTime: string;
            closeTime: string;
        };
    };
    categories: string[];
    photos: string[];
    description: string;
    attributes: GMBAttribute[];
}

export interface GMBAttribute {
    attributeId: string;
    valueType: 'BOOL' | 'ENUM' | 'URL' | 'REPEATED_ENUM';
    values: string[];
}

export interface GMBPost {
    name?: string;
    languageCode: string;
    summary: string;
    callToAction?: {
        actionType: 'BOOK' | 'ORDER' | 'SHOP' | 'LEARN_MORE' | 'SIGN_UP' | 'CALL';
        url?: string;
    };
    media?: {
        mediaFormat: 'PHOTO' | 'VIDEO';
        sourceUrl: string;
        description?: string;
    }[];
    event?: {
        title: string;
        schedule: {
            startDate: string;
            endDate?: string;
            startTime?: string;
            endTime?: string;
        };
    };
    offer?: {
        couponCode?: string;
        redeemOnlineUrl?: string;
        termsConditions?: string;
    };
    alertType?: 'COVID_19';
    topicType: 'STANDARD' | 'EVENT' | 'OFFER' | 'ALERT';
}

export interface GMBReview {
    name: string;
    reviewer: {
        displayName: string;
        profilePhotoUrl?: string;
    };
    starRating: number;
    comment?: string;
    createTime: string;
    updateTime: string;
    reviewReply?: {
        comment: string;
        updateTime: string;
    };
}

export interface GMBInsights {
    locationMetrics: {
        metricType: 'QUERIES_DIRECT' | 'QUERIES_INDIRECT' | 'QUERIES_CHAIN' | 'VIEWS_MAPS' | 'VIEWS_SEARCH' | 'ACTIONS_WEBSITE' | 'ACTIONS_PHONE' | 'ACTIONS_DRIVING_DIRECTIONS';
        totalValue: {
            value: number;
        };
        timeDimension: {
            timeRange: {
                startTime: string;
                endTime: string;
            };
        };
    }[];
}

class GMBService {
    private static instance: GMBService;
    private apiKey: string | null = null;
    private accountId: string | null = null;
    
    private constructor() {}
    
    static getInstance(): GMBService {
        if (!GMBService.instance) {
            GMBService.instance = new GMBService();
        }
        return GMBService.instance;
    }
    
    initialize(apiKey: string, accountId: string) {
        this.apiKey = apiKey;
        this.accountId = accountId;
    }
    
    // Get all GMB locations for KamenPro
    async getLocations(): Promise<GMBLocation[]> {
        if (!this.apiKey || !this.accountId) {
            throw new Error('GMB service not initialized');
        }
        
        // In a real implementation, this would call the GMB API
        // For now, return mock data based on our location data
        const locations = getAllLocations();
        
        return locations.map(location => this.mapLocationToGMB(location));
    }
    
    // Map internal location data to GMB format
    private mapLocationToGMB(location: LocationData): GMBLocation {
        return {
            name: `locations/${this.accountId}/locations/${location.citySlug}`,
            locationKey: location.citySlug,
            address: {
                addressLines: ['KamenPro Showroom'],
                locality: location.city,
                region: location.city === 'Bijeljina' ? 'Republika Srpska' : 
                       location.city === 'Brčko' ? 'Brčko Distrikt' : 
                       'Federacija Bosne i Hercegovine',
                postalCode: location.city === 'Bijeljina' ? '76300' : 
                           location.city === 'Brčko' ? '76100' : '75000',
                country: 'BA'
            },
            primaryPhone: location.contactInfo.phone,
            websiteUrl: `https://kamenpro.net/lokacije/${location.citySlug}`,
            coordinates: location.coordinates,
            businessHours: {
                MONDAY: { openTime: '08:00', closeTime: '17:00' },
                TUESDAY: { openTime: '08:00', closeTime: '17:00' },
                WEDNESDAY: { openTime: '08:00', closeTime: '17:00' },
                THURSDAY: { openTime: '08:00', closeTime: '17:00' },
                FRIDAY: { openTime: '08:00', closeTime: '17:00' },
                SATURDAY: { openTime: '08:00', closeTime: '14:00' }
            },
            categories: ['gc:building_materials_supplier', 'gc:stone_supplier'],
            photos: [
                `https://kamenpro.net/images/lokacije/${location.citySlug}-exterior.jpg`,
                `https://kamenpro.net/images/lokacije/${location.citySlug}-interior.jpg`,
                `https://kamenpro.net/images/lokacije/${location.citySlug}-products.jpg`
            ],
            description: location.content.localInfo,
            attributes: [
                {
                    attributeId: 'has_wheelchair_accessible_entrance',
                    valueType: 'BOOL',
                    values: ['true']
                },
                {
                    attributeId: 'has_free_wifi',
                    valueType: 'BOOL',
                    values: ['true']
                },
                {
                    attributeId: 'accepts_credit_cards',
                    valueType: 'BOOL',
                    values: ['true']
                },
                {
                    attributeId: 'has_parking',
                    valueType: 'BOOL',
                    values: ['true']
                }
            ]
        };
    }
    
    // Create a new GMB post
    async createPost(locationKey: string, post: GMBPost): Promise<any> {
        if (!this.apiKey || !this.accountId) {
            throw new Error('GMB service not initialized');
        }
        
        // Track post creation
        analytics.trackEvent({
            action: 'gmb_post_created',
            category: 'GMB Management',
            label: locationKey,
            location: locationKey,
            customDimensions: {
                post_type: post.topicType,
                has_media: post.media ? 'true' : 'false'
            }
        });
        
        // In a real implementation, this would make an API call to GMB
        console.log(`Creating GMB post for ${locationKey}:`, post);
        
        return {
            name: `locations/${this.accountId}/locations/${locationKey}/localPosts/${Date.now()}`,
            languageCode: post.languageCode,
            summary: post.summary,
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
            state: 'LIVE'
        };
    }
    
    // Get insights for a specific location
    async getInsights(locationKey: string, startDate: string, endDate: string): Promise<GMBInsights> {
        if (!this.apiKey || !this.accountId) {
            throw new Error('GMB service not initialized');
        }
        
        // In a real implementation, this would call the GMB API
        // Return mock data for demonstration
        return {
            locationMetrics: [
                {
                    metricType: 'QUERIES_DIRECT',
                    totalValue: { value: Math.floor(Math.random() * 1000) + 100 },
                    timeDimension: {
                        timeRange: { startTime: startDate, endTime: endDate }
                    }
                },
                {
                    metricType: 'QUERIES_INDIRECT',
                    totalValue: { value: Math.floor(Math.random() * 500) + 50 },
                    timeDimension: {
                        timeRange: { startTime: startDate, endTime: endDate }
                    }
                },
                {
                    metricType: 'VIEWS_MAPS',
                    totalValue: { value: Math.floor(Math.random() * 2000) + 200 },
                    timeDimension: {
                        timeRange: { startTime: startDate, endTime: endDate }
                    }
                },
                {
                    metricType: 'ACTIONS_WEBSITE',
                    totalValue: { value: Math.floor(Math.random() * 150) + 20 },
                    timeDimension: {
                        timeRange: { startTime: startDate, endTime: endDate }
                    }
                },
                {
                    metricType: 'ACTIONS_PHONE',
                    totalValue: { value: Math.floor(Math.random() * 80) + 10 },
                    timeDimension: {
                        timeRange: { startTime: startDate, endTime: endDate }
                    }
                },
                {
                    metricType: 'ACTIONS_DRIVING_DIRECTIONS',
                    totalValue: { value: Math.floor(Math.random() * 120) + 15 },
                    timeDimension: {
                        timeRange: { startTime: startDate, endTime: endDate }
                    }
                }
            ]
        };
    }
    
    // Get reviews for a location
    async getReviews(locationKey: string): Promise<GMBReview[]> {
        if (!this.apiKey || !this.accountId) {
            throw new Error('GMB service not initialized');
        }
        
        // In a real implementation, this would call the GMB API
        // Return mock reviews based on location data
        const location = getAllLocations().find(loc => loc.citySlug === locationKey);
        if (!location?.content.testimonials) return [];
        
        return location.content.testimonials.map((testimonial, index) => ({
            name: `locations/${this.accountId}/locations/${locationKey}/reviews/${index + 1}`,
            reviewer: {
                displayName: testimonial.name,
                profilePhotoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`
            },
            starRating: testimonial.rating,
            comment: testimonial.text,
            createTime: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
            updateTime: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
        }));
    }
    
    // Reply to a review
    async replyToReview(locationKey: string, reviewName: string, reply: string): Promise<any> {
        if (!this.apiKey || !this.accountId) {
            throw new Error('GMB service not initialized');
        }
        
        analytics.trackEvent({
            action: 'gmb_review_reply',
            category: 'GMB Management',
            label: locationKey,
            location: locationKey
        });
        
        // In a real implementation, this would make an API call
        console.log(`Replying to review ${reviewName} for ${locationKey}:`, reply);
        
        return {
            comment: reply,
            updateTime: new Date().toISOString()
        };
    }
    
    // Batch update business information
    async updateBusinessInfo(locationKey: string, updates: Partial<GMBLocation>): Promise<GMBLocation> {
        if (!this.apiKey || !this.accountId) {
            throw new Error('GMB service not initialized');
        }
        
        analytics.trackEvent({
            action: 'gmb_business_updated',
            category: 'GMB Management',
            label: locationKey,
            location: locationKey
        });
        
        // In a real implementation, this would update via API
        console.log(`Updating business info for ${locationKey}:`, updates);
        
        const currentLocation = (await this.getLocations()).find(loc => loc.locationKey === locationKey);
        return { ...currentLocation!, ...updates };
    }
}

// Pre-defined post templates for KamenPro
export const GMB_POST_TEMPLATES = {
    newProduct: (productName: string, location: string): GMBPost => ({
        languageCode: 'sr',
        summary: `🏗️ Nova kolekcija ${productName} stigla u KamenPro ${location}!\n\n✨ Vrhunski kvalitet prirodnog kamena\n📐 Različite dimenzije i boje\n🚚 Besplatna dostava za narudžbe preko 500KM\n\n#DekorativniKamen #${productName} #KamenPro${location}`,
        callToAction: {
            actionType: 'LEARN_MORE',
            url: `https://kamenpro.net/lokacije/${location.toLowerCase()}`
        },
        topicType: 'STANDARD'
    }),
    
    promotion: (discount: string, location: string): GMBPost => ({
        languageCode: 'sr',
        summary: `🎉 Specijalna akcija u KamenPro ${location}!\n\n💰 ${discount} popusta na sve proizvode\n⏰ Ograničeno vrijeme\n📞 Pozovite za više informacija\n\n#Akcija #DekorativniKamen #KamenPro`,
        callToAction: {
            actionType: 'CALL'
        },
        topicType: 'OFFER',
        offer: {
            termsConditions: 'Akcija važi do isteka zaliha. Ne može se kombinovati sa drugim akcijama.'
        }
    }),
    
    projectShowcase: (projectName: string, location: string): GMBPost => ({
        languageCode: 'sr',
        summary: `📸 Ponosni smo na završen projekat "${projectName}" u ${location}!\n\n🏆 Profesionalna montaža dekorativnog kamena\n✨ Zadovoljan klijent\n🔨 Stručan tim\n\nKontaktirajte nas za vašu besplatnu procjenu!`,
        callToAction: {
            actionType: 'LEARN_MORE',
            url: `https://kamenpro.net/reference`
        },
        topicType: 'STANDARD'
    }),
    
    tip: (tip: string, location: string): GMBPost => ({
        languageCode: 'sr',
        summary: `💡 Savjet stručnjaka iz KamenPro ${location}:\n\n${tip}\n\n🏗️ Za personalizirane savjete, posjetite naš showroom ili nas kontaktirajte!\n\n#StručniSavjeti #DekorativniKamen #KamenPro`,
        callToAction: {
            actionType: 'LEARN_MORE',
            url: `https://kamenpro.net/lokacije/${location.toLowerCase()}`
        },
        topicType: 'STANDARD'
    })
};

// Export singleton instance
export const gmbService = GMBService.getInstance();