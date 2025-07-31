// src/pages/lokacije/Brcko.tsx - Local Landing Page für Brčko
import { Seo } from "../../components/Seo";
import BreadcrumbSchema from "../../components/schemas/BreadcrumbSchema";
import { LocalBusinessHero } from "./components/LocalBusinessHero";
import { LocalServices } from "./components/LocalServices";
import { LocalTestimonials } from "./components/LocalTestimonials";
import { LocalContact } from "./components/LocalContact";
import { LocalProjects } from "./components/LocalProjects";
import { LocalFAQ } from "./components/LocalFAQ";

export default function Brcko() {
    const cityData = {
        name: "Brčko",
        region: "Brčko Distrikt",
        description: "Profesionalne usluge montaže kamenih obloga u Brčko Distriktu",
        coordinates: { lat: 44.869444, lng: 18.810556 },
        address: "Bulevar Mira bb", // Placeholder adresa
        phone: "+387 49 123 456", // Placeholder telefon
        email: "brcko@kamenpro.net",
        workingHours: {
            weekdays: "08:00 - 16:00",
            saturday: "08:00 - 13:00", 
            sunday: "Zatvoreno"
        },
        services: [
            "Montaža kamenih obloga",
            "Dostava iz Bijeljine",
            "Tehnička podrška",
            "Besplatna procena posla",
            "Održavanje postojećih obloga"
        ],
        specialties: [
            "Specijalizovani za Brčko Distrikt",
            "Poznavanje lokalnih propisa",
            "Brza dostava iz Bijeljine",
            "Lokalni partneri"
        ]
    };

    return (
        <>
            <Seo
                title={`Kamene obloge Brčko - KamenPro montaža i dostava`}
                description={`KamenPro Brčko - Stručna montaža kamenih obloga u Brčko Distriktu. Dostava iz Bijeljine, besplatna procena. Kvalitet i pouzdanost. ☎ ${cityData.phone}`}
                canonical={`/lokacije/brcko`}
                keywords="kamene obloge brčko, dekorativni kamen brčko, zidne obloge brčko distrikt, montaža kamena brčko, kamenpro brčko"
                schemaType="LocalBusiness"
                schemaData={{
                    "@type": "LocalBusiness",
                    "name": "KamenPro Brčko",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": cityData.address,
                        "addressLocality": cityData.name,
                        "addressRegion": cityData.region,
                        "postalCode": "76100",
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
                    { name: "Brčko", url: "/lokacije/brcko" }
                ]}
            />

            <LocalBusinessHero
                city={cityData.name}
                region={cityData.region}
                description={cityData.description}
                backgroundImage="/images/lokacije/brcko-hero.jpg"
                phone={cityData.phone}
                address={cityData.address}
                isMainLocation={false}
            />

            <LocalServices
                city={cityData.name}
                services={cityData.services}
                specialties={cityData.specialties}
                deliveryRadius="Brčko Distrikt"
                responseTime="48h"
            />

            <LocalProjects
                city={cityData.name}
                projects={[
                    {
                        name: "Poslovna zgrada - Centar Brčka",
                        description: "Elegantna fasada sa kamenim oblogama",
                        image: "/images/projekti/brcko-poslovna.jpg",
                        year: "2024"
                    },
                    {
                        name: "Restoran - Stari grad",
                        description: "Rustik cigla za autentičan ambijent",
                        image: "/images/projekti/brcko-restoran.jpg",
                        year: "2023"
                    },
                    {
                        name: "Privatna vila - Luka",
                        description: "Kombinacija različitih tekstura",
                        image: "/images/projekti/brcko-vila.jpg",
                        year: "2024"
                    }
                ]}
            />

            <LocalTestimonials
                city={cityData.name}
                testimonials={[
                    {
                        name: "Milica Đorđević",
                        location: "Centar Brčka",
                        text: "Vrlo zadovoljna uslugom. Ekipa je stigla tačno na vreme i uradila posao profesionalno.",
                        rating: 5,
                        project: "Fasada kuće"
                    },
                    {
                        name: "Branko Savić",
                        location: "Rahić",
                        text: "Preporučujem KamenPro svima u Brčkom. Kvalitet materijala je odličan, a montaža precizna.",
                        rating: 5,
                        project: "Poslovni prostor"
                    },
                    {
                        name: "Nataša Popović",
                        location: "Luka",
                        text: "Odlična komunikacija i rezultat koji prevazilazi očekivanja. Hvala KamenPro timu!",
                        rating: 5,
                        project: "Terasa i ulaz"
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
                mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2898.1234567890123!2d18.810556!3d44.869444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDUyJzEwLjAiTiAxOMKwNDgnMzguMCJF!5e0!3m2!1sen!2sba!4v1234567890124"
                additionalInfo="Usluge se pružaju u saradnji sa našim glavnim centrom u Bijeljini. Transport materijala i stručne ekipe organizujemo prema potrebi."
            />

            <LocalFAQ
                city={cityData.name}
                faqs={[
                    {
                        question: "Da li radite u Brčko Distriktu?",
                        answer: "Da, redovno radimo u celom Brčko Distriktu. Naša ekipa dolazi iz Bijeljine i pokriva sve lokacije u distriktu."
                    },
                    {
                        question: "Koliko košta dostava u Brčko?",
                        answer: "Dostava u Brčko se naplaćuje prema udaljenosti, ali za veće projekte (preko 50m²) dostava je besplatna."
                    },
                    {
                        question: "Da li poznajete lokalne propise u Brčko Distriktu?",
                        answer: "Apsolutno! Naša ekipa je upućena u sve lokalne propise i standarde koji važe u Brčko Distriktu."
                    },
                    {
                        question: "Koliko vremena unapred treba zakazati montažu?",
                        answer: "Za Brčko preporučujemo zakazivanje 5-7 dana unapred zbog organizacije transporta i radne ekipe."
                    },
                    {
                        question: "Da li imate lokalne partnere u Brčkom?",
                        answer: "Da, sarađujemo sa nekoliko lokalnih građevinskih firmi i arhitekata u Brčkom za kompleksnije projekte."
                    }
                ]}
            />
        </>
    );
}