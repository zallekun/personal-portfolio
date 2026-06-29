import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Folder, Eye, X, Compass } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  isEditing: boolean;
}

export default function ProjectsSection({ projects, isEditing }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = React.useState<Project | null>(null);

  const categories = ['All', 'Web', 'Mobile', 'Design', 'AI/Data'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-20 bg-[#050505] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-white/50 uppercase block">
            Portofolio Proyek
          </span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl mt-3">
            Karya <span className="italic">Unggulan Terbaru</span>
          </h2>
          <p className="font-sans text-sm text-white/50 mt-4 leading-relaxed font-light">
            Galeri beberapa produk digital yang pernah saya rancang, bangun, dan luncurkan. Dari purwarupa UI interaktif hingga aplikasi kecerdasan buatan skala penuh.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
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
              {category === 'All' ? 'Semua Proyek' : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/20 transition-all duration-350 shadow-none"
            >
              {/* Image & Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Dark Hover overlay with interactive icons */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="p-3 bg-white text-black rounded-full hover:scale-105 transition-all font-semibold cursor-pointer"
                    title="Lihat Detail"
                  >
                    <Eye className="h-4.5 w-4.5" />
                  </button>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="p-3 bg-black/90 text-white border border-white/20 rounded-full hover:border-white/40 hover:scale-105 transition-all"
                      title="GitHub Repository"
                    >
                      <Github className="h-4.5 w-4.5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="p-3 bg-black/90 text-white border border-white/20 rounded-full hover:border-white/40 hover:scale-105 transition-all"
                      title="Demo Langsung"
                    >
                      <ExternalLink className="h-4.5 w-4.5" />
                    </a>
                  )}
                </div>

                {/* Category Badge absolute at top left */}
                <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-black/80 px-3 py-1 text-[9px] uppercase tracking-wider font-semibold text-white border border-white/10 backdrop-blur-sm">
                  {project.category}
                </span>

                {/* Featured project badge at top right */}
                {project.featured && (
                  <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-[9px] font-bold text-black border border-transparent backdrop-blur-sm uppercase tracking-wider">
                    Unggulan
                  </span>
                )}
              </div>

              {/* Card Body content */}
              <div className="flex flex-1 flex-col p-6 space-y-4">
                <div className="flex items-center space-x-2 text-white/40">
                  <Folder className="h-3.5 w-3.5" />
                  <span className="font-mono text-[9px] font-semibold tracking-wider uppercase">
                    {project.tags.slice(0, 2).join(' • ')}
                  </span>
                </div>

                <div>
                  <h3 className="font-sans text-base font-medium text-white group-hover:text-white transition-all">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-white/55 mt-2 line-clamp-2 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] uppercase tracking-wider bg-white/[0.03] text-white/50 border border-white/5 px-2 py-0.5 rounded-full hover:border-white/20 hover:text-white transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card footer details action */}
                <div className="pt-4 mt-auto border-t border-white/5 flex justify-between items-center">
                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="text-[10px] uppercase tracking-[0.15em] font-medium text-white/60 hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>Detail Selengkapnya</span>
                    <Compass className="h-3.5 w-3.5 text-white/40" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal Overlay */}
        <AnimatePresence>
          {activeProjectModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              onClick={() => setActiveProjectModal(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#050505] p-6 md:p-8 shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-transparent border border-white/10 hover:border-white/30 rounded-full transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Modal Title and Details */}
                <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-white/50 mb-1 block">
                  Detail Proyek • {activeProjectModal.category}
                </span>
                <h3 className="font-serif text-2xl font-light text-white sm:text-3xl pr-10">
                  {activeProjectModal.title}
                </h3>

                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 my-6 bg-neutral-900">
                  <img
                    src={activeProjectModal.image}
                    alt={activeProjectModal.title}
                    className="h-full w-full object-cover grayscale brightness-95"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                  <h4 className="font-sans text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                    Tentang Proyek
                  </h4>
                  <p className="font-sans text-sm text-white/75 leading-relaxed font-light">
                    {activeProjectModal.longDescription || activeProjectModal.description}
                  </p>
                </div>

                {/* Stack Tags */}
                <div className="mt-6 space-y-2">
                  <h4 className="font-sans text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                    Teknologi Yang Digunakan
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] bg-white/[0.04] text-white/80 border border-white/10 px-3 py-1 rounded-full text-xs font-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link CTAs */}
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-white/5">
                  {activeProjectModal.demoUrl && (
                    <a
                      href={activeProjectModal.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center space-x-2 bg-white text-black hover:bg-transparent hover:text-white border border-transparent hover:border-white px-6 py-3 text-xs uppercase tracking-[0.15em] font-semibold rounded-full transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Kunjungi Demo Langsung</span>
                    </a>
                  )}
                  {activeProjectModal.githubUrl && (
                    <a
                      href={activeProjectModal.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center space-x-2 bg-transparent text-white border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.15em] font-semibold rounded-full transition-all hover:border-white hover:bg-white/[0.04]"
                    >
                      <Github className="h-4 w-4" />
                      <span>Source Code GitHub</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
