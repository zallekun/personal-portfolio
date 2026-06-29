# Minimalist Cosmic Portfolio & Live Editor

Portfolio personal minimalis dengan desain premium bernuansa gelap (Cosmic Noir), dibangun menggunakan **React (Vite)**, **Tailwind CSS**, dan **Framer Motion** untuk animasi mikro yang responsif dan elegan.

Portfolio ini dilengkapi dengan fitur **Live Editor** tersembunyi yang memungkinkan Anda untuk mengubah konten secara langsung dari browser, menguji perubahannya secara instan, lalu menyalin atau mengunduh data kustomisasi tersebut dalam format JSON untuk diperbarui ke dalam kode sumber Anda.

---

## ✨ Fitur Utama

- **Premium Dark Aesthetics**: Desain modern berbasis tipografi serif (Playfair/Georgia) dan sans-serif (Inter) yang elegan dengan kontras visual tinggi dan ruang kosong (*negative space*) yang seimbang.
- **Micro-Animations**: Transisi antarbagian dan efek hover interaktif yang ditenagai oleh Framer Motion.
- **Fully Responsive**: Penyesuaian tata letak yang mulus di berbagai ukuran layar (Desktop, Tablet, dan Mobile).
- **Interactive Sandbox & Contact Box**: Formulir kontak interaktif yang mengirimkan pesan langsung ke Inbox lokal Anda (disimpan di `localStorage`).
- **Secret Backdoor Access Editor**:
  - Tombol **Sesuaikan** tersembunyi secara default untuk pengunjung biasa jika dipublikasikan di platform statis seperti **GitHub Pages**.
  - **Akses Rahasia**:
    - **Keyboard Shortcut**: Tekan kombinasi tombol `Ctrl + Shift + E` (atau `Cmd + Shift + E` di macOS).
    - **Mobile/Touch Backdoor**: Ketuk nama Anda di bagian Footer sebanyak **5 kali** berturut-turut dalam waktu 2 detik.
  - **PIN Gate Security**: Editor dilindungi dengan PIN Gate sederhana (PIN default: `2026`).
- **Easy Deployment Updates**: Setelah masuk ke mode editor, Anda dapat menyesuaikan konten, lalu masuk ke tab **Sistem** untuk **Salin JSON** atau **Unduh JSON**. Tempel kode tersebut ke repositori lokal Anda untuk pembaruan permanen yang cepat.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Memulai Pengembangan Lokal

Untuk menjalankan proyek ini di mesin lokal Anda:

### 1. Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi 18 atau lebih baru) di komputer Anda.

### 2. Instalasi Dependensi
Jalankan perintah berikut untuk mengunduh semua library yang diperlukan:
```bash
npm install
```

### 3. Jalankan Dev Server
Mulai server pengembangan lokal Anda:
```bash
npm run dev
```
Aplikasi akan dapat diakses di browser Anda melalui alamat default `http://localhost:3000` atau port lain yang tersedia.

### 4. Build untuk Production
Gunakan perintah ini untuk membuat build statis yang dioptimalkan untuk hosting (seperti GitHub Pages atau Vercel):
```bash
npm run build
```
Hasil kompilasi akan berada di folder `/dist` yang siap dideploy ke penyedia hosting statis pilihan Anda.

---

## 🔒 Konfigurasi Keamanan & Kustomisasi Konten

### Mengubah Konten Default Secara Permanen
Konten portfolio awal dimuat dari file data statis. Untuk memperbarui portfolio Anda secara permanen:
1. Jalankan aplikasi di browser (lokal atau live).
2. Gunakan shortcut rahasia (`Ctrl + Shift + E`) atau ketuk nama Anda di footer 5 kali untuk membuka pintu belakang.
3. Masukkan PIN keamanan default: **`2026`**.
4. Lakukan kustomisasi (Ganti Nama, Foto Profil, Keahlian, Proyek, Pengalaman, dll).
5. Masuk ke Tab **Sistem** di laci kustomisasi sebelah kanan, klik **Salin JSON** atau **Unduh JSON**.
6. Ganti isi data di file `src/data/defaultData.ts` dengan data JSON yang baru saja Anda salin.
7. Simpan dan unggah perubahan tersebut ke repositori GitHub Anda.

### Mengubah PIN Keamanan Default
Untuk mengubah kode PIN default dari `2026` ke PIN pilihan Anda, edit baris berikut di file `src/App.tsx`:
```typescript
const CORRECT_PIN = '2026'; // Ganti dengan PIN 4-digit pilihan Anda
```

---

## 📄 Lisensi

Proyek ini dibuat dan dilisensikan di bawah lisensi MIT. Anda bebas memodifikasi dan membagikannya untuk keperluan portfolio pribadi Anda.
