import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { Seo } from '../components/Seo';

export function Home() {
  return (
    <>
      <Seo 
        title="Početna"
        description="KamenPro - Vodeći proizvođač dekorativnih zidnih obloga od prirodnog kamena u Srbiji. Otkrijte našu kolekciju visokokvalitetnih kamenih obloga za zidove."
        canonical="/"
        keywords="dekorativne zidne obloge, kamene obloge za zid, prirodni kamen srbija, luksuzni enterijer"
      />
      <Hero />
      <Features />
    </>
  );
}