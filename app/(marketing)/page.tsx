import { FeatureBanner } from '@/components/marketing/FeatureBanner';
import { ControlSection } from '@/components/marketing/ControlSection';
import { Hero } from '@/components/marketing/Hero';
import { ServicesGrid } from '@/components/marketing/ServicesGrid';
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <ServicesGrid />
      <FeatureBanner />
      <ControlSection />
      <Footer />
    </>
  );
}
