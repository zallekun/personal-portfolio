import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { defaultPortfolioData } from './data/defaultData';
import { PortfolioData, ContactMessage } from './types';
import Header from './components/Header';
import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import EditorDrawer from './components/EditorDrawer';
import { MessageSquare, Heart, KeyRound, X, Lock } from 'lucide-react';

export default function App() {
  // Load portfolio data from localStorage or fallback to default template
  const [portfolioData, setPortfolioData] = React.useState<PortfolioData>(() => {
    const saved = localStorage.getItem('custom_portfolio_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse portfolio data', e);
      }
    }
    return defaultPortfolioData;
  });

  // Load contact messages inbox from localStorage
  const [messages, setMessages] = React.useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('portfolio_contact_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse messages', e);
      }
    }
    return [];
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('about');

  // --- EDITOR ACCESS CONTROL (PIN GATE & SECRET HOTKEYS) ---
  const CORRECT_PIN = '2026'; // Default PIN code
  const [isAuthorized, setIsAuthorized] = React.useState(() => {
    return localStorage.getItem('portfolio_editor_authorized') === 'true';
  });
  const [showPinModal, setShowPinModal] = React.useState(false);
  const [pinInput, setPinInput] = React.useState('');
  const [pinError, setPinError] = React.useState(false);
  const [pinSuccess, setPinSuccess] = React.useState(false);

  // Secret shortcut triggers on mobile (tap 5 times on brand logo/text in 2 seconds)
  const [footerTapCount, setFooterTapCount] = React.useState(0);
  const [lastTapTime, setLastTapTime] = React.useState(0);

  const handleFooterTap = () => {
    const now = Date.now();
    if (now - lastTapTime < 2000) {
      const nextCount = footerTapCount + 1;
      if (nextCount >= 5) {
        setShowPinModal(true);
        setPinInput('');
        setPinError(false);
        setPinSuccess(false);
        setFooterTapCount(0);
      } else {
        setFooterTapCount(nextCount);
      }
    } else {
      setFooterTapCount(1);
    }
    setLastTapTime(now);
  };

  const handlePinDigit = (digit: string) => {
    if (pinSuccess || pinError) return;
    if (pinInput.length < 4) {
      const nextInput = pinInput + digit;
      setPinInput(nextInput);
      
      if (nextInput.length === 4) {
        if (nextInput === CORRECT_PIN) {
          setPinSuccess(true);
          setTimeout(() => {
            localStorage.setItem('portfolio_editor_authorized', 'true');
            setIsAuthorized(true);
            setIsEditing(true);
            setShowPinModal(false);
            setPinSuccess(false);
          }, 800);
        } else {
          setPinError(true);
          setTimeout(() => {
            setPinInput('');
            setPinError(false);
          }, 1200);
        }
      }
    }
  };

  const handlePinBackspace = () => {
    if (pinSuccess || pinError) return;
    setPinInput(prev => prev.slice(0, -1));
  };

  // Listen to keyboard shortcut (Ctrl + Shift + E or Cmd + Shift + E)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        if (isAuthorized) {
          setIsEditing(prev => !prev);
        } else {
          setShowPinModal(true);
          setPinInput('');
          setPinError(false);
          setPinSuccess(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthorized]);

  // Listen to physical keyboard typing inside PIN modal
  React.useEffect(() => {
    if (!showPinModal) return;

    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handlePinDigit(e.key);
      } else if (e.key === 'Backspace') {
        handlePinBackspace();
      } else if (e.key === 'Escape') {
        setShowPinModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [showPinModal, pinInput, pinSuccess, pinError]);

  // Listen to scrolling to update active menu items
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save changes from editor drawer
  const handleSavePortfolio = (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem('custom_portfolio_data', JSON.stringify(newData));
    setIsEditing(false);
  };

  // Reset to default
  const handleResetPortfolio = () => {
    setPortfolioData(defaultPortfolioData);
    localStorage.removeItem('custom_portfolio_data');
    setIsEditing(false);
  };

  // Handle incoming message from contact form
  const handleSendMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'unread'>) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newMessage: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: formattedDate,
      unread: true
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('portfolio_contact_messages', JSON.stringify(updatedMessages));
  };

  const handleMarkMessageRead = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, unread: false } : m);
    setMessages(updated);
    localStorage.setItem('portfolio_contact_messages', JSON.stringify(updated));
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('portfolio_contact_messages', JSON.stringify(updated));
  };

  const unreadMessagesCount = messages.filter(m => m.unread).length;

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased selection:bg-white selection:text-black">
      {/* Background visual glows */}
      <div className="absolute top-0 right-0 -z-20 h-screen w-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />

      {/* Header */}
      <Header
        profile={portfolioData.profile}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        unreadCount={unreadMessagesCount}
        isAuthorized={isAuthorized}
      />

      {/* Main Content Layout */}
      <main className="relative">
        <ProfileSection
          profile={portfolioData.profile}
          projects={portfolioData.projects}
          experiences={portfolioData.experiences}
          isEditing={isEditing}
          onNavigate={navigateToSection}
        />

        <SkillsSection
          skills={portfolioData.skills}
          isEditing={isEditing}
        />

        <ExperienceSection
          experiences={portfolioData.experiences}
          isEditing={isEditing}
        />

        <ProjectsSection
          projects={portfolioData.projects}
          isEditing={isEditing}
        />

        <ContactSection
          profile={portfolioData.profile}
          onSendMessage={handleSendMessage}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-6">
          
          {/* Unified Brand Identity in Footer with secret backdoor */}
          <div 
            onClick={handleFooterTap}
            className="flex items-center space-x-3 cursor-pointer select-none active:scale-95 transition-transform"
            title="Akses Rahasia"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white">
              <Heart className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-base font-light tracking-tight italic text-white leading-tight">
                {portfolioData.profile.name}
              </span>
            </div>
          </div>

          <p className="font-sans text-xs text-white/50 leading-relaxed max-w-md text-center font-light">
            Terima kasih telah mengunjungi portfolio saya. Desain situs web ini dioptimalkan untuk performa tinggi, keindahan visual, dan aksesibilitas ramah pengguna.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4 text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
            <span>Dibuat dengan dedikasi</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-1.5">
              <Heart className="h-3.5 w-3.5 text-white/40 fill-white/10" />
              <span>&copy; {new Date().getFullYear()} • Hak Cipta Dilindungi</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Customization Control Drawer Panel */}
      <EditorDrawer
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        data={portfolioData}
        onSave={handleSavePortfolio}
        messages={messages}
        onMarkMessageRead={handleMarkMessageRead}
        onDeleteMessage={handleDeleteMessage}
        onResetToDefault={handleResetPortfolio}
        onLock={() => {
          setIsAuthorized(false);
          setIsEditing(false);
          localStorage.removeItem('portfolio_editor_authorized');
        }}
      />

      {/* PIN Gate Modal */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative max-w-xs w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPinModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/80 mb-4">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-light text-white italic tracking-tight mb-1">
                  Akses Khusus Pemilik
                </h3>
                <p className="text-[10px] text-white/40 leading-relaxed font-light mb-6 max-w-xs">
                  Masukkan PIN 4-digit untuk membuka menu kustomisasi langsung.
                </p>

                {/* PIN Code Circles Indicator */}
                <motion.div 
                  animate={pinError ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="flex space-x-4 mb-6"
                >
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`h-3 w-3 rounded-full border transition-all duration-150 ${
                        pinError
                          ? 'bg-red-500 border-red-500 shadow-sm shadow-red-500/50'
                          : pinSuccess
                          ? 'bg-emerald-500 border-emerald-500 shadow-sm shadow-emerald-500/50'
                          : index < pinInput.length
                          ? 'bg-white border-white scale-110'
                          : 'bg-transparent border-white/20'
                      }`}
                    />
                  ))}
                </motion.div>

                {/* Status Message */}
                <div className="h-4 mb-4 flex items-center justify-center">
                  {pinError && (
                    <span className="text-[10px] text-red-400 font-medium uppercase tracking-wider animate-pulse">
                      PIN Salah. Coba Lagi.
                    </span>
                  )}
                  {pinSuccess && (
                    <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider animate-pulse">
                      Berhasil Membuka Editor...
                    </span>
                  )}
                </div>

                {/* Interactive Keypad */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-[210px]">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                    <button
                      key={num}
                      onClick={() => handlePinDigit(num)}
                      className="flex h-12 w-12 items-center justify-center mx-auto rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/10 text-white font-mono text-sm font-semibold transition-all cursor-pointer active:scale-95"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => setPinInput('')}
                    className="flex h-12 w-12 items-center justify-center mx-auto text-white/40 hover:text-white/80 text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer active:scale-95"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => handlePinDigit('0')}
                    className="flex h-12 w-12 items-center justify-center mx-auto rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/10 text-white font-mono text-sm font-semibold transition-all cursor-pointer active:scale-95"
                  >
                    0
                  </button>
                  <button
                    onClick={handlePinBackspace}
                    className="flex h-12 w-12 items-center justify-center mx-auto text-white/40 hover:text-white/80 text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer active:scale-95"
                  >
                    Del
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
