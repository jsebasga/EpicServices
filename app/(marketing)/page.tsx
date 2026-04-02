import { FeatureBanner } from '@/components/marketing/FeatureBanner';
import { ControlSection } from '@/components/marketing/ControlSection';
import { Hero } from '@/components/marketing/Hero';
import { KpiStrip } from '@/components/marketing/KpiStrip';
import { ServicesGrid } from '@/components/marketing/ServicesGrid';
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import { landingKpis } from '@/data/mock';

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <KpiStrip items={landingKpis} />
      <ServicesGrid />
      <FeatureBanner />
      <ControlSection />
      <Footer />
    </>
  );
}
