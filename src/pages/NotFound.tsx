import { Container } from '../components/ui/Container';
import { Seo } from '../components/Seo';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="pt-24">
      <Seo 
        title="Stranica nije pronađena"
        description="Stranica koju tražite ne postoji. Vratite se na početnu stranicu."
        canonical="/404"
      />
        <Container>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-stone-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">
              Stranica koju tražite ne postoji.
            </p>
            <Link
              to="/"
              className="inline-block bg-stone-900 text-white px-6 py-3 rounded-md hover:bg-stone-800 transition-colors"
            >
              Nazad na početnu
            </Link>
          </div>
        </div>
        </Container>
    </div>
  );
}