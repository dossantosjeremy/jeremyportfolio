import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { E } from './ui/E';

export const Footer = () => (
  <footer className="bg-navy text-white pt-32 pb-12 overflow-hidden relative">
    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>

    <div className="max-w-7xl mx-auto px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
        <div>
          <div className="text-primary text-[11px] font-medium uppercase tracking-label mb-6"><E k="footer.contact.label">Contact</E></div>
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-12 leading-tight tracking-tight">
            <E k="footer.contact.heading">Let's build something exceptional.</E>
          </h2>
          <div className="flex flex-col gap-8">
            <a href="mailto:hello@jeremy.design" className="text-2xl md:text-3xl font-heading font-bold hover:text-primary transition-colors flex items-center gap-4 group">
              hello@jeremy.design
              <span className="text-primary group-hover:translate-x-2 transition-transform">&rarr;</span>
            </a>
            <div className="flex gap-6 mt-4">
              <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors"><Github className="w-6 h-6" /></a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div>
            <div className="text-white/30 text-[11px] font-bold uppercase tracking-label mb-8">Navigation</div>
            <ul className="flex flex-col gap-4 text-lg font-medium">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/work" className="hover:text-primary transition-colors">Work</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/process" className="hover:text-primary transition-colors">Process</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors text-teal">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white/30 text-[11px] font-bold uppercase tracking-label mb-8">Services</div>
            <ul className="flex flex-col gap-4 text-lg font-medium text-white/70">
              <li>AI Agents</li>
              <li>UX Research</li>
              <li>Product Design</li>
              <li>Automation</li>
              <li>Strategy</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm font-medium">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal animate-pulse"></div>
          <E k="footer.availability">Available for new projects in Q2 2024</E>
        </div>
        <div className="flex gap-8">
          <span>&copy; 2024 Jeremy Guillaume</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);
