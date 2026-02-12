## 1. Gambaran Umum Aplikasi

**Anime Quiz Arena** adalah sebuah web-based quiz application bertema anime yang dibangun menggunakan teknologi modern. Aplikasi ini memungkinkan pengguna untuk mendaftar, login, dan menjalani kuis trivia seputar anime (khususnya kategori *Japanese Anime & Manga*) dengan sistem sesi yang persisten — artinya progress kuis tetap tersimpan meskipun pengguna menutup tab browser atau berpindah halaman.

---

## 2. Tech Stack

| Layer             | Teknologi                                                 |
| ----------------- | --------------------------------------------------------- |
| **Framework**     | Next.js 16 (App Router)                                   |
| **Language**      | TypeScript                                                |
| **Styling**       | Tailwind CSS v4                                           |
| **UI Library**    | Radix UI (primitives), Lucide React (icons)               |
| **Backend (BaaS)**| Supabase (PostgreSQL database + REST API)                 |
| **Auth**          | JWT (jose) + Cookies (js-cookie) — custom implementation  |
| **Form Handling** | React Hook Form + Zod (schema validation)                 |
| **HTTP Client**   | Axios (untuk fetch soal dari Open Trivia DB API)          |
| **Notification**  | React Hot Toast                                           |
| **Password**      | bcryptjs (hashing & comparison)                           |

---

## 3. Arsitektur & Struktur Folder

```
quizapptest/
├── app/                        # Next.js App Router (pages & layouts)
│   ├── (auth)/                 # Route Group — halaman autentikasi
│   │   ├── layout.tsx          # Shared layout untuk login & register
│   │   ├── login/page.tsx      # Halaman Login
│   │   └── register/page.tsx   # Halaman Register
│   ├── (gameplay)/             # Route Group — halaman gameplay
│   │   ├── quiz/[id]/page.tsx  # Halaman Quiz (dynamic route per session)
│   │   └── result/page.tsx     # Halaman Hasil Quiz
│   ├── dashboard/              # Dashboard area (dengan sidebar layout)
│   │   ├── layout.tsx          # Dashboard Layout (Sidebar + Main Content)
│   │   ├── page.tsx            # Dashboard Home
│   │   ├── leaderboard/       # Halaman Leaderboard (Coming Soon)
│   │   └── settings/          # Halaman Settings (Coming Soon)
│   ├── layout.tsx              # Root Layout
│   ├── page.tsx                # Landing Page
│   └── globals.css             # Global styles & Tailwind config
├── components/                 # Reusable UI components
│   ├── auth/                   # Komponen auth (AuthInput, AuthButton)
│   ├── dashboard/              # Komponen dashboard (StatCircle, UserCard, dll)
│   ├── quiz/                   # Komponen quiz (QuizTimer, AnswerOption, dll)
│   └── result/                 # Komponen result (RankBadge, StatsGrid, dll)
├── contexts/                   # React Context Providers
│   └── DashboardContext.tsx    # Context untuk state dashboard (auth + user)
├── hooks/                      # Custom React Hooks
│   ├── useAuth.ts              # Hook untuk autentikasi (session management)
│   ├── useQuiz.ts              # Hook untuk logika quiz (state + actions)
│   └── useUser.ts              # Hook untuk data user dari Supabase
├── services/                   # API/service layer
│   ├── quiz-service.ts         # CRUD quiz session + fetch soal dari API
│   └── userService.ts          # CRUD user ke Supabase
├── types/                      # TypeScript type definitions
│   ├── auth.ts                 # Tipe untuk auth context
│   ├── quiz.ts                 # Tipe untuk quiz (QuizQuestion, ShuffledAnswer, dll)
│   └── user.ts                 # Tipe untuk user
├── utils/                      # Utility functions
│   ├── auth.ts                 # JWT create/verify, cookie management
│   ├── decodeHTMLEntities.ts   # Decode HTML entities dari API response
│   └── hashPassword.ts         # bcrypt hash & compare
├── lib/                        # Library configurations
│   ├── supabase.ts             # Supabase client initialization
│   └── utils.ts                # General utility (cn helper untuk class merging)
└── proxy.ts                    # Middleware untuk route protection
```

---

## 4. Alur Pengguna (User Flow)

### 4.1. Landing Page (`/`)
- Halaman pertama yang dilihat user, menampilkan hero section dengan tagline *"Test Your Anime Knowledge"*
- Terdapat section kategori quiz (The Big Three, Neo Tokyo Trivia, dll) — saat ini sebagai showcase visual
- CTA utama: tombol **"Start Game"** yang mengarahkan ke halaman Login
- CTA footer: **"Create Free Account"** yang mengarahkan ke halaman Register

### 4.2. Registrasi (`/register`)
- User membuat akun dengan memasukkan **Codename** (username) dan **Access Key** (password)
- Validasi form menggunakan **Zod schema**:
  - Codename: minimal 3 karakter, maksimal 10 karakter
  - Password: minimal 6 karakter
  - Confirm Password: harus sama dengan password
- Password di-hash menggunakan **bcryptjs** sebelum disimpan ke Supabase
- Setelah berhasil, user diarahkan ke halaman Login

### 4.3. Login (`/login`)
- User memasukkan Codename dan Access Key
- Sistem memverifikasi kredensial:
  1. Mencari user berdasarkan codename dari database
  2. Membandingkan password menggunakan `bcryptjs.compareSync()`
  3. Jika valid, membuat **JWT token** (berlaku 7 hari) menggunakan library `jose`
  4. Token disimpan di **cookie** (`auth_token`)
- Setelah berhasil login, user diarahkan ke Dashboard

### 4.4. Route Protection (Middleware)
- File `proxy.ts` berfungsi sebagai middleware yang:
  - **Melindungi** rute `/dashboard`, `/quiz`, `/result` — redirect ke `/login` jika belum autentikasi
  - **Memblokir** akses ke `/login` dan `/register` jika sudah login — redirect ke `/dashboard`
- Verifikasi dilakukan dengan cara men-decode JWT dari cookie

### 4.5. Dashboard (`/dashboard`)
- Halaman utama setelah login
- Menampilkan:
  - **Hero Banner** dengan greeting *"Welcome back, Challenger"*
  - Tombol **Start Quiz** atau **Resume Quiz** (jika ada sesi yang belum selesai)
  - **Win Rate Statistics** (StatCircle, StatsGrid) — saat ini menggunakan data statis
- Sidebar navigasi menampilkan menu: Dashboard, Leaderboard, Settings, dan User Card
- State management menggunakan **DashboardContext** yang menggabungkan data auth dan user

### 4.6. Quiz Session (`/quiz/[id]`)
Ini adalah fitur inti dari aplikasi:

1. **Session Management:**
   - Setiap kali user memulai quiz, sistem membuat **quiz session** baru di tabel `quizSessions` Supabase
   - Session menyimpan: `user_id`, `current_index`, `correct_answers`, `time_remaining`, `is_completed`
   - Jika user sudah punya session yang belum selesai, tombol berubah menjadi "Resume Quiz"

2. **Fetch Soal:**
   - Soal diambil dari **Open Trivia Database API** (`opentdb.com`)
   - Kategori: Japanese Anime & Manga (category 31)
   - Jumlah: 20 soal multiple-choice (fallback ke 10 jika tidak cukup)
   - Rate limit handling: retry otomatis setelah 5 detik jika kena limit

3. **Gameplay Mechanics:**
   - Setiap soal memiliki **timer 90 detik**
   - Jawaban di-shuffle secara acak (A, B, C, D)
   - Sistem scoring: **100 poin + (streak × 10)** untuk jawaban benar
   - **Streak system**: jawaban benar berturut-turut meningkatkan bonus poin, streak reset jika salah
   - Visual feedback: warna hijau untuk jawaban benar, merah untuk salah

4. **Progress Persistence:**
   - Progress tersimpan otomatis setiap **1 detik** (interval)
   - Tersimpan saat user menutup tab (`beforeunload` event)
   - Tersimpan saat user switch tab (`visibilitychange` event)
   - Data yang disimpan: `current_index`, `correct_answers`, `time_remaining`
   - Menggunakan **React refs** untuk menghindari masalah stale closure pada event listeners

5. **Komponen UI Quiz:**
   - `QuizHeader` — progress bar, nomor soal, score, streak
   - `QuizTimer` — countdown timer visual (circular/linear)
   - `QuestionCard` — menampilkan pertanyaan
   - `AnswerOption` — tombol jawaban dengan state visual (default/selected/correct/wrong)
   - `QuizFooter` — tombol report

### 4.7. Halaman Hasil (`/result`)
- Ditampilkan setelah quiz selesai (semua soal dijawab atau waktu habis)
- Data diambil dari session quiz berdasarkan `quizId` di query parameter
- Menampilkan:
  - **Rank Badge** — ranking berdasarkan akurasi (menggunakan fungsi `calculateRank`)
  - **Result Heading** — judul dan pesan motivasi berdasarkan rank
  - **Stats Grid** — jumlah benar, jumlah salah, total soal, persentase akurasi
  - **Action Buttons** — "Retry" (buat session baru) dan "Home" (kembali ke Dashboard)

---

## 5. Pola Arsitektur & Best Practices yang Diterapkan

### 5.1. Component Architecture
- **Atomic/Modular Components**: UI dipecah menjadi komponen kecil yang reusable (`AuthInput`, `AuthButton`, `StatCircle`, `AnswerOption`, dll)
- **Barrel Exports**: Setiap folder komponen memiliki `index.ts` untuk clean imports
- **Separation of Concerns**: Logika bisnis dipisahkan ke custom hooks, API calls ke services, dan UI ke components

### 5.2. State Management
- **Custom Hooks Pattern**: `useQuiz()`, `useAuth()`, `useUser()` — encapsulate complex state logic
- **Context API**: `DashboardContext` untuk share state across dashboard pages
- **Refs for Event Handlers**: Menggunakan `useRef` untuk menghindari stale closure problem pada `beforeunload` dan interval callbacks

### 5.3. Type Safety
- TypeScript dengan **strict typing** pada interfaces (`QuizQuestion`, `ShuffledAnswer`, `UseQuizReturn`, `AuthContextType`)
- Zod schema validation untuk form inputs

### 5.4. Authentication
- **JWT-based auth** (stateless) — token disimpan di cookie, bukan localStorage
- **Middleware-level route protection** — mengecek token sebelum halaman dirender
- **Password hashing** menggunakan bcryptjs

### 5.5. Data Persistence
- **Supabase** sebagai Backend-as-a-Service (PostgreSQL)
- CRUD operations melalui Supabase client SDK
- Session-based quiz progress tracking

---

## 6. Fitur yang Masih dalam Pengembangan

| Fitur              | Status           | Keterangan                                               |
|--------------------|------------------|----------------------------------------------------------|
| Leaderboard        | 🔧 Coming Soon  | Halaman sudah ada, konten belum diimplementasi           |
| Settings           | 🔧 Coming Soon  | Halaman sudah ada, konten belum diimplementasi           |
| Win Rate Real Data | 📋 Planned      | Saat ini menggunakan data dummy (65%, 142 won, 84 lost)  |
| Multiple Categories| 📋 Planned      | Landing page menampilkan kategori, tapi belum fungsional |
| User Avatar        | 📋 Planned      | Fallback ke gambar default                               |

---

## 7. Aspek yang Diuji untuk Kandidat Frontend Intern

Aplikasi ini dirancang untuk mengevaluasi kemampuan kandidat dalam beberapa area:

### 🔹 **Fundamental React & Next.js**
- Pemahaman App Router (route groups, dynamic routes, layouts)
- Client vs Server Components (`'use client'` directive)
- React Hooks (`useState`, `useEffect`, `useRef`, `useCallback`, `useContext`)
- Custom Hooks pattern

### 🔹 **TypeScript**
- Definisi dan penggunaan interfaces/types
- Generic types
- Type safety pada props dan return values

### 🔹 **State Management**
- Local state management
- Context API pattern
- Refs vs State — kapan menggunakan yang mana

### 🔹 **Form Handling & Validation**
- React Hook Form integration
- Zod schema validation
- Error handling dan display

### 🔹 **API Integration**
- REST API consumption (Axios + Supabase SDK)
- Error handling & retry logic
- Async/await patterns

### 🔹 **Authentication & Security**
- JWT flow (create, verify, store)
- Cookie-based token management
- Route protection via middleware
- Password hashing

### 🔹 **UI/UX & Styling**
- Tailwind CSS v4 proficiency
- Responsive design (mobile sidebar, grid layouts)
- Glassmorphism, gradient, dan micro-animation
- Component-based design system

### 🔹 **Browser APIs & Edge Cases**
- `beforeunload` dan `visibilitychange` events
- Stale closure prevention menggunakan refs
- Timer management (`setInterval`, `clearInterval`)

---

## 8. Cara Menjalankan Aplikasi

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables (copy dari .env.example)
cp .env.example .env
# Isi dengan Supabase URL, Anon Key, dan JWT Secret

# 3. Jalankan development server
npm run dev

# 4. Buka di browser
# http://localhost:3000
```

### Environment Variables yang Dibutuhkan:
```env
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
NEXT_PUBLIC_JWT_SECRET=<your_jwt_secret>
```

---

## 9. Database Schema (Supabase)

### Tabel `users`
| Column     | Type      | Description               |
|------------|-----------|---------------------------|
| id         | int (PK)  | Auto-increment ID         |
| codename   | text      | Username/codename unik    |
| password   | text      | Hashed password (bcrypt)  |
| avatar     | text      | URL avatar (opsional)     |

### Tabel `quizSessions`
| Column          | Type      | Description                          |
|-----------------|-----------|--------------------------------------|
| id              | int (PK)  | Auto-increment session ID            |
| user_id         | int (FK)  | Referensi ke tabel users             |
| current_index   | int       | Index soal saat ini (0-based)        |
| correct_answers | int       | Jumlah jawaban benar                 |
| time_remaining  | int       | Sisa waktu dalam detik               |
| is_completed    | boolean   | Status apakah quiz sudah selesai     |

---

*Dokumen ini dibuat sebagai bagian dari evaluasi teknis untuk posisi Frontend Engineer Intern.*  
*© 2026 Anime Quiz Arena*
