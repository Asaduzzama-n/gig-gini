// app/page.tsx

import { BenefitsSection } from "@/components/home/BenifitsSection";
import { CompetitionFlow } from "@/components/home/CompetetionFlow";
import { Hero } from "@/components/home/Hero";
import { Roadmap } from "@/components/home/RoadMap";
import { UpcomingFeatures } from "@/components/home/UpcomingFeatures";


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <BenefitsSection />
       <CompetitionFlow /> 
      <Roadmap />
      <UpcomingFeatures /> 
    </div>
  );
}