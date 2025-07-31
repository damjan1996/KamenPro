import React, { useState, useEffect } from 'react';
import { getAllLocations } from '../../lib/locationData';

interface SEOMetrics {
    location: string;
    organicTraffic: number;
    organicTrafficChange: number;
    keywordRankings: {
        keyword: string;
        position: number;
        change: number;
        searchVolume: number;
    }[];
    gmbMetrics: {
        views: number;
        searches: number;
        actions: number;
        callClicks: number;
        directionRequests: number;
    };
    webVitals: {
        lcp: number;
        fid: number;
        cls: number;
        fcp: number;
        ttfb: number;
    };
    conversions: {
        leads: number;
        phoneRequests: number;
        quotes: number;
    };
}

interface SEODashboardProps {
    metrics?: SEOMetrics[];
    isLoading?: boolean;
}

export default function SEODashboard({ metrics = [], isLoading = false }: SEODashboardProps) {
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
    const locations = getAllLocations();

    // Mock data for demonstration
    const mockMetrics: SEOMetrics[] = [
        {
            location: 'Bijeljina',
            organicTraffic: 1250,
            organicTrafficChange: 23.5,
            keywordRankings: [
                { keyword: 'dekorativni kamen bijeljina', position: 2, change: 1, searchVolume: 320 },
                { keyword: 'kamene obloge bijeljina', position: 3, change: -1, searchVolume: 210 },
                { keyword: 'zidne obloge bijeljina', position: 1, change: 2, searchVolume: 180 },
                { keyword: 'prirodni kamen bijeljina', position: 4, change: 0, searchVolume: 150 }
            ],
            gmbMetrics: {
                views: 3420,
                searches: 890,
                actions: 234,
                callClicks: 89,
                directionRequests: 145
            },
            webVitals: {
                lcp: 2.1,
                fid: 85,
                cls: 0.08,
                fcp: 1.4,
                ttfb: 650
            },
            conversions: {
                leads: 45,
                phoneRequests: 28,
                quotes: 17
            }
        },
        {
            location: 'Brčko',
            organicTraffic: 890,
            organicTrafficChange: 18.2,
            keywordRankings: [
                { keyword: 'dekorativni kamen brčko', position: 1, change: 0, searchVolume: 180 },
                { keyword: 'kamene obloge brčko', position: 2, change: 1, searchVolume: 140 },
                { keyword: 'zidne obloge brčko', position: 5, change: -2, searchVolume: 95 },
                { keyword: 'prirodni kamen brčko', position: 3, change: 1, searchVolume: 110 }
            ],
            gmbMetrics: {
                views: 2100,
                searches: 550,
                actions: 145,
                callClicks: 52,
                directionRequests: 93
            },
            webVitals: {
                lcp: 2.3,
                fid: 92,
                cls: 0.09,
                fcp: 1.6,
                ttfb: 720
            },
            conversions: {
                leads: 32,
                phoneRequests: 19,
                quotes: 13
            }
        },
        {
            location: 'Tuzla',
            organicTraffic: 1580,
            organicTrafficChange: 31.7,
            keywordRankings: [
                { keyword: 'dekorativni kamen tuzla', position: 1, change: 0, searchVolume: 410 },
                { keyword: 'kamene obloge tuzla', position: 1, change: 0, searchVolume: 280 },
                { keyword: 'zidne obloge tuzla', position: 2, change: 1, searchVolume: 220 },
                { keyword: 'prirodni kamen tuzla', position: 2, change: 0, searchVolume: 195 }
            ],
            gmbMetrics: {
                views: 4200,
                searches: 1100,
                actions: 310,
                callClicks: 125,
                directionRequests: 185
            },
            webVitals: {
                lcp: 1.9,
                fid: 78,
                cls: 0.06,
                fcp: 1.2,
                ttfb: 580
            },
            conversions: {
                leads: 67,
                phoneRequests: 41,
                quotes: 26
            }
        }
    ];

    const displayMetrics = metrics.length > 0 ? metrics : mockMetrics;
    const filteredMetrics = selectedLocation === 'all' 
        ? displayMetrics 
        : displayMetrics.filter(m => m.location.toLowerCase() === selectedLocation);

    const getWebVitalRating = (metric: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
        switch (metric) {
            case 'lcp':
                return value <= 2.5 ? 'good' : value <= 4.0 ? 'needs-improvement' : 'poor';
            case 'fid':
                return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
            case 'cls':
                return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
            case 'fcp':
                return value <= 1.8 ? 'good' : value <= 3.0 ? 'needs-improvement' : 'poor';
            case 'ttfb':
                return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
            default:
                return 'good';
        }
    };

    const getRatingColor = (rating: string): string => {
        switch (rating) {
            case 'good': return 'text-green-600';
            case 'needs-improvement': return 'text-yellow-600';
            case 'poor': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const totalTraffic = displayMetrics.reduce((sum, m) => sum + m.organicTraffic, 0);
    const totalLeads = displayMetrics.reduce((sum, m) => sum + m.conversions.leads, 0);
    const avgTrafficChange = displayMetrics.reduce((sum, m) => sum + m.organicTrafficChange, 0) / displayMetrics.length;

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">SEO Performance Dashboard</h1>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="all">Sve lokacije</option>
                        {locations.map(location => (
                            <option key={location.citySlug} value={location.citySlug}>
                                {location.city}
                            </option>
                        ))}
                    </select>
                    
                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value as '7d' | '30d' | '90d')}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="7d">Poslednih 7 dana</option>
                        <option value="30d">Poslednih 30 dana</option>
                        <option value="90d">Poslednja 3 meseca</option>
                    </select>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Ukupan Organski Saobraćaj</h3>
                        <div className="text-3xl font-bold text-blue-600">{totalTraffic.toLocaleString()}</div>
                        <div className={`text-sm ${avgTrafficChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {avgTrafficChange >= 0 ? '↗' : '↘'} {Math.abs(avgTrafficChange).toFixed(1)}%
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Ukupni Leads</h3>
                        <div className="text-3xl font-bold text-green-600">{totalLeads}</div>
                        <div className="text-sm text-gray-500">Iz organskog saobraćaja</div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Prosečna Pozicija</h3>
                        <div className="text-3xl font-bold text-purple-600">2.1</div>
                        <div className="text-sm text-green-600">↗ +0.3 pozicije</div>
                    </div>
                </div>
            </div>

            {/* Location-specific metrics */}
            {filteredMetrics.map((locationMetric, index) => (
                <div key={locationMetric.location} className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{locationMetric.location}</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Keyword Rankings */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Pozicije Ključnih Reči</h3>
                            <div className="space-y-3">
                                {locationMetric.keywordRankings.map((kw, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                        <div>
                                            <div className="font-medium text-gray-900">{kw.keyword}</div>
                                            <div className="text-sm text-gray-500">Volume: {kw.searchVolume}/měsíc</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-blue-600">#{kw.position}</div>
                                            <div className={`text-sm ${kw.change > 0 ? 'text-green-600' : kw.change < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                                                {kw.change > 0 ? '↗' : kw.change < 0 ? '↘' : '→'} {Math.abs(kw.change)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* GMB Metrics */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Google My Business</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-blue-50 rounded">
                                    <div className="text-2xl font-bold text-blue-600">{locationMetric.gmbMetrics.views.toLocaleString()}</div>
                                    <div className="text-sm text-gray-600">Pregledi</div>
                                </div>
                                <div className="text-center p-3 bg-green-50 rounded">
                                    <div className="text-2xl font-bold text-green-600">{locationMetric.gmbMetrics.searches.toLocaleString()}</div>
                                    <div className="text-sm text-gray-600">Pretrage</div>
                                </div>
                                <div className="text-center p-3 bg-yellow-50 rounded">
                                    <div className="text-2xl font-bold text-yellow-600">{locationMetric.gmbMetrics.callClicks}</div>
                                    <div className="text-sm text-gray-600">Pozivi</div>
                                </div>
                                <div className="text-center p-3 bg-purple-50 rounded">
                                    <div className="text-2xl font-bold text-purple-600">{locationMetric.gmbMetrics.directionRequests}</div>
                                    <div className="text-sm text-gray-600">Pravci</div>
                                </div>
                            </div>
                        </div>

                        {/* Web Vitals */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Core Web Vitals</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span>LCP (Largest Contentful Paint)</span>
                                    <span className={`font-bold ${getRatingColor(getWebVitalRating('lcp', locationMetric.webVitals.lcp))}`}>
                                        {locationMetric.webVitals.lcp}s
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>FID (First Input Delay)</span>
                                    <span className={`font-bold ${getRatingColor(getWebVitalRating('fid', locationMetric.webVitals.fid))}`}>
                                        {locationMetric.webVitals.fid}ms
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>CLS (Cumulative Layout Shift)</span>
                                    <span className={`font-bold ${getRatingColor(getWebVitalRating('cls', locationMetric.webVitals.cls))}`}>
                                        {locationMetric.webVitals.cls}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>FCP (First Contentful Paint)</span>
                                    <span className={`font-bold ${getRatingColor(getWebVitalRating('fcp', locationMetric.webVitals.fcp))}`}>
                                        {locationMetric.webVitals.fcp}s
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>TTFB (Time to First Byte)</span>
                                    <span className={`font-bold ${getRatingColor(getWebVitalRating('ttfb', locationMetric.webVitals.ttfb))}`}>
                                        {locationMetric.webVitals.ttfb}ms
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Conversions */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Konverzije</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-green-50 rounded">
                                    <div className="text-2xl font-bold text-green-600">{locationMetric.conversions.leads}</div>
                                    <div className="text-sm text-gray-600">Leads</div>
                                </div>
                                <div className="text-center p-3 bg-blue-50 rounded">
                                    <div className="text-2xl font-bold text-blue-600">{locationMetric.conversions.phoneRequests}</div>
                                    <div className="text-sm text-gray-600">Pozivi</div>
                                </div>
                                <div className="text-center p-3 bg-purple-50 rounded">
                                    <div className="text-2xl font-bold text-purple-600">{locationMetric.conversions.quotes}</div>
                                    <div className="text-sm text-gray-600">Ponude</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}