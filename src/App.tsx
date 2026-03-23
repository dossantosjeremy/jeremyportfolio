import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Briefcase, Settings, User, MonitorPlay, Mail, Layers } from 'lucide-react';
import { Hero } from './components/Hero';
import { Philosophy, WhyWorkWithMe, Expertise } from './components/Features';
import { Work } from './components/Work';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { Profile } from './components/Profile';
import { Process } from './components/Process';
import { TimelineDemo } from './components/TimelineDemo';
import { Services } from './components/Services';
import { Admin } from './components/Admin';
import { LogoStrip, Challenges, Toolkit, FAQ, Partnerships, CTA } from './components/StaticSections';
import { AnimatedText } from './components/ui/animated-text';
import { NavBar } from './components/ui/tubelight-navbar';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const navItems = [
  { name: 'Home', url: '/', icon: HomeIcon },
  { name: 'Services', url: '/services', icon: Layers },
  { name: 'Work', url: '/work', icon: Briefcase },
  { name: 'Process', url: '/process', icon: Settings },
  { name: 'Profile', url: '/profile', icon: User },
  { name: 'Contact', url: '/contact', icon: Mail }
];

const Navigation = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 sm:px-8 sm:py-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-cardborder">
        <Link to="/" className="cursor-pointer">
          <AnimatedText 
            text="Jeremy's Hub"
            textClassName="text-text font-heading font-bold text-xl sm:text-2xl tracking-tight"
            underlineGradient="from-primary via-blue-500 to-purple-500"
            underlineHeight="h-[2px]"
            underlineOffset="-bottom-1"
          />
        </Link>
      </nav>
      <NavBar items={navItems} />
    </>
  );
};

const Home = () => (
  <>
    <Hero />
    <Philosophy />
    <WhyWorkWithMe />
    <Work />
    <Expertise />
    <Challenges />
    <Toolkit />
    <Partnerships />
    <Testimonials />
    <FAQ />
    <CTA />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans text-text selection:bg-primary selection:text-white">
        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/process" element={<Process />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/demo" element={<TimelineDemo />} />
            <Route path="/contact" element={<Footer />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
