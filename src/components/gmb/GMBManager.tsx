import React, { useState, useEffect } from 'react';
import { gmbService, GMBPost, GMBReview, GMBInsights, GMB_POST_TEMPLATES } from '../../lib/gmbIntegration';
import { getAllLocations } from '../../lib/locationData';

interface GMBManagerProps {
    isAdmin?: boolean;
}

export default function GMBManager({ isAdmin = false }: GMBManagerProps) {
    const [selectedLocation, setSelectedLocation] = useState<string>('bijeljina');
    const [activeTab, setActiveTab] = useState<'posts' | 'reviews' | 'insights'>('posts');
    const [reviews, setReviews] = useState<GMBReview[]>([]);
    const [insights, setInsights] = useState<GMBInsights | null>(null);
    const [loading, setLoading] = useState(false);
    const [newPost, setNewPost] = useState<Partial<GMBPost>>({
        languageCode: 'sr',
        topicType: 'STANDARD'
    });

    const locations = getAllLocations();

    useEffect(() => {
        loadData();
    }, [selectedLocation, activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'reviews') {
                const reviewData = await gmbService.getReviews(selectedLocation);
                setReviews(reviewData);
            } else if (activeTab === 'insights') {
                const endDate = new Date().toISOString().split('T')[0];
                const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                const insightData = await gmbService.getInsights(selectedLocation, startDate, endDate);
                setInsights(insightData);
            }
        } catch (error) {
            console.error('Error loading GMB data:', error);
        }
        setLoading(false);
    };

    const handleCreatePost = async () => {
        if (!newPost.summary) return;

        try {
            await gmbService.createPost(selectedLocation, newPost as GMBPost);
            setNewPost({ languageCode: 'sr', topicType: 'STANDARD' });
            alert('Post je uspješno kreiran!');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Greška pri kreiranju posta.');
        }
    };

    const useTemplate = (templateType: keyof typeof GMB_POST_TEMPLATES, ...args: string[]) => {
        const template = GMB_POST_TEMPLATES[templateType](...args, selectedLocation);
        setNewPost(template);
    };

    const formatMetricName = (metricType: string): string => {
        switch (metricType) {
            case 'QUERIES_DIRECT': return 'Direktne Pretrage';
            case 'QUERIES_INDIRECT': return 'Indirektne Pretrage';
            case 'VIEWS_MAPS': return 'Pregledi na Mapama';
            case 'VIEWS_SEARCH': return 'Pregledi u Pretrazi';
            case 'ACTIONS_WEBSITE': return 'Klikovi na Website';
            case 'ACTIONS_PHONE': return 'Pozivi';
            case 'ACTIONS_DRIVING_DIRECTIONS': return 'Zahtjevi za Pravac';
            default: return metricType;
        }
    };

    const getLocationName = (slug: string): string => {
        return locations.find(loc => loc.citySlug === slug)?.city || slug;
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Google My Business Manager
                </h1>
                
                {/* Location Selector */}
                <div className="flex items-center gap-4 mb-6">
                    <label className="font-medium text-gray-700">Lokacija:</label>
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    >
                        {locations.map(location => (
                            <option key={location.citySlug} value={location.citySlug}>
                                {location.city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {['posts', 'reviews', 'insights'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab === 'posts' ? 'Objave' : tab === 'reviews' ? 'Recenzije' : 'Statistike'}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
                <div className="space-y-6">
                    {isAdmin && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">Kreiraj Novu Objavu</h2>
                            
                            {/* Quick Templates */}
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Brzi Predlošci:</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => useTemplate('newProduct', 'Travertin')}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
                                    >
                                        Novi Proizvod
                                    </button>
                                    <button
                                        onClick={() => useTemplate('promotion', '15%')}
                                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200"
                                    >
                                        Akcija
                                    </button>
                                    <button
                                        onClick={() => useTemplate('projectShowcase', 'Hotel Elegance')}
                                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200"
                                    >
                                        Projekat
                                    </button>
                                    <button
                                        onClick={() => useTemplate('tip', 'Odaberite kamen koji se slaže sa bojom vaših namještaja za harmoničan izgled prostora.')}
                                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm hover:bg-yellow-200"
                                    >
                                        Savjet
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tip Objave
                                    </label>
                                    <select
                                        value={newPost.topicType}
                                        onChange={(e) => setNewPost({...newPost, topicType: e.target.value as any})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="STANDARD">Standardna</option>
                                        <option value="EVENT">Događaj</option>
                                        <option value="OFFER">Ponuda</option>
                                        <option value="ALERT">Obavještenje</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sadržaj Objave (maksimalno 1500 karaktera)
                                    </label>
                                    <textarea
                                        value={newPost.summary || ''}
                                        onChange={(e) => setNewPost({...newPost, summary: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                                        placeholder="Napišite sadržaj vaše GMB objave..."
                                        maxLength={1500}
                                    />
                                    <div className="text-sm text-gray-500 mt-1">
                                        {(newPost.summary || '').length}/1500 karaktera
                                    </div>
                                </div>

                                {newPost.topicType === 'OFFER' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Uslovi Ponude
                                        </label>
                                        <input
                                            type="text"
                                            value={newPost.offer?.termsConditions || ''}
                                            onChange={(e) => setNewPost({
                                                ...newPost,
                                                offer: { ...newPost.offer, termsConditions: e.target.value }
                                            })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            placeholder="Uslovi i ograničenja ponude..."
                                        />
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleCreatePost}
                                        disabled={!newPost.summary}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Objavi
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">
                            Nedavne Objave - {getLocationName(selectedLocation)}
                        </h3>
                        <div className="text-gray-500">
                            Objave se učitavaju iz GMB API-ja...
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">
                            Recenzije - {getLocationName(selectedLocation)}
                        </h3>
                        
                        {reviews.length > 0 ? (
                            <div className="space-y-4">
                                {reviews.map((review, index) => (
                                    <div key={index} className="border-b border-gray-200 pb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center">
                                                <img
                                                    src={review.reviewer.profilePhotoUrl}
                                                    alt={review.reviewer.displayName}
                                                    className="w-10 h-10 rounded-full mr-3"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {review.reviewer.displayName}
                                                    </div>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-4 h-4 ${i < review.starRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                        <span className="text-sm text-gray-500 ml-2">
                                                            {new Date(review.createTime).toLocaleDateString('sr-Latn-RS')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {review.comment && (
                                            <p className="text-gray-700 mb-3">{review.comment}</p>
                                        )}
                                        
                                        {review.reviewReply ? (
                                            <div className="bg-gray-50 p-3 rounded-md ml-8">
                                                <div className="text-sm font-medium text-gray-900 mb-1">
                                                    Odgovor od KamenPro
                                                </div>
                                                <p className="text-sm text-gray-700">{review.reviewReply.comment}</p>
                                            </div>
                                        ) : isAdmin && (
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-8">
                                                Odgovori na recenziju
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-500">Nema recenzija za prikaz.</div>
                        )}
                    </div>
                </div>
            )}

            {/* Insights Tab */}
            {activeTab === 'insights' && insights && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">
                            Statistike - {getLocationName(selectedLocation)} (Poslednih 30 dana)
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {insights.locationMetrics.map((metric, index) => (
                                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">
                                        {metric.totalValue.value.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {formatMetricName(metric.metricType)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}