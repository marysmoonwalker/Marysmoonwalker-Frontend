import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import FamilyTree from './components/FamilyTree';
import SiteFeatures from './components/SiteFeatures';
import ForumPreview from './components/ForumPreview';
import TimelineCarousel from './components/Trending';
import LegacyShowcase from './components/LegacyShowcase';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Blogs from './components/Blogs';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = window.pageYOffset * speed;
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  if (loading) {
    return <Loading onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-mj-black">
      <Hero />
      <TimelineCarousel />
      <LegacyShowcase />
      <SiteFeatures />
      <FamilyTree />
      <Blogs />
      <ForumPreview />
      <Footer />
    </div>
  );
}

export default App;
