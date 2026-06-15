import Footer from '@/components/footer';
import PricingSection from '@/components/sections/pricing-section';
import PricingHeader from '@/components/sections/pricing-header';

export const metadata = {
  title: 'Pricing & Destinations | Richie Brothers Tours Jamaica',
  description:
    'Browse all Jamaica tour prices from Negril and Montego Bay, plus airport transfer rates. Transparent pricing with a 20% deposit to secure your booking.',
};

export default function PricingPage() {
  return (
    <main className="w-full">
      <PricingHeader />
      <PricingSection />
      <Footer />
    </main>
  );
}