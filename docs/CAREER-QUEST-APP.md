# We Will Shine - Career Quest App

## 🌟 Overview

**We Will Shine - Career Quest** adalah aplikasi web interaktif untuk siswa kelas 7D Putri yang dirancang sebagai hadiah spesial dari Bu Guru. Aplikasi ini membantu siswa mengeksplorasi karir teknologi masa depan dengan perspektif Islam, lengkap dengan gamifikasi, AI Mentor, dan motivasi personal.

## ✨ Fitur Utama

### 1. **Unlock System dengan Kode Coklat** 🍫

- Setiap siswa mendapat kode unik (format: `INSPIRE2025XXX`)
- Kode tercetak di sticker coklat hadiah
- Login personal dengan progress tersimpan di localStorage

### 2. **8 Karir Teknologi dengan Nilai Islam** 🎯

- Software Developer
- UI/UX Designer
- Data Analyst
- Digital Marketing Specialist
- Cybersecurity Specialist
- AI/ML Engineer
- Content Creator & Educator
- Islamic Tech Entrepreneur

Setiap karir dilengkapi dengan:

- ✅ Deskripsi lengkap
- ✅ Skills yang dibutuhkan
- ✅ Jalur karir (career path)
- ✅ Demand pasar & range gaji
- ✅ **Nilai Islam dalam profesi**

### 3. **Personality Quiz & Motivasi Personal** 🧠

- 6 pertanyaan kepribadian
- Analisis traits (creative, analytical, tech, social, leader, builder)
- Motivasi personal khusus berdasarkan hasil quiz
- Next steps yang actionable

### 4. **AI Mentor Chat** 🤖

- Chat interaktif tentang karir
- Respons kontekstual untuk:
  - Pertanyaan tentang profesi
  - Tips belajar
  - Motivasi
  - Teknologi & Islam
- Quick questions untuk kemudahan

### 5. **Dream Board** ✨

- Tulis dan simpan impian-impian
- Visual board dengan warna-warni
- Tracking jumlah impian
- Motivasi untuk mewujudkan mimpi

### 6. **Gamifikasi Lengkap** 🏆

- **Points System**: Earn points dari aktivitas
- **Level System**: Level up setiap 100 points
- **8 Achievements** yang bisa di-unlock:
  - 🥇 First Explorer
  - 📝 Quote Master
  - 🎯 Career Explorer
  - 🤖 AI Chatter
  - ✨ Dream Builder
  - 🧠 Quiz Master
  - 🌟 Career Master
  - ⭐ Rising Star

### 7. **Daily Features** 📅

- Quote motivasi yang bisa di-refresh
- Mood tracker (5 emoji moods)
- Progress tracking visual

## 🎨 Design & UX

### Color Scheme

- **Primary**: Purple (#9333EA) - Inspirasi & Wisdom
- **Secondary**: Pink (#EC4899) - Kreativitas & Youth
- **Accent**: Gradients (purple-to-pink, blue-to-cyan, dll)

### Typography

- Clean, modern, readable
- Font sizes optimized untuk mobile

### Animations

- Smooth transitions
- Hover effects pada cards
- Bounce animations untuk achievements
- Fade-in untuk dynamic content

## 📊 Data Structure

### Students (22 Siswa)

```typescript
{
	id: string; // slug
	name: string; // FULL NAME
	code: string; // INSPIRE2025XXX
}
```

### User Progress (LocalStorage)

```typescript
{
  studentCode: string;
  studentId: string;
  studentName: string;
  points: number;
  level: number;
  exploredCareers: number[];
  achievements: Achievement[];
  dreams: Dream[];
  quoteCount: number;
  chatCount: number;
  quizCompleted: boolean;
  quizAnswers: string[];
  personalMotivation: string;
}
```

## 🛠️ Tech Stack

- **Framework**: SvelteKit 2.0 (Svelte 5)
- **Styling**: TailwindCSS 4.x
- **State Management**: Svelte Stores + LocalStorage
- **Deployment**: GitHub Pages (Static Site)
- **Testing**: Playwright (E2E)

## 📱 Responsive Design

- ✅ Mobile First
- ✅ Tablet optimized
- ✅ Desktop enhanced
- ✅ Touch-friendly interactions

## 🚀 How to Use

### For Students:

1. Terima coklat hadiah dari Bu Guru
2. Buka link: `https://itif-syuhada.github.io/we-will-shine/`
3. Klik "Mulai Petualangan"
4. Masukkan kode dari sticker coklat
5. Explore, learn, and have fun! 🎉

### For Teachers:

Kode untuk setiap siswa:

- ADINDA SALSABILA → `INSPIRE2025AS`
- AISYA JASMINE NURMANA → `INSPIRE2025AJN`
- (dst... lihat file `src/lib/data/students.ts`)

## 💝 Islamic Values Integration

Setiap fitur dirancang dengan nilai-nilai Islam:

- **Ilmu sebagai Ibadah**: Menuntut ilmu adalah kewajiban
- **Teknologi untuk Kebaikan**: Tools untuk bermanfaat bagi umat
- **Amanah Digital**: Menjaga integritas dan tanggung jawab
- **Dakwah Modern**: Menggunakan teknologi untuk kebaikan

## 📈 Gamification Flow

```
Login (+50 points)
  → Explore Careers (+25 points each)
    → Chat AI (+10 points each)
      → Add Dreams (+20 points each)
        → Complete Quiz (+100 points)
          → Unlock Achievements!
```

## 🎯 Educational Goals

1. **Career Awareness**: Kenalan dengan profesi teknologi
2. **Self Discovery**: Pahami kekuatan dan minat diri
3. **Inspiration**: Termotivasi untuk mengejar mimpi
4. **Islamic Perspective**: Lihat karir dari sudut pandang Islam
5. **Future Planning**: Mulai rencanakan langkah konkret

## 🔮 Future Enhancements (Optional)

- [ ] Real-time AI dengan Gemini/OpenAI API
- [ ] Backend dengan Supabase untuk cloud storage
- [ ] Social features (share dreams dengan teman)
- [ ] Mentor video content
- [ ] Career roadmap generator
- [ ] Resource library (courses, books, articles)

## 📝 Notes for Ustadz & Ustadzah

Aplikasi ini dirancang dengan cinta dan harapan agar murid-murid:

- Menemukan passion mereka
- Termotivasi untuk belajar
- Punya visi jelas untuk masa depan
- Memahami bahwa teknologi bisa digunakan untuk kebaikan

Progress mereka tersimpan otomatis di browser, jadi mereka bisa kembali kapan saja!

## 🙏 Pesan Penutup

"Hadiah ini lebih dari sekadar aplikasi - ini adalah investasi untuk masa depan cerah kalian. Setiap fitur dirancang untuk menginspirasi, memotivasi, dan membimbing kalian menuju mimpi setinggi langit.

Bu Guru percaya pada potensi luar biasa yang kalian miliki. Keep learning, keep growing, dan jadilah generasi yang membawa perubahan positif untuk umat dan dunia.

Barakallahu fiikum! 🌟💝"

---

**Created with ❤️ by Ustadz & Ustadzah**
**October 2025**
