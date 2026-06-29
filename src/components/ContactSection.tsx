import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail, MapPin, Github, Linkedin, Instagram, MessageSquareWarning } from 'lucide-react';
import { Profile, ContactMessage } from '../types';

interface ContactSectionProps {
  profile: Profile;
  onSendMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'unread'>) => void;
}

export default function ContactSection({ profile, onSendMessage }: ContactSectionProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Nama lengkap wajib diisi.';
    if (!formData.email.trim()) {
      errors.email = 'Email wajib diisi.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format email tidak valid.';
    }
    if (!formData.subject.trim()) errors.subject = 'Subjek pesan wajib diisi.';
    if (!formData.message.trim()) errors.message = 'Isi pesan tidak boleh kosong.';
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Halo Rezal,%0D%0A%0D%0ANama: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.message}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 800);
  };

  return (
    <section id="contact" className="relative py-20 bg-[#050505] border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/[0.01] via-transparent to-transparent -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-white/50 uppercase block">
            Hubungi Saya
          </span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl mt-3">
            Mulai <span className="italic">Hubungan Kerja Sama</span>
          </h2>
          <p className="font-sans text-sm text-white/50 mt-4 leading-relaxed font-light">
            Apakah Anda memiliki proyek menarik, tawaran pekerjaan, atau hanya sekedar ingin menyapa? Kirimkan pesan langsung melalui formulir di bawah ini!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Quick contact side info */}
          <div className="lg:col-span-5 flex flex-col space-y-8 justify-center">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-light text-white tracking-tight">
                Mari <span className="italic">Diskusikan Proyek Anda</span>
              </h3>
              <p className="font-sans text-xs text-white/50 leading-relaxed font-light">
                Saya selalu terbuka untuk mendiskusikan desain UI yang inovatif, pengembangan web mutakhir, kolaborasi kecerdasan buatan, atau penyelesaian solusi digital kreatif Anda.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.03] border border-white/5 text-white/60">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-0.5 font-mono">Email Langsung</p>
                  <a href={`mailto:${profile.email}`} className="text-xs text-white hover:text-white/80 transition-colors font-mono tracking-wider">
                    {profile.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.03] border border-white/5 text-white/60">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-0.5 font-mono">Domisili Kantor</p>
                  <p className="text-xs text-white font-mono tracking-wider uppercase">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-4 font-mono">Sosial Media Lainnya</p>
              <div className="flex items-center space-x-3">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-3 text-white/50 hover:text-white bg-transparent border border-white/10 hover:border-white/30 rounded-full transition-all"
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
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {profile.instagram && (
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-3 text-white/50 hover:text-white bg-transparent border border-white/10 hover:border-white/30 rounded-full transition-all"
                    title="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Form Side card */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 hover:border-white/15 transition-all duration-350">
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 mb-6"
                    >
                      <CheckCircle2 className="h-6 w-6" />
                    </motion.div>
                    <h3 className="font-sans text-base font-semibold text-white">
                      Pesan Terkirim dengan Sukses!
                    </h3>
                    <p className="font-sans text-xs text-white/55 mt-2 max-w-sm leading-relaxed font-light">
                      Terima kasih atas pesan Anda. Saya telah menerimanya dan akan merespons secepat mungkin ke alamat email yang Anda berikan.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold font-mono">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Masukkan nama Anda"
                          className={`w-full rounded-md bg-white/[0.02] border ${
                            formErrors.name ? 'border-red-500/35 focus:border-red-500/70 bg-red-500/[0.01]' : 'border-white/10 focus:border-white/40 focus:bg-white/[0.04]'
                          } px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-all font-light`}
                        />
                        {formErrors.name && (
                          <p className="text-[10px] text-red-400 flex items-center gap-1 font-mono uppercase tracking-wider mt-1">
                            <MessageSquareWarning className="h-3.5 w-3.5" />
                            <span>{formErrors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold font-mono">
                          Alamat Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="nama@perusahaan.com"
                          className={`w-full rounded-md bg-white/[0.02] border ${
                            formErrors.email ? 'border-red-500/35 focus:border-red-500/70 bg-red-500/[0.01]' : 'border-white/10 focus:border-white/40 focus:bg-white/[0.04]'
                          } px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-all font-light`}
                        />
                        {formErrors.email && (
                          <p className="text-[10px] text-red-400 flex items-center gap-1 font-mono uppercase tracking-wider mt-1">
                            <MessageSquareWarning className="h-3.5 w-3.5" />
                            <span>{formErrors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold font-mono">
                        Subjek Pesan
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Ada kolaborasi proyek, lowongan kerja, dll..."
                        className={`w-full rounded-md bg-white/[0.02] border ${
                          formErrors.subject ? 'border-red-500/35 focus:border-red-500/70 bg-red-500/[0.01]' : 'border-white/10 focus:border-white/40 focus:bg-white/[0.04]'
                        } px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-all font-light`}
                      />
                      {formErrors.subject && (
                        <p className="text-[10px] text-red-400 flex items-center gap-1 font-mono uppercase tracking-wider mt-1">
                          <MessageSquareWarning className="h-3.5 w-3.5" />
                          <span>{formErrors.subject}</span>
                        </p>
                      )}
                    </div>

                    {/* Message body */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase tracking-wider text-white/40 font-semibold font-mono">
                        Isi Pesan Anda
                      </label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Ketik detail proyek Anda secara singkat di sini..."
                        className={`w-full rounded-md bg-white/[0.02] border ${
                          formErrors.message ? 'border-red-500/35 focus:border-red-500/70 bg-red-500/[0.01]' : 'border-white/10 focus:border-white/40 focus:bg-white/[0.04]'
                        } px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-all resize-none font-light`}
                      />
                      {formErrors.message && (
                        <p className="text-[10px] text-red-400 flex items-center gap-1 font-mono uppercase tracking-wider mt-1">
                          <MessageSquareWarning className="h-3.5 w-3.5" />
                          <span>{formErrors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center space-x-3 bg-white text-black hover:bg-transparent hover:text-white border border-transparent hover:border-white disabled:opacity-40 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all duration-350 cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan'}</span>
                      <Send className={`h-3.5 w-3.5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
