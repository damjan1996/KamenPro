// src/pages/blog/index.tsx - SEO-optimierte Blog-Sektion
export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-8">
          KamenPro Blog - Saveti i vodič za kamene obloge
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog posts will be added here */}
          <article className="bg-stone-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Kako da odaberete pravu kamenu oblogu za vaš dom
            </h2>
            <p className="text-stone-600 mb-4">
              Kompletni vodič kroz izbor kamenih obloga - od materijala do boja i tekstura...
            </p>
            <a href="/blog/kako-odabrati-kamenu-oblogu" className="text-amber-600 hover:text-amber-700">
              Pročitajte više →
            </a>
          </article>
          
          <article className="bg-stone-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Step-by-step montaža kamenih obloga
            </h2>
            <p className="text-stone-600 mb-4">
              Detaljno uputstvo za profesionalnu montažu dekorativnih kamenih obloga...
            </p>
            <a href="/blog/montaza-kamenih-obloga" className="text-amber-600 hover:text-amber-700">
              Pročitajte više →
            </a>
          </article>
          
          <article className="bg-stone-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Održavanje i nega kamenih obloga
            </h2>
            <p className="text-stone-600 mb-4">
              Praktični saveti za dugotrajnost i lepotu vaših kamenih obloga...
            </p>
            <a href="/blog/odrzavanje-kamenih-obloga" className="text-amber-600 hover:text-amber-700">
              Pročitajte više →
            </a>
          </article>
        </div>
      </div>
    </div>
  );
}