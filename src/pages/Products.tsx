import { Container } from '../components/ui/Container';
import { Seo } from '../components/Seo';
import { Image } from '../components/ui/Image';

const products = [
  {
    id: 1,
    name: 'Prirodni Kamen Classic',
    description: 'Tradicionalne kamene obloge sa klasičnim izgledom',
    image: 'https://images.unsplash.com/photo-1604705528621-81b2e1f25c37',
    features: ['Prirodni izgled', 'Dugotrajna postojanost', 'Lako održavanje']
  },
  {
    id: 2,
    name: 'Modern Slate',
    description: 'Moderne obloge od škriljca za savremene enterijere',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4',
    features: ['Moderan dizajn', 'Jedinstvena tekstura', 'Otpornost na habanje']
  },
  {
    id: 3,
    name: 'Rustik Kolekcija',
    description: 'Rustične kamene obloge za autentičan izgled',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4',
    features: ['Rustičan izgled', 'Ručna obrada', 'Prirodne varijacije']
  }
];

export function Products() {
  return (
    <div className="pt-24">
      <Seo 
        title="Proizvodi"
        description="Istražite našu kolekciju visokokvalitetnih kamenih obloga - od klasičnih do modernih dizajna. Prirodni kamen, škriljac i rustične kolekcije za svaki enterijer."
        canonical="/products"
        keywords="kamene obloge proizvodi, prirodni kamen prodaja, dekorativni kamen, zidne obloge od kamena"
      />
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Naši proizvodi</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Otkrijte našu kolekciju visokokvalitetnih kamenih obloga za zidove
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="aspect-video">
                <Image 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-stone-900 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="mt-6 inline-block bg-stone-900 text-white px-6 py-2 rounded-md hover:bg-stone-800 transition-colors"
                >
                  Zatražite ponudu
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}