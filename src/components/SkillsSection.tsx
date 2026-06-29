import React from 'react';
import { motion } from 'motion/react';
import { Code, FileCode, Sparkles, Server, Database, Cpu, Palette, GitBranch, Settings, HelpCircle } from 'lucide-react';
import { Skill } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
  isEditing: boolean;
}

// Icon mapping dictionary to translate strings to React Components safely
const iconMap: Record<string, React.ComponentType<any>> = {
  Code,
  FileCode,
  Sparkles,
  Server,
  Database,
  Cpu,
  Palette,
  GitBranch,
  Settings
};

export default function SkillsSection({ skills, isEditing }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Design', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || HelpCircle;
    return <IconComponent className="h-4.5 w-4.5 text-white/60" />;
  };

  return (
    <section id="skills" className="relative py-20 bg-[#050505] border-y border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.01] via-transparent to-transparent -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-white/50 uppercase block">
            Keahlian Teknis
          </span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl mt-3">
            Teknologi & <span className="italic">Kompetensi Utama</span>
          </h2>
          <p className="font-sans text-sm text-white/50 mt-4 leading-relaxed font-light">
            Kombinasi bahasa pemrograman, kerangka kerja, dan alat yang saya kuasai untuk merealisasikan solusi digital berkualitas tinggi dari ujung ke ujung.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-white text-black'
                  : 'bg-transparent text-white/40 hover:text-white border border-white/10'
              }`}
            >
              {category === 'All' ? 'Semua' : category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative rounded-xl border border-white/5 bg-white/[0.01] p-5 hover:border-white/20 transition-all duration-300"
            >
              {/* Top Row: Icon and Name */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.03] border border-white/5 group-hover:border-white/10 transition-all">
                    {renderIcon(skill.iconName)}
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-medium text-white leading-tight">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-[9px] text-white/40 tracking-wider uppercase">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-light text-white/70">
                  {skill.level}%
                </span>
              </div>

              {/* Skill Progress Bar Container */}
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
                {/* Visual Silver Layer */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute top-0 bottom-0 left-0 rounded-full bg-white"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
