import About from '../About';
import AnimatedBackground from '../AnimatedBackground';
import Contact from '../Contact';
import CustomCursor from '../CustomCursor';
import Footer from '../Footer';
import GameButton from '../GameButton';
import Hero from '../Hero';
import Navigation from '../Navigation';
import Portfolio from '../Portfolio';
import Services from '../Services';
import Skills from '../Skills';
import VoiceCommand from '../VoiceCommand';

function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1b] text-white relative cursor-none">
      {/* Animated background with mouse-responsive blurs */}
      <AnimatedBackground />

      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0f1b] via-[#0a0f1b] to-[#0f1624] pointer-events-none z-0" />

      {/* Very subtle dot pattern */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <CustomCursor />
      <VoiceCommand />
      <GameButton />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
