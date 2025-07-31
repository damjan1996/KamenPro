// src/pages/lokacije/Tuzla.tsx - Local Landing Page für Tuzla
import { Seo } from "../../components/Seo";
import BreadcrumbSchema from "../../components/schemas/BreadcrumbSchema";
import { LocalBusinessHero } from "./components/LocalBusinessHero";
import { LocalServices } from "./components/LocalServices";
import { LocalTestimonials } from "./components/LocalTestimonials";
import { LocalContact } from "./components/LocalContact";
import { LocalProjects } from "./components/LocalProjects";
import { LocalFAQ } from "./components/LocalFAQ";

export default function Tuzla() {
    const cityData = {
        name: "Tuzla",
        region: "Tuzlanski kanton",
        description: "Kvalitetne kamene obloge za Tuzlu i okolinu",
        coordinates: { lat: 44.538889, lng: 18.675000 },
        address: "Trg slobode bb", // Placeholder adresa
        phone: "+387 35 789 012", // Placeholder telefon
        email: "tuzla@kamenpro.net",
        workingHours: {
            weekdays: "08:00 - 16:00",
            saturday: "08:00 - 13:00",
            sunday: "Zatvoreno"
        },
        services: [
            "Montaža kamenih obloga",
            "Dostava za Tuzlanski kanton",
            "Tehnička podrška",
            "Besplatna procena",
            "Saveti za dizajn"
        ],
        specialties: [
            "Iskustvo u Federaciji BiH",
            "Poznavanje lokalnih uslova",
            "Saradnja sa arhitektima",
            "Kvalitetna usluga"
        ]
    };

    return (
        <>
            <Seo
                title={`Kamene obloge Tuzla - KamenPro stručna montaža`}
                description={`KamenPro Tuzla - Profesionalna montaža kamenih obloga u Tuzli i Tuzlanskom kantonu. Dostava, montaža, garancija. Pozovite: ${cityData.phone}`}
                canonical={`/lokacije/tuzla`}
                keywords="kamene obloge tuzla, dekorativni kamen tuzla, zidne obloge tuzlanski kanton, montaža kamena tuzla, kamenpro tuzla, federacija bih"
                schemaType="LocalBusiness"
                schemaData={{
                    "@type": "LocalBusiness",
                    "name": "KamenPro Tuzla",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": cityData.address,
                        "addressLocality": cityData.name,
                        "addressRegion": cityData.region,
                        "postalCode": "75000",
                        "addressCountry": "BA"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": cityData.coordinates.lat,
                        "longitude": cityData.coordinates.lng
                    },
                    "telephone": cityData.phone,
                    "email": cityData.email,
                    "openingHours": [
                        "Mo-Fr 08:00-16:00",
                        "Sa 08:00-13:00"
                    ],
                    "priceRange": "$$$",
                    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
                    "currenciesAccepted": "BAM"
                }}
            />
            
            <BreadcrumbSchema
                items={[
                    { name: "Početna", url: "/" },
                    { name: "Lokacije", url: "/lokacije" },
                    { name: "Tuzla", url: "/lokacije/tuzla" }
                ]}
            />

            <LocalBusinessHero
                city={cityData.name}
                region={cityData.region}
                description={cityData.description}
                backgroundImage="/images/lokacije/tuzla-hero.jpg"
                phone={cityData.phone}
                address={cityData.address}
                isMainLocation={false}
            />

            <LocalServices
                city={cityData.name}
                services={cityData.services}
                specialties={cityData.specialties}
                deliveryRadius="Tuzlanski kanton"
                responseTime="48h"
            />

            <LocalProjects
                city={cityData.name}
                projects={[
                    {
                        name: "Moderna kuća - Tuzla",
                        description: "Elegantna kombinacija kamena i cigle",
                        image: "/images/projekti/tuzla-moderna.jpg",
                        year: "2024"
                    },
                    {
                        name: "Poslovni kompleks - Simin Han",
                        description: "Reprezentativna fasada sa kamenim oblogama",
                        image: "/images/projekti/tuzla-kompleks.jpg",
                        year: "2023"
                    },
                    {
                        name: "Hotel - Centar Tuzle",
                        description: "Luksuzna kombinacija različitih materijala",
                        image: "/images/projekti/tuzla-hotel.jpg",
                        year: "2024"
                    }
                ]}
            />

            <LocalTestimonials
                city={cityData.name}
                testimonials={[
                    {
                        name: "Amira Hadžić",
                        location: "Centar Tuzle",
                        text: "Odličan kvalitet proizvoda i montaže. Preporučujem KamenPro svima u Tuzli!",
                        rating: 5,
                        project: "Enterijer stana"
                    },
                    {
                        name: "Emir Husić",
                        location: "Simin Han",
                        text: "Profesionalan pristup od početka do kraja. Rezultat je bolji nego što sam očekivao.",
                        rating: 5,
                        project: "Fasada poslovnog objekta"
                    },
                    {
                        name: "Lejla Begić",
                        location: "Kreka",
                        text: "Brzо i kvalitetno. Ekipa je bila vrlo ljubazna i stručna. Hvala na odličnoj usluzi!",
                        rating: 5,
                        project: "Kamene obloge u dvorištu"
                    }
                ]}
            />

            <LocalContact
                city={cityData.name}
                region={cityData.region}
                address={cityData.address}
                phone={cityData.phone}
                email={cityData.email}
                coordinates={cityData.coordinates}
                workingHours={cityData.workingHours}
                mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.9876543210987!2d18.675000!3d44.538889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDMyJzIwLjAiTiAxOMKwNDAnMzAuMCJF!5e0!3m2!1sen!2sba!4v1234567890125"
                additionalInfo="Pokrivamo celu Tuzlu i okolna mesta: Lukavac, Živinice, Kalesija, Gradačac i druga mesta u Tuzlanskom kantonu."
            />

            <LocalFAQ
                city={cityData.name}
                faqs={[
                    {
                        question: "Da li radite u Tuzlanskom kantonu?",
                        answer: "Da, radimo u celom Tuzlanskom kantonu uključujući Tuzlu, Lukavac, Živinice, Kalesiju, Gradačac i okolna mesta."
                    },
                    {
                        question: "Kako funkcioniše dostava u Tuzlu?",
                        answer: "Organizujemo redovnu dostavu iz našeg centra u Bijeljini. Za veće narudžbe (preko 30m²) dostava je besplatna."
                    },
                    {
                        question: "Da li imate iskustva sa projektima u Federaciji BiH?",
                        answer: "Da, imamo bogato iskustvo rada u Federaciji BiH i poznajemo sve potrebne propise i standarde."
                    },
                    {
                        question: "Koliko traje realizacija projekta u Tuzli?",
                        answer: "Realizacija zavisi od obima posla. Obično organizujemo montažu u periodu od 3-7 dana od potvrde narudžbe."
                    },
                    {
                        question: "Da li sarađujete sa lokalnim firmama u Tuzli?",
                        answer: "Da, imamo odličnu saradnju sa arhitektima, građevinskim firmama i dizajnerima iz Tuzle i okolnih mesta."
                    },
                    {
                        question: "Koje načine plaćanja prihvatate u Tuzli?",
                        answer: "Prihvatamo gotovinu, kartice, bankarske transfere i moguce su i obroci za veće projekte."
                    }
                ]}
            />
        </>
    );
}