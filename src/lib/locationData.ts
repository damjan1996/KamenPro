export interface LocationData {
    city: string;
    cityGenitive: string;
    citySlug: string;
    seoTitle: string;
    metaDescription: string;
    keywords: string[];
    coordinates: { lat: number; lng: number };
    content: {
        localInfo: string;
        deliveryArea: string;
        localProjects: string[];
        testimonials?: {
            name: string;
            text: string;
            rating: number;
            project?: string;
        }[];
    };
    contactInfo: {
        phone: string;
        email: string;
        workingHours: {
            weekdays: string;
            saturday: string;
            sunday: string;
        };
    };
}

export const locations: Record<string, LocationData> = {
    bijeljina: {
        city: 'Bijeljina',
        cityGenitive: 'Bijeljini',
        citySlug: 'bijeljina',
        seoTitle: 'Dekorativni Kamen Bijeljina | Zidne Obloge | KamenPro',
        metaDescription: 'Kupiti dekorativni kamen u Bijeljini. Profesionalne dekorativne zidne obloge sa besplatnom dostavom i montažom. Kontaktirajte KamenPro danas!',
        keywords: [
            'Dekorativni Kamen Bijeljina',
            'Dekorativne zidne obloge Bijeljina',
            'Kupiti dekorativni kamen Bijeljina',
            'Kupiti dekorativni kamen u Bijeljini',
            'kamene obloge bijeljina',
            'prirodni kamen bijeljina',
            'fasadni kamen bijeljina',
            'zidne obloge bijeljina'
        ],
        coordinates: { lat: 44.7619, lng: 19.2144 },
        content: {
            localInfo: 'KamenPro Bijeljina je vaš pouzdani partner za dekorativni kamen već preko 10 godina. Specijalizovani smo za kvalitetne prirodne i umjetne kamene obloge koje transformišu svaki prostor. Naš tim stručnjaka pruža kompletnu uslugu od savjetovanja do profesionalne montaže.',
            deliveryArea: 'Bijeljina, Janja, Dvorovi, Patkovača, Velika Obarska, Brodac, Dragaljevac, Amajlije',
            localProjects: [
                'Hotel Drina - renovacija fasade sa prirodnim kamenom',
                'Stambeni kompleks Centar - dekorativni kamen u 15 stanova',
                'Privatne kuće u naselju Ljednica - preko 20 objekata',
                'Restoran Kod Muje - unutrašnja dekoracija kamenom',
                'Poslovni centar Semberija - vanjska fasada'
            ],
            testimonials: [
                {
                    name: 'Marko Pavlović',
                    text: 'Odličan kvalitet kamena i profesionalna montaža. KamenPro je transformisao našu kuću!',
                    rating: 5,
                    project: 'Privatna kuća, Ljednica'
                },
                {
                    name: 'Ana Milošević',
                    text: 'Najbolji izbor dekorativnog kamena u Bijeljini. Preporučujem svima!',
                    rating: 5,
                    project: 'Stan u centru grada'
                }
            ]
        },
        contactInfo: {
            phone: '+387 65 678 634',
            email: 'bijeljina@kamenpro.net',
            workingHours: {
                weekdays: '08:00 - 17:00',
                saturday: '08:00 - 14:00',
                sunday: 'Zatvoreno'
            }
        }
    },
    brcko: {
        city: 'Brčko',
        cityGenitive: 'Brčkom',
        citySlug: 'brcko',
        seoTitle: 'Dekorativni Kamen Brčko | Zidne Obloge | KamenPro',
        metaDescription: 'Kupiti dekorativni kamen u Brčkom. Vrhunske dekorativne zidne obloge za vaš dom ili poslovni prostor. Besplatna procjena projekta.',
        keywords: [
            'Dekorativni Kamen Brčko',
            'Dekorativne zidne obloge Brčko',
            'Kupiti dekorativni kamen Brčko',
            'Kupiti dekorativni kamen u Brčkom',
            'kamene obloge brčko distrikt',
            'prirodni kamen brčko',
            'fasadni kamen brčko',
            'zidne obloge brčko distrikt'
        ],
        coordinates: { lat: 44.8694, lng: 18.8081 },
        content: {
            localInfo: 'KamenPro Brčko nudi najširi asortiman dekorativnog kamena u Brčko Distriktu. Sa preko 50 različitih modela i boja, garantujemo da ćete pronaći savršeno rješenje za vaš prostor. Naš showroom je opremljen sa najnovijim kolekcijama.',
            deliveryArea: 'Brčko Distrikt, Gornji Rahić, Donji Rahić, Brezovo Polje, Grbavica, Bijela, Čelić',
            localProjects: [
                'Arizona Market - vanjska obloga poslovnih objekata',
                'Gradska vijećnica - renovacija fasade',
                'Novi stambeni blokovi - dekorativni kamen u 30+ stanova',
                'Hotel Jelena - kompletna renovacija enterijera',
                'Sportska dvorana - dekorativne zidne obloge'
            ],
            testimonials: [
                {
                    name: 'Milan Simić',
                    text: 'Profesionalna usluga i vrhunski kvalitet. KamenPro je naš prvi izbor!',
                    rating: 5,
                    project: 'Poslovni prostor, Arizona'
                },
                {
                    name: 'Jelena Kostić',
                    text: 'Fantastičan izbor i povoljne cijene. Vrlo sam zadovoljna!',
                    rating: 5,
                    project: 'Kuća u Gornjem Rahiću'
                }
            ]
        },
        contactInfo: {
            phone: '+387 65 678 634',
            email: 'brcko@kamenpro.net',
            workingHours: {
                weekdays: '08:00 - 17:00',
                saturday: '08:00 - 14:00',
                sunday: 'Zatvoreno'
            }
        }
    },
    tuzla: {
        city: 'Tuzla',
        cityGenitive: 'Tuzli',
        citySlug: 'tuzla',
        seoTitle: 'Dekorativni Kamen Tuzla | Zidne Obloge | KamenPro',
        metaDescription: 'Kupiti dekorativni kamen u Tuzli. Kvalitetne dekorativne zidne obloge sa garancijom. Pogledajte našu ponudu i kontaktirajte nas.',
        keywords: [
            'Dekorativni Kamen Tuzla',
            'Dekorativne zidne obloge Tuzla',
            'Kupiti dekorativni kamen Tuzla',
            'Kupiti dekorativni kamen u Tuzli',
            'kamene obloge tuzlanski kanton',
            'prirodni kamen tuzla',
            'fasadni kamen tuzla',
            'zidne obloge tuzla'
        ],
        coordinates: { lat: 44.5382, lng: 18.6734 },
        content: {
            localInfo: 'KamenPro je vodeći dobavljač dekorativnog kamena u Tuzlanskom kantonu. Naša misija je pružiti vrhunske proizvode i usluge koji će uljepšati vaš dom ili poslovni prostor. Sa timom od preko 15 stručnjaka, garantujemo profesionalnu uslugu.',
            deliveryArea: 'Tuzla, Lukavac, Gračanica, Srebrenik, Živinice, Banovići, Kalesija, Sapna',
            localProjects: [
                'BKC Tuzla - fasadni kamen na poslovnoj zgradi',
                'Hotel Mellain - unutrašnja dekoracija restorana',
                'Stambeno naselje Stupine - preko 40 privatnih kuća',
                'TC Bingo - renovacija ulaza',
                'Univerzitet u Tuzli - dekorativne obloge u novom krilu'
            ],
            testimonials: [
                {
                    name: 'Amir Hasanović',
                    text: 'Izvrsna saradnja sa KamenPro timom. Preporučujem svima u Tuzli!',
                    rating: 5,
                    project: 'Kuća u Stupinama'
                },
                {
                    name: 'Selma Begić',
                    text: 'Kvalitet i cijene su neprikosnoveni. Vrlo profesionalan pristup!',
                    rating: 5,
                    project: 'Stan u centru Tuzle'
                }
            ]
        },
        contactInfo: {
            phone: '+387 65 678 634',
            email: 'tuzla@kamenpro.net',
            workingHours: {
                weekdays: '08:00 - 17:00',
                saturday: '08:00 - 14:00',
                sunday: 'Zatvoreno'
            }
        }
    }
};

export function getLocationBySlug(slug: string): LocationData | undefined {
    return locations[slug];
}

export function getAllLocationSlugs(): string[] {
    return Object.keys(locations);
}

export function getAllLocations(): LocationData[] {
    return Object.values(locations);
}