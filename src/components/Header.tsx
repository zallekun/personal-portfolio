import React from 'react';
import { motion } from 'motion/react';
import { Wand2, Menu, X } from 'lucide-react';
import { Profile } from '../types';

interface HeaderProps {
  profile: Profile;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  unreadCount: number;
  isAuthorized: boolean;
}

export default function Header({
  profile,
  isEditing,
  setIsEditing,
  activeSection,
  setActiveSection,
  unreadCount,
  isAuthorized
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'about', label: 'Tentang' },
    { id: 'skills', label: 'Keahlian' },
    { id: 'experience', label: 'Pengalaman' },
    { id: 'projects', label: 'Proyek' },
    { id: 'contact', label: 'Kontak' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050505]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo / Name */}
        <div className="flex items-center">
          <span className="font-serif text-lg font-light tracking-tight italic text-white leading-tight">
            {profile.name}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-200 ${
                activeSection === item.id
                  ? 'text-white border-b border-white/80'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Editor Mode Toggle */}
          {isAuthorized && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`relative flex items-center space-x-2 px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium rounded-full transition-all duration-300 ${
                isEditing
                  ? 'bg-white/10 text-white border border-white/40 shadow-sm shadow-white/5'
                  : 'bg-transparent text-white/60 border border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              <Wand2 className={`h-3.5 w-3.5 ${isEditing ? 'animate-bounce text-white' : ''}`} />
              <span>{isEditing ? 'Editor Aktif' : 'Sesuaikan'}</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black ring-2 ring-[#050505]">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => handleNavClick('contact')}
            className="px-6 py-2.5 rounded-full border border-white/20 text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all bg-transparent text-white"
          >
            Hubungi Saya
          </button>
        </div>

        {/* Mobile menu and editor triggers */}
        <div className="flex items-center space-x-2 md:hidden">
          {isAuthorized && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`relative p-2 rounded-full border ${
                isEditing ? 'bg-white/10 text-white border-white/40' : 'bg-transparent text-white/50 border-white/10'
              }`}
              title="Edit Portfolio"
            >
              <Wand2 className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black ring-1 ring-[#050505]">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/50 hover:text-white bg-transparent border border-white/10 rounded-full"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/10 bg-[#050505]/95 px-4 py-4 space-y-3"
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-lg ${
                  activeSection === item.id
                    ? 'text-white bg-white/[0.04]'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-white/10 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('contact');
              }}
              className="w-full text-center border border-white/20 text-white hover:bg-white hover:text-black py-2.5 text-xs uppercase tracking-[0.2em] rounded-full transition-all"
            >
              Hubungi Saya
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
