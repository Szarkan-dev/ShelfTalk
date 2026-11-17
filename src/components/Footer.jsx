import React from 'react';
import { BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-parchment-200/60 border-t border-parchment-300 mt-20 no-print" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-700 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold font-serif text-slate-900">ShelfTalk</span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              An interactive reading-circle web application and book review suite for campus book clubs, literary societies, and avid readers. Built for real-time progress tracking, spoiler-shielded discussions, and community ratings.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>WCAG 2.1 AA Compliant • Keyboard & Screen-Reader Accessible</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/" className="hover:text-amber-800 transition-colors">Book Catalog</Link></li>
              <li><Link to="/authors" className="hover:text-amber-800 transition-colors">Author Spotlights</Link></li>
              <li><Link to="/circles" className="hover:text-amber-800 transition-colors">Campus Reading Circles</Link></li>
              <li><Link to="/goal" className="hover:text-amber-800 transition-colors">Annual Reading Goal</Link></li>
            </ul>
          </div>

          {/* Reading Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Literary Suite</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/quotes" className="hover:text-amber-800 transition-colors">Quote Highlighter Scrapbook</Link></li>
              <li><Link to="/quiz" className="hover:text-amber-800 transition-colors">3-Question Book Quiz</Link></li>
              <li><Link to="/journal" className="hover:text-amber-800 transition-colors">Exportable Reading Journal</Link></li>
              <li><span className="text-xs text-slate-500">Demo Walkthrough Spec v1.0</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-parchment-300 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ShelfTalk ReadingRing Hack. Designed for Campus Book Clubs.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for literature lovers
          </p>
        </div>
      </div>
    </footer>
  );
};
