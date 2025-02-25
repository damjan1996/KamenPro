// src/components/home/components/ContactInfoSection.tsx
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "../../../components/ui/Container";

export function ContactInfoSection() {
    return (
        <section className="py-16 md:py-24">
            <Container>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-amber-500 transition-colors duration-300">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="h-8 w-8 text-amber-700" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Pozovite nas</h3>
                        <p className="text-gray-700">+381 11 123 4567</p>
                        <p className="text-gray-700">+381 63 789 0123</p>
                    </div>

                    <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-amber-500 transition-colors duration-300">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="h-8 w-8 text-amber-700" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Email</h3>
                        <p className="text-gray-700">info@kamenpro.rs</p>
                        <p className="text-gray-700">prodaja@kamenpro.rs</p>
                    </div>

                    <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-amber-500 transition-colors duration-300">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="h-8 w-8 text-amber-700" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Lokacija</h3>
                        <p className="text-gray-700">Bulevar Oslobođenja 123</p>
                        <p className="text-gray-700">11000 Beograd, Srbija</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}