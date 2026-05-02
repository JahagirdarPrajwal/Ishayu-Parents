import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SectionBackground } from "@/components/layout/SectionBackground";
import { Hero } from "@/components/hero/Hero";
import { StripMarquee } from "@/components/marquee/StripMarquee";
import { FounderSection } from "@/components/founder/FounderSection";
import { HowItsMade } from "@/components/process/HowItsMade";
import { StorySection } from "@/components/story/StorySection";
import { MobileShowcase } from "@/components/products/MobileShowcase";
import { HorizontalShowcase } from "@/components/products/HorizontalShowcase";
import { IngredientsSection } from "@/components/ingredients/IngredientsSection";
import { NutritionTable } from "@/components/nutrition/NutritionTable";
import { SustainabilitySection } from "@/components/sustainability/SustainabilitySection";
import { StockistsTeaser } from "@/components/stockists/StockistsTeaser";
import { TestimonialMarquee } from "@/components/testimonials/TestimonialMarquee";
import { JournalTeaser } from "@/components/journal/JournalTeaser";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Newsletter } from "@/components/cta/Newsletter";
import { ComingSoonStrip } from "@/components/cta/ComingSoonStrip";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema(), websiteSchema()]),
        }}
      />
      <SectionBackground />
      <Nav />
      <main>
        <Hero />
        <StripMarquee />
        <FounderSection />
        <HowItsMade />
        <StorySection />
        <HorizontalShowcase />
        <MobileShowcase />
        <IngredientsSection />
        <NutritionTable />
        <SustainabilitySection />
        <StockistsTeaser />
        <TestimonialMarquee />
        <JournalTeaser />
        <FaqAccordion limit={5} />
        <Newsletter />
        <ComingSoonStrip />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
