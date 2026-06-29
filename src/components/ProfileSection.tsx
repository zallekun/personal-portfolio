import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, MapPin, Mail, ArrowRight, Award, FolderKanban, CheckCircle } from 'lucide-react';
import { Profile, Project, Experience } from '../types';

interface ProfileSectionProps {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  isEditing: boolean;
  onNavigate: (section: string) => void;
}

export default function ProfileSection({
  profile,
  projects,
  experiences,
  isEditing,
  onNavigate
}: ProfileSectionProps) {
  // Compute interactive stats dynamically!
  const stats = [
    {
      id: 'stat-exp',
      label: 'Tahun Pengalaman',
      value: experiences.length > 0 ? `${experiences.length + 1}+` : '1+',
      icon: <Award className="h-5 w-5 text-white/60" />
    },
    {
      id: 'stat-proj',
      label: 'Proyek Selesai',
      value: projects.length > 0 ? `${projects.length}` : '0',
      icon: <FolderKanban className="h-5 w-5 text-white/60" />
    },
    {
      id: 'stat-done',
      label: 'Klien Puas',
      value: '100%',
      icon: <CheckCircle className="h-5 w-5 text-white/60" />
    }
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden bg-[#050505]">
      {/* Sleek architectural subtle lines/patterns instead of colorful blur */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Text content (7 cols on large screens) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex self-start items-center space-x-2 rounded-full bg-white/5 px-4 py-1 text-[11px] uppercase tracking-wider text-white/65 border border-white/10"
              >
                <span>✨ Mode Kustomisasi Aktif! Gunakan menu laci untuk mengedit teks ini.</span>
              </motion.div>
            )}

            <div className="space-y-4">
              <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-white/50 uppercase block">
                Selamat Datang di Portfolio Saya
              </span>
              <h1 className="font-serif text-5xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl">
                Halo, saya{' '}
                <span className="italic block mt-1 font-normal text-white">
                  {profile.name}
                </span>
              </h1>
              <p className="font-sans text-lg font-light tracking-wide text-white/70 uppercase border-l border-white/20 pl-4 py-1">
                {profile.title}
              </p>
            </div>

            <p className="font-sans text-base text-white/50 leading-relaxed max-w-xl font-light">
              {profile.bio}
            </p>

            {/* Location & Email Info cards */}
            <div className="flex flex-wrap gap-4 text-xs font-medium text-white/60 font-mono tracking-wider">
              <div className="flex items-center space-x-2 rounded-full bg-white/[0.03] border border-white/10 px-4 py-2">
                <MapPin className="h-3.5 w-3.5 text-white/50" />
                <span>{profile.location.toUpperCase()}</span>
              </div>
              <div className="flex items-center space-x-2 rounded-full bg-white/[0.03] border border-white/10 px-4 py-2">
                <Mail className="h-3.5 w-3.5 text-white/50" />
                <span>{profile.email.toUpperCase()}</span>
              </div>
            </div>

            {/* Social links & CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('projects')}
                className="group flex items-center space-x-3 bg-white text-black hover:bg-transparent hover:text-white border border-transparent hover:border-white px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all duration-300"
              >
                <span>Lihat Karya Saya</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center space-x-2">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-3 text-white/50 hover:text-white bg-transparent border border-white/10 hover:border-white/30 rounded-full transition-all"
                    title="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-3 text-white/50 hover:text-white bg-transparent border border-white/10 hover:border-white/30 rounded-full transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {profile.twitter && (
                  <a
                    href={profile.twitter}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-3 text-white/50 hover:text-white bg-transparent border border-white/10 hover:border-white/30 rounded-full transition-all"
                    title="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Visual card / Avatar (5 cols on large screens) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative">
              {/* Decorative minimal border layout */}
              <div className="absolute -inset-2 rounded-2xl border border-white/5 bg-transparent" />
              
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-2">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="h-80 w-80 object-cover rounded-xl md:h-96 md:w-96 grayscale brightness-95 hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float badge floating at bottom right */}
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-white/10 bg-black/90 p-4 backdrop-blur-md max-w-[200px] shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Status</p>
                    <p className="text-xs font-medium text-white">Tersedia untuk Kontrak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Showcase Stats Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-16 lg:mt-24 border-t border-white/10 pt-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className="flex items-center space-x-4 rounded-xl border border-white/5 bg-white/[0.01] p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-transparent border border-white/10">
                {stat.icon}
              </div>
              <div>
                <p className="font-serif text-3xl font-light text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="font-sans text-xs uppercase tracking-wider text-white/40 font-light">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
