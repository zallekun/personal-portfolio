import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, Building2 } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceSectionProps {
  experiences: Experience[];
  isEditing: boolean;
}

export default function ExperienceSection({ experiences, isEditing }: ExperienceSectionProps) {
  return (
    <section id="experience" className="relative py-20 overflow-hidden bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-white/50 uppercase block">
            Riwayat Karir
          </span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl mt-3">
            Pengalaman <span className="italic">Profesional</span>
          </h2>
          <p className="font-sans text-sm text-white/50 mt-4 leading-relaxed font-light">
            Menelusuri kontribusi, peran kepemimpinan, dan perjalanan pemecahan masalah saya di berbagai perusahaan teknologi kreatif.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative mx-auto max-w-3xl">
          {/* Main timeline center/left vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-white/10 md:left-1/2 md:-ml-[0.5px]" />

          {/* Timeline Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#050505] border border-white/40 shadow-none md:left-1/2 md:-ml-4 z-10">
                    <Briefcase className="h-3.5 w-3.5 text-white/70" />
                  </div>

                  {/* Left / Right spacer for desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content container */}
                  <div className="pl-12 md:pl-0 md:w-1/2 md:px-8">
                    <div className="group relative rounded-xl border border-white/5 bg-white/[0.01] p-6 hover:border-white/25 transition-all duration-350">
                      {/* Period Badge */}
                      <span className="inline-flex items-center space-x-1.5 rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-white/70 border border-white/10 mb-4 font-medium">
                        <Calendar className="h-3 w-3 text-white/55" />
                        <span>{exp.period}</span>
                      </span>

                      <h3 className="font-sans text-base font-semibold text-white group-hover:text-white transition-colors">
                        {exp.role}
                      </h3>

                      <div className="flex items-center space-x-2 text-white/50 text-xs mt-1 mb-4">
                        <Building2 className="h-3.5 w-3.5 text-white/30" />
                        <span className="font-light tracking-wide text-white/60">{exp.company}</span>
                      </div>

                      <p className="font-sans text-xs text-white/55 leading-relaxed mb-4 font-light">
                        {exp.description}
                      </p>

                      {/* Stack used badges */}
                      {exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="font-mono text-[9px] uppercase tracking-wider bg-white/[0.03] text-white/50 border border-white/5 px-2 py-0.5 rounded-full hover:border-white/20 hover:text-white transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
