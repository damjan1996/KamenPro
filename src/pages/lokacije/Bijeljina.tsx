// src/pages/lokacije/Bijeljina.tsx - Local Landing Page für Bijeljina
import { Seo } from "../../components/Seo";
import BreadcrumbSchema from "../../components/schemas/BreadcrumbSchema";
import { LocalBusinessHero } from "./components/LocalBusinessHero";
import { LocalServices } from "./components/LocalServices";
import { LocalTestimonials } from "./components/LocalTestimonials";
import { LocalContact } from "./components/LocalContact";
import { LocalProjects } from "./components/LocalProjects";
import { LocalFAQ } from "./components/LocalFAQ";

export default function Bijeljina() {
    const cityData = {
        name: "Bijeljina",
        region: "Republika Srpska",
        description: "Naš glavni centar sa kompletnim uslugama montaže i dostave",
        coordinates: { lat: 44.758885, lng: 19.214172 },
        address: "Bulevar Kralja Petra I Karađorđevića 108",
        phone: "+387 65 678 634",
        email: "bijeljina@kamenpro.net",
        workingHours: {
            weekdays: "08:00 - 17:00",
            saturday: "08:00 - 14:00",
            sunday: "Zatvoreno"
        },
        services: [
            "Proizvodnja kamenih obloga",
            "Stručna montaža",
            "Besplatna dostava u krugu od 30km",
            "Tehnička podrška",
            "Konsultacije na licu mesta"
        ],
        specialties: [
            "Glavni proizvodni centar",
            "Najveći asortiman proizvoda",
            "Najbrža isporuka",
            "Direktan kontakt sa proizvođačem"
        ]
    };

    return (
        <>
            <Seo
                title={`Kamene obloge Bijeljina - KamenPro glavno sedište`}
                description={`KamenPro Bijeljina - Proizvođač kvalitetnih kamenih obloga u Bijeljini. Stručna montaža, besplatna dostava, 6+ godina iskustva. ☎ ${cityData.phone}`}
                canonical={`/lokacije/bijeljina`}
                keywords="kamene obloge bijeljina, dekorativni kamen bijeljina, zidne obloge bijeljina, montaža kamena bijeljina, kamenpro bijeljina, republika srpska"
                schemaType="LocalBusiness"
                schemaData={{
                    "@type": "LocalBusiness",
                    "name": "KamenPro Bijeljina",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": cityData.address,
                        "addressLocality": cityData.name,
                        "addressRegion": cityData.region,
                        "postalCode": "76300",
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
                        "Mo-Fr 08:00-17:00",
                        "Sa 08:00-14:00"
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
                    { name: "Bijeljina", url: "/lokacije/bijeljina" }
                ]}
            />

            <LocalBusinessHero
                city={cityData.name}
                region={cityData.region}
                description={cityData.description}
                backgroundImage="/images/lokacije/bijeljina-hero.jpg"
                phone={cityData.phone}
                address={cityData.address}
                isMainLocation={true}
            />

            <LocalServices
                city={cityData.name}
                services={cityData.services}
                specialties={cityData.specialties}
                deliveryRadius="30km"
                responseTime="24h"
            />

            <LocalProjects
                city={cityData.name}
                projects={[
                    {
                        name: "Stambena zgrada - Centar Bijeljine",
                        description: "Kompletna fasada sa dolomit oblogama",
                        image: "/images/projekti/bijeljina-stambena.jpg",
                        year: "2024"
                    },
                    {
                        name: "Poslovni objekat - Trgovački centar",
                        description: "Rustik cigla za topliji ambijent",
                        image: "/images/projekti/bijeljina-poslovni.jpg", 
                        year: "2023"
                    },
                    {
                        name: "Privatna kuća - Nova Varoš",
                        description: "Kombinacija kamena i cigle",
                        image: "/images/projekti/bijeljina-kuca.jpg",
                        year: "2024"
                    }
                ]}
            />

            <LocalTestimonials
                city={cityData.name}
                testimonials={[
                    {
                        name: "Marko Petrović",
                        location: "Centar Bijeljine",
                        text: "Odlična usluga od početka do kraja. Montaža je bila brza i profesionalna, rezultat je fantastičan!",
                        rating: 5,
                        project: "Fasada stambene zgrade"
                    },
                    {
                        name: "Ana Nikolić",
                        location: "Nova Varoš",
                        text: "KamenPro je naš lokalni izbor broj 1. Kvalitet proizvoda je izuzetan, a cene vrlo povoljne.",
                        rating: 5,
                        project: "Enterijer dnevne sobe"
                    },
                    {
                        name: "Stefan Jovanović",
                        location: "Dvorovi",
                        text: "Preporučujem svima iz Bijeljine. Lokalna firma koja stvarno zna svoj posao.",
                        rating: 5,
                        project: "Kamene obloge za terasu"
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
                mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.8234567890123!2d19.214172!3d44.758885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQ1JzMyLjAiTiAxOcKwMTInNTEuMCJF!5e0!3m2!1sen!2sba!4v1234567890123"
            />

            <LocalFAQ
                city={cityData.name}
                faqs={[
                    {
                        question: "Da li vršite dostavu u Bijeljini?",
                        answer: "Da, vršimo besplatnu dostavu u celoj Bijeljini i okolini u krugu od 30km. Dostava se obavlja našim vozilima uz prethodnu najavu."
                    },
                    {
                        question: "Kakvo je radno vreme u Bijeljini?",
                        answer: "Radimo od ponedeljka do petka od 08:00 do 17:00, subotom od 08:00 do 14:00. Nedeljom smo zatvoreni."
                    },
                    {
                        question: "Da li imate izložbeni prostor u Bijeljini?",
                        answer: "Da, imamo izložbeni prostor na adresi Bulevar Kralja Petra I Karađorđevića 108 gde možete videti sve naše proizvode uživo."
                    },
                    {
                        question: "Koliko traje montaža u Bijeljini?",
                        answer: "Za objekte u Bijeljini, montaža se obično završava u roku od 1-3 dana, zavisno od veličine projekta. Pružamo i ekspresnu uslugu."
                    },
                    {
                        question: "Da li radite sa arhitektima i građevinskim firmama iz Bijeljine?",
                        answer: "Apsolutno! Imamo dugogodišnju saradnju sa mnogim arhitektama i građevinskim firmama iz Bijeljine. Nudimo specijalne uslove za B2B klijente."
                    }
                ]}
            />
        </>
    );
}