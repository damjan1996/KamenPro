// src/pages/products/index.tsx
import { Seo } from "../../components/Seo";
import { ProductsHero } from "./components/ProductsHero";
import { ProductCategories } from "./components/ProductCategories";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { MaterialInfo } from "./components/MaterialInfo";
import { ProductAdvantages } from "./components/ProductAdvantages";
import { InstallationInfo } from "./components/InstallationInfo";
import { ProductsFAQ } from "./components/ProductsFAQ";
import { ProductCTA } from "./components/ProductCTA";

export default function Products() {
    return (
        <>
            <Seo
                title="Proizvodi"
                description="Istražite našu ponudu visokokvalitetnih kamenih obloga za zidove i podove. Prirodni kamen, mermer, travertin i drugi materijali dostupni za vaš prostor."
                canonical="/proizvodi"
                keywords="kamene obloge, prirodni kamen, zidne obloge, podne obloge, mermer, travertin"
            />
            <ProductsHero />
            <ProductCategories />
            <FeaturedProducts />
            <MaterialInfo />
            <ProductAdvantages />
            <InstallationInfo />
            <ProductsFAQ />
            <ProductCTA />
        </>
    );
}