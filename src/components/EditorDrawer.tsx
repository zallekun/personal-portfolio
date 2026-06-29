import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Sparkles,
  Briefcase,
  FolderOpen,
  Inbox,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Check,
  Eye,
  Copy,
  Lock,
  LogOut
} from 'lucide-react';
import { PortfolioData, Profile, Skill, Project, Experience, ContactMessage } from '../types';

interface EditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  messages: ContactMessage[];
  onMarkMessageRead: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onResetToDefault: () => void;
  onLock?: () => void;
}

export default function EditorDrawer({
  isOpen,
  onClose,
  data,
  onSave,
  messages,
  onMarkMessageRead,
  onDeleteMessage,
  onResetToDefault,
  onLock
}: EditorDrawerProps) {
  const [activeTab, setActiveTab] = React.useState<'profile' | 'skills' | 'projects' | 'experience' | 'inbox' | 'system'>('profile');

  // Copy local states to manipulate in forms, then submit on save
  const [profile, setProfile] = React.useState<Profile>({ ...data.profile });
  const [skills, setSkills] = React.useState<Skill[]>([...data.skills]);
  const [projects, setProjects] = React.useState<Project[]>([...data.projects]);
  const [experiences, setExperiences] = React.useState<Experience[]>([...data.experiences]);

  // Copy state for clipboard feedback
  const [copied, setCopied] = React.useState(false);

  // Read file state for JSON import
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Sync internal state when source data updates (e.g. from local storage reload or reset)
  React.useEffect(() => {
    setProfile({ ...data.profile });
    setSkills([...data.skills]);
    setProjects([...data.projects]);
    setExperiences([...data.experiences]);
  }, [data]);

  const handleSaveAll = () => {
    onSave({
      profile,
      skills,
      projects,
      experiences
    });
  };

  // ----- SKILLS MANAGEMENT -----
  const handleSkillChange = (id: string, field: keyof Skill, value: any) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: 'Keahlian Baru',
      category: 'Frontend',
      level: 80,
      iconName: 'Code'
    };
    setSkills(prev => [...prev, newSkill]);
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };


  // ----- PROJECTS MANAGEMENT -----
  const handleProjectChange = (id: string, field: keyof Project, value: any) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: 'Proyek Baru',
      description: 'Deskripsi singkat mengenai proyek yang mengagumkan ini.',
      longDescription: 'Penjelasan lengkap mengenai proyek ini, tantangan yang dihadapi, dan solusi yang diimplementasikan.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      category: 'Web',
      tags: ['React', 'Tailwind CSS'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false
    };
    setProjects(prev => [...prev, newProject]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };


  // ----- EXPERIENCES MANAGEMENT -----
  const handleExperienceChange = (id: string, field: keyof Experience, value: any) => {
    setExperiences(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: 'Peran Baru',
      company: 'Nama Perusahaan',
      period: '2025 - Sekarang',
      description: 'Menulis deskripsi tanggung jawab serta pencapaian yang didapatkan selama bekerja di perusahaan ini.',
      skills: ['React', 'JavaScript']
    };
    setExperiences(prev => [...prev, newExp]);
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(e => e.id !== id));
  };


  // ----- DATA IMPORT/EXPORT -----
  const handleExportJSON = () => {
    const dataStr = JSON.stringify({ profile, skills, projects, experiences }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'portfolio-custom-data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleCopyJSON = () => {
    const dataStr = JSON.stringify({ profile, skills, projects, experiences }, null, 2);
    navigator.clipboard.writeText(dataStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Gagal menyalin teks ke clipboard', err);
    });
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target?.result as string);
        if (parsedData.profile && parsedData.skills && parsedData.projects && parsedData.experiences) {
          setProfile(parsedData.profile);
          setSkills(parsedData.skills);
          setProjects(parsedData.projects);
          setExperiences(parsedData.experiences);
          alert('Data berhasil diimpor! Jangan lupa untuk menekan tombol "Simpan Perubahan" di bagian bawah untuk menerapkannya.');
        } else {
          alert('Format JSON tidak valid. Pastikan skema sesuai.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Sidebar navigation options
  const menuItems = [
    { id: 'profile', label: 'Profil', icon: <User className="h-4 w-4" /> },
    { id: 'skills', label: 'Keahlian', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'projects', label: 'Proyek', icon: <FolderOpen className="h-4 w-4" /> },
    { id: 'experience', label: 'Pengalaman', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'inbox', label: `Inbox (${messages.length})`, icon: <Inbox className="h-4 w-4" /> },
    { id: 'system', label: 'Cadangan', icon: <RotateCcw className="h-4 w-4" /> },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Gray overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/85 backdrop-blur-xs"
          />

          {/* Core Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full max-w-2xl flex-col border-l border-white/10 bg-[#050505] text-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-[#050505]">
              <div className="flex items-center space-x-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/[0.04]">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 mb-0.5 font-semibold">
                    Editor Panel
                  </span>
                  <h2 className="font-serif text-base font-light tracking-tight text-white">
                    Kustomisasi <span className="italic text-white/90">Konten Portfolio</span>
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-white/50 border border-white/5 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Inner Layout split: menu left and main content forms on the right */}
            <div className="flex flex-1 overflow-hidden">
              {/* Vertical Menu bar */}
              <div className="w-1/3 border-r border-white/10 bg-black/30 p-3 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-2.5 rounded-md px-3.5 py-2.5 text-[10px] tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-white/10 text-white border border-white/20 font-medium'
                        : 'text-white/40 hover:text-white hover:bg-white/[0.02] border border-transparent'
                    }`}
                  >
                    <span className="opacity-80 shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Main editable forms container */}
              <div className="flex-1 p-6 overflow-y-auto bg-black/10">
                <AnimatePresence mode="wait">
                  {/* --- PROFILE TAB --- */}
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile-tab"
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="font-serif text-lg font-light text-white italic tracking-tight mb-4 border-b border-white/5 pb-2">
                        Data Identitas & Kontak
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1.5 font-mono">
                            Nama Lengkap
                          </label>
                          <input
                            type="text"
                            value={profile.name}
                            onChange={e => setProfile({ ...profile, name: e.target.value })}
                            className="w-full rounded-md bg-white/[0.02] border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1.5 font-mono">
                            Peran Utama (Title)
                          </label>
                          <input
                            type="text"
                            value={profile.title}
                            onChange={e => setProfile({ ...profile, title: e.target.value })}
                            className="w-full rounded-md bg-white/[0.02] border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1.5 font-mono">
                            Biografi Ringkas
                          </label>
                          <textarea
                            rows={4}
                            value={profile.bio}
                            onChange={e => setProfile({ ...profile, bio: e.target.value })}
                            className="w-full rounded-md bg-white/[0.02] border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1.5 font-mono">
                              Lokasi
                            </label>
                            <input
                              type="text"
                              value={profile.location}
                              onChange={e => setProfile({ ...profile, location: e.target.value })}
                              className="w-full rounded-md bg-white/[0.02] border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1.5 font-mono">
                              Email Kontak
                            </label>
                            <input
                              type="email"
                              value={profile.email}
                              onChange={e => setProfile({ ...profile, email: e.target.value })}
                              className="w-full rounded-md bg-white/[0.02] border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1.5 font-mono">
                            Foto URL (Avatar)
                          </label>
                          <input
                            type="text"
                            value={profile.avatarUrl}
                            onChange={e => setProfile({ ...profile, avatarUrl: e.target.value })}
                            className="w-full rounded-md bg-white/[0.02] border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                          />
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/5">
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-white/50 mb-1">Tautan Sosial Media</h4>

                          <div>
                            <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                              GitHub Link
                            </label>
                            <input
                              type="text"
                              value={profile.github}
                              onChange={e => setProfile({ ...profile, github: e.target.value })}
                              className="w-full rounded-md bg-white/[0.02] border border-white/10 px-4 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                              LinkedIn Link
                            </label>
                            <input
                              type="text"
                              value={profile.linkedin}
                              onChange={e => setProfile({ ...profile, linkedin: e.target.value })}
                              className="w-full rounded-md bg-white/[0.02] border border-white/10 px-4 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                              Twitter Link
                            </label>
                            <input
                              type="text"
                              value={profile.twitter}
                              onChange={e => setProfile({ ...profile, twitter: e.target.value })}
                              className="w-full rounded-md bg-white/[0.02] border border-white/10 px-4 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* --- SKILLS TAB --- */}
                  {activeTab === 'skills' && (
                    <motion.div
                      key="skills-tab"
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className="font-serif text-lg font-light text-white italic tracking-tight">
                          Daftar Kompetensi Teknis
                        </h3>
                        <button
                          onClick={handleAddSkill}
                          className="flex items-center space-x-1.5 bg-white text-black border border-transparent px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold hover:bg-transparent hover:text-white hover:border-white/30 transition-all cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Keahlian Baru</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {skills.map((skill) => (
                          <div
                            key={skill.id}
                            className="flex flex-col space-y-3 rounded-xl border border-white/5 bg-white/[0.01] p-4 relative hover:border-white/15 transition-all duration-300"
                          >
                            <button
                              onClick={() => handleDeleteSkill(skill.id)}
                              className="absolute top-4 right-4 p-1.5 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-full transition-all"
                              title="Hapus Keahlian"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                  Nama Keahlian
                                </label>
                                <input
                                  type="text"
                                  value={skill.name}
                                  onChange={e => handleSkillChange(skill.id, 'name', e.target.value)}
                                  className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                                />
                              </div>

                              <div>
                                <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                  Kategori
                                </label>
                                <select
                                  value={skill.category}
                                  onChange={e => handleSkillChange(skill.id, 'category', e.target.value)}
                                  className="w-full rounded-md bg-[#050505] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 transition-all font-light"
                                >
                                  <option value="Frontend">Frontend</option>
                                  <option value="Backend">Backend</option>
                                  <option value="Design">Design</option>
                                  <option value="Tools">Tools</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                  Tingkat Penguasaan ({skill.level}%)
                                </label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={skill.level}
                                  onChange={e => handleSkillChange(skill.id, 'level', parseInt(e.target.value))}
                                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white mt-3"
                                />
                              </div>

                              <div>
                                <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                  Nama Icon (Lucide)
                                </label>
                                <select
                                  value={skill.iconName}
                                  onChange={e => handleSkillChange(skill.id, 'iconName', e.target.value)}
                                  className="w-full rounded-md bg-[#050505] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 transition-all font-light"
                                >
                                  <option value="Code">Code (React, JS, HTML)</option>
                                  <option value="FileCode">FileCode (TypeScript)</option>
                                  <option value="Sparkles">Sparkles (Styling, Tailwind)</option>
                                  <option value="Server">Server (Node, Express)</option>
                                  <option value="Database">Database (MongoDB, SQL)</option>
                                  <option value="Cpu">Cpu (AI, APIs)</option>
                                  <option value="Palette">Palette (Design, Figma)</option>
                                  <option value="GitBranch">GitBranch (Git, VCS)</option>
                                  <option value="Settings">Settings (DevOps, Docker)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* --- PROJECTS TAB --- */}
                  {activeTab === 'projects' && (
                    <motion.div
                      key="projects-tab"
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className="font-serif text-lg font-light text-white italic tracking-tight">
                          Daftar Portofolio Proyek
                        </h3>
                        <button
                          onClick={handleAddProject}
                          className="flex items-center space-x-1.5 bg-white text-black border border-transparent px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold hover:bg-transparent hover:text-white hover:border-white/30 transition-all cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Proyek Baru</span>
                        </button>
                      </div>

                      <div className="space-y-6">
                        {projects.map((project) => (
                          <div
                            key={project.id}
                            className="flex flex-col space-y-3 rounded-xl border border-white/5 bg-white/[0.01] p-4 relative hover:border-white/15 transition-all duration-300"
                          >
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="absolute top-4 right-4 p-1.5 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-full transition-all z-10"
                              title="Hapus Proyek"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>

                            <div>
                              <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                Judul Proyek
                              </label>
                              <input
                                type="text"
                                value={project.title}
                                onChange={e => handleProjectChange(project.id, 'title', e.target.value)}
                                className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                  Kategori
                                </label>
                                <select
                                  value={project.category}
                                  onChange={e => handleProjectChange(project.id, 'category', e.target.value)}
                                  className="w-full rounded-md bg-[#050505] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 transition-all font-light"
                                >
                                  <option value="Web">Web</option>
                                  <option value="Mobile">Mobile</option>
                                  <option value="Design">Design</option>
                                  <option value="AI/Data">AI/Data</option>
                                </select>
                              </div>

                              <div className="flex items-center pt-5 pl-2">
                                <input
                                  type="checkbox"
                                  id={`featured-${project.id}`}
                                  checked={project.featured}
                                  onChange={e => handleProjectChange(project.id, 'featured', e.target.checked)}
                                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-white focus:ring-white focus:ring-offset-0"
                                />
                                <label htmlFor={`featured-${project.id}`} className="ml-2 text-xs text-white/70 font-light">
                                  Proyek Unggulan (Featured)
                                </label>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                Deskripsi Pendek
                              </label>
                              <input
                                type="text"
                                value={project.description}
                                onChange={e => handleProjectChange(project.id, 'description', e.target.value)}
                                className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                Deskripsi Panjang (Pop-up Modal Detail)
                              </label>
                              <textarea
                                rows={3}
                                value={project.longDescription || ''}
                                onChange={e => handleProjectChange(project.id, 'longDescription', e.target.value)}
                                className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light resize-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                Gambar Cover URL
                              </label>
                              <input
                                type="text"
                                value={project.image}
                                onChange={e => handleProjectChange(project.id, 'image', e.target.value)}
                                className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                Tags Teknologi (pisahkan dengan koma)
                              </label>
                              <input
                                type="text"
                                value={project.tags.join(', ')}
                                onChange={e => handleProjectChange(project.id, 'tags', e.target.value.split(',').map(t => t.trim()))}
                                className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                  Demo URL (Opsional)
                                </label>
                                <input
                                  type="text"
                                  value={project.demoUrl || ''}
                                  onChange={e => handleProjectChange(project.id, 'demoUrl', e.target.value)}
                                  className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                                />
                              </div>

                              <div>
                                <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                  GitHub URL (Opsional)
                                </label>
                                <input
                                  type="text"
                                  value={project.githubUrl || ''}
                                  onChange={e => handleProjectChange(project.id, 'githubUrl', e.target.value)}
                                  className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* --- EXPERIENCE TAB --- */}
                  {activeTab === 'experience' && (
                    <motion.div
                      key="experience-tab"
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className="font-serif text-lg font-light text-white italic tracking-tight">
                          Riwayat Karir Profesional
                        </h3>
                        <button
                          onClick={handleAddExperience}
                          className="flex items-center space-x-1.5 bg-white text-black border border-transparent px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold hover:bg-transparent hover:text-white hover:border-white/30 transition-all cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Pengalaman Baru</span>
                        </button>
                      </div>

                      <div className="space-y-6">
                        {experiences.map((exp) => (
                          <div
                            key={exp.id}
                            className="flex flex-col space-y-3 rounded-xl border border-white/5 bg-white/[0.01] p-4 relative hover:border-white/15 transition-all duration-300"
                          >
                            <button
                              onClick={() => handleDeleteExperience(exp.id)}
                              className="absolute top-4 right-4 p-1.5 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-full transition-all"
                              title="Hapus Jabatan"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                  Nama Jabatan (Role)
                                </label>
                                <input
                                  type="text"
                                  value={exp.role}
                                  onChange={e => handleExperienceChange(exp.id, 'role', e.target.value)}
                                  className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                                />
                              </div>

                              <div>
                                <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                  Nama Perusahaan
                                </label>
                                <input
                                  type="text"
                                  value={exp.company}
                                  onChange={e => handleExperienceChange(exp.id, 'company', e.target.value)}
                                  className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                Periode Kerja
                              </label>
                              <input
                                type="text"
                                value={exp.period}
                                onChange={e => handleExperienceChange(exp.id, 'period', e.target.value)}
                                className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                Deskripsi Ringkas Pekerjaan
                              </label>
                              <textarea
                                rows={3}
                                value={exp.description}
                                onChange={e => handleExperienceChange(exp.id, 'description', e.target.value)}
                                className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light resize-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-1 font-mono">
                                Badges Keahlian (pisahkan dengan koma)
                              </label>
                              <input
                                type="text"
                                value={exp.skills.join(', ')}
                                onChange={e => handleExperienceChange(exp.id, 'skills', e.target.value.split(',').map(s => s.trim()))}
                                className="w-full rounded-md bg-white/[0.02] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-light"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* --- INBOX TAB --- */}
                  {activeTab === 'inbox' && (
                    <motion.div
                      key="inbox-tab"
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="font-serif text-lg font-light text-white italic tracking-tight mb-4 border-b border-white/5 pb-2">
                        Pesan Masuk (Uji Kontak Form)
                      </h3>

                      {messages.length === 0 ? (
                        <div className="text-center py-12 rounded-xl border border-dashed border-white/10 text-white/40">
                          <Inbox className="h-8 w-8 mx-auto text-white/25 mb-3" />
                          <p className="text-xs font-semibold">Belum ada pesan yang masuk.</p>
                          <p className="text-[10px] mt-1 font-light">Coba isi Formulir Kontak di bagian bawah portfolio untuk menguji fitur ini!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`rounded-xl border p-4 transition-all duration-300 ${
                                msg.unread
                                  ? 'border-white/20 bg-white/[0.02] shadow-sm'
                                  : 'border-white/5 bg-white/[0.005]'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-sans text-xs font-semibold text-white">
                                      {msg.name}
                                    </h4>
                                    {msg.unread && (
                                      <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                    )}
                                  </div>
                                  <a
                                    href={`mailto:${msg.email}`}
                                    className="text-[10px] text-white/40 hover:text-white transition-colors font-mono"
                                  >
                                    {msg.email}
                                  </a>
                                </div>
                                <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">
                                  {msg.date}
                                </span>
                              </div>

                              <div className="mt-2.5 pt-2.5 border-t border-white/5">
                                <p className="text-xs font-medium text-white/80">
                                  Subjek: {msg.subject}
                                </p>
                                <p className="text-xs text-white/50 leading-relaxed mt-1 font-light whitespace-pre-line">
                                  {msg.message}
                                </p>
                              </div>

                              {/* Message actions */}
                              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-white/5">
                                {msg.unread && (
                                  <button
                                    onClick={() => onMarkMessageRead(msg.id)}
                                    className="flex items-center space-x-1 bg-white/10 text-white border border-white/20 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold hover:bg-white/20 transition-all cursor-pointer"
                                  >
                                    <Check className="h-3 w-3" />
                                    <span>Tandai Sudah Dibaca</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => onDeleteMessage(msg.id)}
                                  className="flex items-center space-x-1 bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold hover:bg-red-500/20 transition-all cursor-pointer"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span>Hapus</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* --- BACKUP & EXPORT TAB --- */}
                  {activeTab === 'system' && (
                    <motion.div
                      key="system-tab"
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="font-serif text-lg font-light text-white italic tracking-tight mb-1 border-b border-white/5 pb-2">
                          Cadangkan & Pulihkan Portfolio
                        </h3>
                        <p className="text-xs text-white/40 leading-relaxed font-light">
                          Anda dapat mengekspor seluruh konfigurasi kustom yang Anda buat ke dalam file JSON, menyalin datanya ke clipboard untuk di-paste langsung ke repositori GitHub, atau memulihkannya kembali kapan saja.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {/* Export file */}
                        <button
                          onClick={handleExportJSON}
                          className="flex flex-col items-center justify-center border border-white/5 bg-white/[0.01] p-6 rounded-xl text-center group hover:border-white/20 transition-all cursor-pointer"
                        >
                          <Download className="h-6 w-6 text-white/60 group-hover:scale-110 transition-transform mb-3" />
                          <h4 className="text-xs font-semibold text-white mb-1">Unduh JSON</h4>
                          <p className="text-[10px] text-white/40 font-light">Unduh data kustom Anda sebagai file `.json`.</p>
                        </button>

                        {/* Copy JSON */}
                        <button
                          onClick={handleCopyJSON}
                          className="flex flex-col items-center justify-center border border-white/5 bg-white/[0.01] p-6 rounded-xl text-center group hover:border-white/20 transition-all cursor-pointer"
                        >
                          {copied ? (
                            <Check className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform mb-3 animate-pulse" />
                          ) : (
                            <Copy className="h-6 w-6 text-white/60 group-hover:scale-110 transition-transform mb-3" />
                          )}
                          <h4 className="text-xs font-semibold text-white mb-1">{copied ? 'Tersalin!' : 'Salin JSON'}</h4>
                          <p className="text-[10px] text-white/40 font-light">Salin data kustom langsung ke clipboard Anda.</p>
                        </button>

                        {/* Import Trigger */}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center justify-center border border-white/5 bg-white/[0.01] p-6 rounded-xl text-center group hover:border-white/20 transition-all cursor-pointer"
                        >
                          <Upload className="h-6 w-6 text-white/60 group-hover:scale-110 transition-transform mb-3" />
                          <h4 className="text-xs font-semibold text-white mb-1">Unggah JSON</h4>
                          <p className="text-[10px] text-white/40 font-light">Muat data portfolio dari file JSON eksternal.</p>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImportJSON}
                            accept=".json"
                            className="hidden"
                          />
                        </button>
                      </div>

                      {/* Security Access Lock */}
                      <div className="rounded-xl border border-white/10 bg-white/[0.01] p-4 space-y-3">
                        <div className="flex items-start space-x-3 text-white/60">
                          <Lock className="h-4 w-4 shrink-0 mt-0.5 text-white/50" />
                          <div>
                            <h4 className="text-xs font-semibold text-white">Sesi Akses & Keamanan</h4>
                            <p className="text-[10px] text-white/40 leading-relaxed mt-1 font-light">
                              Sesi editor Anda saat ini aktif. Jika Anda selesai mengedit atau menggunakan perangkat bersama, Anda dapat mengunci kembali menu kustomisasi ini agar tersembunyi sepenuhnya dari pengunjung biasa.
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (onLock) {
                              onLock();
                            }
                          }}
                          className="w-full flex items-center justify-center space-x-1.5 bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-semibold hover:bg-white/20 transition-all cursor-pointer"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Kunci Akses Editor (Keluar)</span>
                        </button>
                      </div>

                      {/* Reset defaults */}
                      <div className="rounded-xl border border-red-500/20 bg-red-500/[0.02] p-4 space-y-3">
                        <div className="flex items-start space-x-3 text-red-400">
                          <RotateCcw className="h-4 w-4 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-semibold text-white">Atur Ulang ke Default</h4>
                            <p className="text-[10px] text-red-400/80 leading-relaxed mt-1 font-light">
                              Menghapus seluruh kustomisasi yang telah disimpan di peramban ini dan memuat ulang konten template default secara utuh. Tindakan ini tidak dapat dibatalkan.
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm('Apakah Anda yakin ingin mengatur ulang data portfolio ke template default?')) {
                              onResetToDefault();
                              alert('Data portfolio telah diatur ulang ke default!');
                            }
                          }}
                          className="w-full flex items-center justify-center space-x-1.5 bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-semibold hover:bg-red-500/20 transition-all cursor-pointer"
                        >
                          <span>Atur Ulang ke Template Default</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer containing Simpan button */}
            <div className="flex items-center justify-between border-t border-white/10 bg-[#050505] px-6 py-4">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                Penyimpanan Lokal Aktif
              </span>
              <button
                onClick={handleSaveAll}
                className="flex items-center space-x-2 bg-white text-black hover:bg-transparent hover:text-white border border-transparent hover:border-white px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
