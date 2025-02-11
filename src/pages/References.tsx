import { Container } from '../components/ui/Container';
import { Seo } from '../components/Seo';
import { Image } from '../components/ui/Image';

const projects = [
  {
    id: 1,
    title: 'Luksuzna Vila',
    description: 'Kompletno renoviranje enterijera sa prirodnim kamenim oblogama',
    location: 'Dedinje, Beograd',
    image: 'https://images.unsplash.com/photo-1604705528621-81b2e1f25c37'
  },
  {
    id: 2,
    title: 'Poslovni Prostor',
    description: 'Moderno uređenje poslovnog prostora sa kamenim akcentima',
    location: 'Novi Beograd',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4'
  },
  {
    id: 3,
    title: 'Restoran "Stara Vodenica"',
    description: 'Rustične kamene obloge za autentičan ambijent',
    location: 'Zemun',
    image: 'https://images.unsplash.com/photo-1604705528621-81b2e1f25c37'
  }
];

export function References() {
  return (
    <div className="pt-24">
      <Seo 
        title="Reference"
        description="Pogledajte naše uspešno završene projekte - od luksuznih vila do poslovnih prostora. Galerija transformacija enterijera sa našim kamenim oblogama."
        canonical="/references"
        keywords="kamene obloge projekti, reference, realizovani projekti, kameni enterijer, luksuzne vile"
      />
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Reference</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pogledajte naše najuspešnije projekte i transformacije prostora
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="aspect-video">
                <Image 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Lokacija:</span> {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}