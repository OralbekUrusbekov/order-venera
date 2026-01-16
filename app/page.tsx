import { SatelliteSimulator } from "@/components/satellite-simulator"
import { RoverDashboard } from "@/components/rover-dashboard"
import { TechnicalSpecs } from "@/components/technical-specs"
import { AquateraHeader } from "@/components/aquatera-header"
import { AquateraHero } from "@/components/aquatera-hero"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { DrillingAnimation } from "@/components/drilling-animation"
import { WaterScarcityMaps } from "@/components/water-scarcity-maps"
import { VenusAIInsights } from "@/components/venus-ai-insights"
import { AtmosphericDynamics } from "@/components/atmospheric-dynamics"
import { PredictiveAnalytics } from "@/components/predictive-analytics"
import { VenusInteriorGlobe } from "@/components/venus-3d-globe"

export default function Home() {
  return (
    <main className="min-h-screen">
      <AquateraHeader />

      <section id="home">
        <AquateraHero />
      </section>

      <section id="ai-insights">
        <VenusAIInsights />
      </section>

      <section id="3d-map">
        <VenusInteriorGlobe />
      </section>

      <section id="drilling">
        <DrillingAnimation />
      </section>

      <section id="dynamics">
        <AtmosphericDynamics />
      </section>

    

      <section id="analytics">
        <PredictiveAnalytics />
      </section>

      <section id="mission">
        <Features />
      </section>

      <section id="simulator">
        <SatelliteSimulator />
      </section>

      <section id="dashboard">
        <RoverDashboard />
      </section>

      <TechnicalSpecs />
      <Footer />
    </main>
  )
}
