import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ProblemSection } from './components/sections/ProblemSection';
import { InvestigationSection } from './components/sections/InvestigationSection';
import { MethodologySection } from './components/sections/MethodologySection';
import { ArchitectureSection } from './components/sections/ArchitectureSection';
import { ValidationSection } from './components/sections/ValidationSection';
import { ClosingSection } from './components/sections/ClosingSection';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main id="main-content" style={{ flex: 1 }}>
        <HeroSection />
        <ProblemSection />
        <InvestigationSection />
        <MethodologySection />
        <ArchitectureSection />
        <ValidationSection />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}
