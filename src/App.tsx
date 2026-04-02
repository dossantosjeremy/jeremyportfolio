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
import { CaseStudy } from './pages/CaseStudy';
import { VisualEditor, GJS_OVERRIDE_PREFIX } from './pages/VisualEditor';
import { AnimatedText } from './components/ui/animated-text';
import { NavBar } from './components/ui/tubelight-navbar';
import { EditProvider } from './context/EditContext';
import { EditModeUI } from './components/EditModeUI';

// ── GrapesJS page override ───────────────────────────────────────────────────
// When a visual editor save exists for a page, render its HTML instead of
// the React component. Nav + Footer stay React so routing still works.
const WithGjsOverride: React.FC<{ pageKey: string; children: React.ReactNode }> = ({ pageKey, children }) => {
  const [override] = React.useState<{ html: string; css: string } | null>(() => {
    const raw = localStorage.getItem(GJS_OVERRIDE_PREFIX + pageKey);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  });

  if (override) {
    return (
      <>
        {override.css && <style dangerouslySetInnerHTML={{ __html: override.css }} />}
        <div dangerouslySetInnerHTML={{ __html: override.html }} />
      </>
    );
  }
  return <>{children}</>;
};

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
    <Work homepage />
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
    <EditProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white font-sans text-text selection:bg-primary selection:text-white">
          <Navigation />

          <main>
            <Routes>
              <Route path="/" element={<WithGjsOverride pageKey="home"><Home /></WithGjsOverride>} />
              <Route path="/services" element={<WithGjsOverride pageKey="services"><Services /></WithGjsOverride>} />
              <Route path="/work" element={<WithGjsOverride pageKey="work"><Work /></WithGjsOverride>} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="/process" element={<WithGjsOverride pageKey="process"><Process /></WithGjsOverride>} />
              <Route path="/profile" element={<WithGjsOverride pageKey="profile"><Profile /></WithGjsOverride>} />
              <Route path="/demo" element={<TimelineDemo />} />
              <Route path="/contact" element={<Footer />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/visual-editor" element={<VisualEditor />} />
            </Routes>
          </main>

          <Footer />
          <EditModeUI />
        </div>
      </Router>
    </EditProvider>
  );
}

export default App;
