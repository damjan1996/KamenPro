import React, { useState, useEffect } from 'react';
import { gmbService, GMBReview } from '../../lib/gmbIntegration';
import { analytics } from '../../lib/analytics';

interface GMBWidgetProps {
    locationSlug: string;
    showReviews?: boolean;
    showActions?: boolean;
    compact?: boolean;
}

export default function GMBWidget({ 
    locationSlug, 
    showReviews = true, 
    showActions = true, 
    compact = false 
}: GMBWidgetProps) {
    const [reviews, setReviews] = useState<GMBReview[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showReviews) {
            loadReviews();
        }
    }, [locationSlug, showReviews]);

    const loadReviews = async () => {
        setLoading(true);
        try {
            const reviewData = await gmbService.getReviews(locationSlug);
            setReviews(reviewData.slice(0, compact ? 2 : 3)); // Show limited reviews
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
        setLoading(false);
    };

    const handleGMBAction = (action: 'call' | 'directions' | 'website' | 'reviews') => {
        analytics.trackGMBInteraction(locationSlug, action);
        
        switch (action) {
            case 'call':
                window.open('tel:+38765678634');
                break;
            case 'directions':
                const location = getLocationCoordinates(locationSlug);
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${location}`);
                break;
            case 'website':
                window.open(`https://kamenpro.net/lokacije/${locationSlug}`);
                break;
            case 'reviews':
                window.open(getGMBUrl(locationSlug));
                break;
        }
    };

    const getLocationCoordinates = (slug: string): string => {
        switch (slug) {
            case 'bijeljina': return '44.7619,19.2144';
            case 'brcko': return '44.8694,18.8081';
            case 'tuzla': return '44.5382,18.6734';
            default: return '44.0000,18.0000';
        }
    };

    const getGMBUrl = (slug: string): string => {
        // In real implementation, these would be actual GMB URLs
        const baseUrl = 'https://www.google.com/maps/search/KamenPro+';
        switch (slug) {
            case 'bijeljina': return `${baseUrl}Bijeljina`;
            case 'brcko': return `${baseUrl}Brčko`;
            case 'tuzla': return `${baseUrl}Tuzla`;
            default: return baseUrl;
        }
    };

    const getLocationName = (slug: string): string => {
        switch (slug) {
            case 'bijeljina': return 'Bijeljina';
            case 'brcko': return 'Brčko';
            case 'tuzla': return 'Tuzla';
            default: return slug;
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${compact ? 'p-4' : 'p-6'}`}>
            {/* GMB Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            KamenPro {getLocationName(locationSlug)}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="flex items-center mr-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-4 h-4 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-1">4.9 (124 recenzije)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button
                    onClick={() => handleGMBAction('reviews')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    Vidi na Google Maps
                </button>
            </div>

            {/* GMB Actions */}
            {showActions && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <button
                        onClick={() => handleGMBAction('call')}
                        className="flex flex-col items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6 text-green-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-xs font-medium text-green-600">Pozovi</span>
                    </button>
                    
                    <button
                        onClick={() => handleGMBAction('directions')}
                        className="flex flex-col items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6 text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span className="text-xs font-medium text-blue-600">Pravac</span>
                    </button>
                    
                    <button
                        onClick={() => handleGMBAction('website')}
                        className="flex flex-col items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6 text-purple-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                        </svg>
                        <span className="text-xs font-medium text-purple-600">Website</span>
                    </button>
                    
                    <button
                        onClick={() => handleGMBAction('reviews')}
                        className="flex flex-col items-center p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6 text-yellow-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="text-xs font-medium text-yellow-600">Recenzije</span>
                    </button>
                </div>
            )}

            {/* Recent Reviews */}
            {showReviews && (
                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Nedavne Recenzije</h4>
                    
                    {loading ? (
                        <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        </div>
                    ) : reviews.length > 0 ? (
                        <div className="space-y-3">
                            {reviews.map((review, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center">
                                            <img
                                                src={review.reviewer.profilePhotoUrl}
                                                alt={review.reviewer.displayName}
                                                className="w-8 h-8 rounded-full mr-2"
                                            />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {review.reviewer.displayName}
                                                </div>
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-3 h-3 ${i < review.starRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(review.createTime).toLocaleDateString('sr-Latn-RS')}
                                        </div>
                                    </div>
                                    
                                    {review.comment && (
                                        <p className="text-sm text-gray-700 line-clamp-2">
                                            {review.comment}
                                        </p>
                                    )}
                                </div>
                            ))}
                            
                            <button
                                onClick={() => handleGMBAction('reviews')}
                                className="w-full text-center py-2 text-blue-600 hover:text-blue-800 text-sm font-medium border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
                            >
                                Vidi sve recenzije
                            </button>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-sm text-center py-4">
                            Nema recenzija za prikaz.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}