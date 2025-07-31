// src/pages/Products.tsx
import { Seo } from "../components/Seo";
import { ProductsHero } from "./products/components/ProductsHero";
import { FeaturedProducts } from "./products/components/FeaturedProducts";
import { ProductAdvantages } from "./products/components/ProductAdvantages";
import { ProductCTA } from "./products/components/ProductCTA";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";

export default function Products() {
  return (
      <>
        <Seo
            title="Proizvodi"
            description="Istražite našu kolekciju visokokvalitetnih kamenih obloga - od klasičnih do modernih dizajna. Prirodni kamen, škriljac i rustične kolekcije za svaki enterijer."
            canonical="/products"
            keywords="kamene obloge proizvodi, prirodni kamen prodaja, dekorativni kamen, zidne obloge od kamena"
        />
        
        <BreadcrumbSchema
            items={[
                { name: "Početna", url: "/" },
                { name: "Proizvodi", url: "/proizvodi" }
            ]}
        />
        <ProductsHero />
        <FeaturedProducts />
        <ProductAdvantages />
        <ProductCTA />
      </>
  );
}