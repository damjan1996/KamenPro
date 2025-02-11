import { Container } from '../ui/Container';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">KamenPro</h3>
            <p className="text-stone-300">
              Vaš specijalista za visokokvalitetne zidne obloge od prirodnog kamena.
              Zanatska tradicija susreće moderni dizajn.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <p className="flex items-center text-stone-300">
                <MapPin className="h-5 w-5 mr-2" />
                Ulica Primer 123, 11000 Beograd
              </p>
              <p className="flex items-center text-stone-300">
                <Phone className="h-5 w-5 mr-2" />
                +381 (0) 11 123 456
              </p>
              <p className="flex items-center text-stone-300">
                <Mail className="h-5 w-5 mr-2" />
                info@kamenpro.rs
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Radno vreme</h3>
            <div className="space-y-2 text-stone-300">
              <p>Pon - Pet: 08:00 - 17:00</p>
              <p>Sub: 09:00 - 13:00</p>
              <p>Ned: Zatvoreno</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-700 text-center text-stone-400">
          <p>&copy; {new Date().getFullYear()} KamenPro. Sva prava zadržana.</p>
        </div>
      </Container>
    </footer>
  );
}