import { PortfolioData } from '../types';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: 'Budi Santoso',
    title: 'Creative Full-Stack Developer & UI Designer',
    bio: 'Saya adalah seorang Full-Stack Developer yang berfokus pada pembuatan pengalaman digital yang interaktif, berkinerja tinggi, dan indah secara visual. Menggabungkan estetika desain modern dengan kekuatan arsitektur kode yang bersih.',
    location: 'Jakarta, Indonesia',
    email: 'budi.santoso@email.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400'
  },
  projects: [
    {
      id: 'p1',
      title: 'Nusantara Food Finder',
      description: 'Platform pencarian dan kurasi kuliner tradisional Nusantara berbasis peta interaktif dan rekomendasi cerdas.',
      longDescription: 'Nusantara Food Finder dirancang untuk membantu pecinta kuliner menemukan hidangan legendaris tersembunyi di berbagai penjuru Indonesia. Menggunakan API peta canggih untuk navigasi langsung, sistem rating berbasis komunitas, dan filter komparatif untuk memudahkan pencarian berdasarkan bahan dasar, tingkat kepedasan, dan harga.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
      category: 'Web',
      tags: ['React', 'Node.js', 'Tailwind CSS', 'Mapbox API'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true
    },
    {
      id: 'p2',
      title: 'TaniHub Dashboard v2',
      description: 'Desain ulang dasbor analitik untuk pemantauan rantai pasok dan prediksi hasil panen petani lokal.',
      longDescription: 'Sebuah dasbor administrasi kompleks yang dirancang untuk menyederhanakan data logistik pertanian. Menyediakan visualisasi data real-time mengenai harga pasar, prediksi cuaca, volume pengiriman, serta analisis laba rugi bagi koperasi tani lokal.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      category: 'Design',
      tags: ['Figma', 'UI/UX Design', 'Design System', 'Prototyping'],
      demoUrl: 'https://example.com',
      githubUrl: '',
      featured: true
    },
    {
      id: 'p3',
      title: 'KopiKuy Mobile App',
      description: 'Aplikasi seluler pemesanan kopi kustom dengan pelacak waktu nyata dan program loyalitas berbasis gamifikasi.',
      longDescription: 'Aplikasi seluler berkinerja tinggi untuk memesan kopi dari kafe lokal. Menampilkan interaksi mikro yang halus, pelacak status barista real-time melalui WebSocket, integrasi gerbang pembayaran digital, dan elemen gamifikasi di mana pengguna mengumpulkan bibit kopi digital untuk ditukarkan dengan produk gratis.',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
      category: 'Mobile',
      tags: ['React Native', 'Expo', 'Redux Toolkit', 'Tailwind CSS'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false
    },
    {
      id: 'p4',
      title: 'Saraswati AI Assistant',
      description: 'Model pemrosesan bahasa alami (NLP) lokal untuk menganalisis dan merangkum dokumen naskah kuno nusantara.',
      longDescription: 'Saraswati AI memanfaatkan model bahasa besar (LLM) yang disesuaikan secara lokal untuk menerjemahkan, mengontekstualisasikan, dan merangkum dokumen sejarah serta naskah kuno berbahasa Jawa Kuno dan Sansekerta ke dalam bahasa Indonesia modern secara akurat.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      category: 'AI/Data',
      tags: ['Python', 'Hugging Face', 'FastAPI', 'Gemini API'],
      demoUrl: '',
      githubUrl: 'https://github.com',
      featured: true
    }
  ],
  experiences: [
    {
      id: 'e1',
      role: 'Senior Full-Stack Engineer',
      company: 'TechInovasi Digital',
      period: '2024 - Sekarang',
      description: 'Memimpin tim pengembang dalam membangun aplikasi web korporat berbasis mikroservis. Mengoptimalkan performa rendering halaman frontend hingga 40% dan merancang infrastruktur database yang scalable.',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker']
    },
    {
      id: 'e2',
      role: 'UI/UX Designer & Frontend Dev',
      company: 'Nusantara Creative Studio',
      period: '2022 - 2024',
      description: 'Merancang sistem desain (design system) produk dari tahap awal sketsa hingga komponen React yang dapat digunakan kembali. Berkolaborasi erat dengan manajer produk untuk mendefinisikan pengalaman pengguna terbaik.',
      skills: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion']
    },
    {
      id: 'e3',
      role: 'Junior Web Developer',
      company: 'Sinergi Solusindo',
      period: '2021 - 2022',
      description: 'Mengembangkan dan memelihara situs e-commerce klien menggunakan tumpukan teknologi modern. Menerapkan integrasi API pihak ketiga (payment gateway dan logistik pengiriman).',
      skills: ['JavaScript', 'HTML/CSS', 'PHP', 'MySQL']
    }
  ],
  skills: [
    { id: 's1', name: 'React / Next.js', category: 'Frontend', level: 90, iconName: 'Code' },
    { id: 's2', name: 'TypeScript', category: 'Frontend', level: 85, iconName: 'FileCode' },
    { id: 's3', name: 'Tailwind CSS', category: 'Frontend', level: 95, iconName: 'Sparkles' },
    { id: 's4', name: 'Node.js / Express', category: 'Backend', level: 80, iconName: 'Server' },
    { id: 's5', name: 'PostgreSQL & MongoDB', category: 'Backend', level: 75, iconName: 'Database' },
    { id: 's6', name: 'REST API & GraphQL', category: 'Backend', level: 85, iconName: 'Cpu' },
    { id: 's7', name: 'UI/UX Design (Figma)', category: 'Design', level: 80, iconName: 'Palette' },
    { id: 's8', name: 'Git & GitHub', category: 'Tools', level: 90, iconName: 'GitBranch' },
    { id: 's9', name: 'Docker & CI/CD', category: 'Tools', level: 70, iconName: 'Settings' }
  ]
};
