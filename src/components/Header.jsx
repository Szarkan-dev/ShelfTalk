import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BookOpen, Users, Compass, Award, Quote, Target, RotateCcw, Menu, X, BookCheck, FileText } from 'lucide-react';
import { useShelfTalk } from '../context/ShelfTalkContext';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resetToDefaultData } = useShelfTalk();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetToDefaultData();
    setShowResetConfirm(true);
    setTimeout(() => setShowResetConfirm(false), 3000);
  };

  const navLinks = [
    { to: '/', label: 'Catalog', icon: BookOpen },
    { to: '/authors', label: 'Authors', icon: Award },
    { to: '/circles', label: 'Reading Circles', icon: Users },
    { to: '/goal', label: 'Annual Goal', icon: Target },
    { to: '/quotes', label: 'Scrapbook', icon: Quote },
    { to: '/quiz', label: 'Match Quiz', icon: Compass },
    { to: '/journal', label: 'Journal', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-parchment-100/90 backdrop-blur-md border-b border-parchment-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <span className="text-xl font-bold font-serif tracking-tight text-slate-900 group-hover:text-amber-800 transition-colors">
                ShelfTalk
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-amber-700">
                Reading Circles Suite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-parchment-200/70'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Quick Actions (Reset Demo Data & Mobile Toggle) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              title="Reset state to initial 16 books & 18 Midnight Library reviews"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-amber-900 bg-white hover:bg-amber-50 border border-parchment-300 rounded-lg transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>{showResetConfirm ? "Demo Data Reset!" : "Reset Demo Data"}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-parchment-200 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-parchment-200 bg-parchment-100 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 font-semibold'
                    : 'text-slate-600 hover:bg-parchment-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
          <div className="pt-2 border-t border-parchment-200">
            <button
              type="button"
              onClick={() => {
                handleReset();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-amber-800 bg-white border border-amber-200 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Demo Seed Data</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
