import { Container } from '../components/ui/Container';
import { Users, Heart, Clock } from 'lucide-react';
import { Seo } from '../components/Seo';

export function About() {
  return (
    <div className="pt-24">
      <Seo 
        title="O nama"
        description="Saznajte više o KamenPro - 15+ godina iskustva u izradi vrhunskih kamenih obloga. Upoznajte naš tim stručnjaka i našu posvećenost kvalitetu."
        canonical="/about"
        keywords="kamenpro istorija, o nama, iskustvo sa kamenom, stručnjaci za kamen, kvalitet izrade"
      />
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">O nama</h1>
          
          <div className="prose prose-lg mx-auto mb-16">
            <p className="text-xl text-gray-600 mb-8">
              KamenPro je vodeći proizvođač dekorativnih zidnih obloga od prirodnog kamena u Srbiji. 
              Sa više od 15 godina iskustva, posvećeni smo stvaranju jedinstvenih enterijera koji spajaju 
              tradicionalno zanatstvo sa modernim dizajnom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-stone-900" />
              <h3 className="text-xl font-semibold mb-2">Naš tim</h3>
              <p className="text-gray-600">
                Iskusni majstori i dizajneri posvećeni kvalitetu i inovacijama
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-stone-900" />
              <h3 className="text-xl font-semibold mb-2">Naša strast</h3>
              <p className="text-gray-600">
                Ljubav prema prirodnom kamenu i njegovoj bezvremenskoj lepoti
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-stone-900" />
              <h3 className="text-xl font-semibold mb-2">Naše iskustvo</h3>
              <p className="text-gray-600">
                15+ godina u izradi vrhunskih kamenih obloga
              </p>
            </div>
          </div>

          <div className="bg-stone-50 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-bold mb-4">Naša misija</h2>
            <p className="text-gray-600">
              Naša misija je da transformišemo enterijere stvaranjem jedinstvenih kamenih obloga 
              koje kombinuju prirodnu lepotu kamena sa savremenim dizajnom. Posvećeni smo održivosti 
              i očuvanju tradicionalnih zanatskih veština.
            </p>
          </div>

          <div className="aspect-video mb-16 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1604705528621-81b2e1f25c37?auto=format&fit=crop&q=80" 
              alt="KamenPro radionica"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}