# Audit Framer — Macxfolio copy

Audit dilakukan pada proyek `VHRWaAPyfoTVhRLCAQ55`, halaman `/`, melalui struktur canvas, komponen, CMS, code components, aset, screenshot breakpoint, dan konfigurasi motion dari Framer.

## Struktur dan breakpoint

- Desktop: `min-width: 1400px`, canvas referensi `1400 × 800`.
- Tablet: `810–1399.98px`, canvas referensi `810 × 1080`.
- Phone: `max-width: 809.98px`, canvas referensi `390 × 844`.
- Semua breakpoint memakai tinggi `100vh`, overflow clip, wallpaper yang sama, dan page transition spring `500 / 60 / 1`.
- Desktop memakai penempatan ikon bebas/absolute; phone beralih menjadi grid tiga kolom.

## Tipografi

- Font proyek: Inter, Mona Sans, Inter Display, Geist.
- Nama brand: Mona Sans 500, 16px, letter-spacing `-0.04em`.
- Label ikon desktop: Mona Sans 500, 16px, line-height 130%, letter-spacing `-0.2px`.
- Label ikon tablet: 13px; phone: 12px.
- Font disertakan sebagai package variable lokal, bukan request runtime ke Google Fonts.

## Warna dan material

- Wallpaper asli: `WQXZydZdQpBJUrzYn7dlVOwzAVk.png`.
- Top bar: `rgba(87,87,87,.12)`, border bawah putih 39%, padding 12px.
- Dock: `350 × 78`, padding 9px, radius 16px, fill putih 16%, border `rgba(230,230,235,.25)`, backdrop blur.
- Window memakai chrome macOS: title bar 54px, separator `#e6e6e6`, traffic light merah/kuning/hijau, radius 16px.

## Motion yang dipetakan

- Preloader terdiri dari tiga variant.
  - SVG “hello” memakai dua path asli dari code component Framer.
  - Path pertama digambar 0.8 detik.
  - Path kedua mulai 0.7 detik dan digambar 2.8 detik.
  - Variant kedua menunggu 3.1 detik, lalu curtain runtuh menjadi 2px selama 0.6 detik dengan kurva cubic-bezier sumber.
- Ikon desktop muncul dengan opacity `0 → 1`, scale `.97 → 1`, spring physics `300 / 100 / .1`, delay 3.6 detik.
- Ikon dapat di-drag bebas, tanpa snap-back dan tanpa momentum.
- Hover ikon naik 2px dengan spring `400 / 100 / 7.6`.
- Window overlay masuk dari scale `.8`, opacity 0, spring `400 / 30 / 1`.
- Dock tooltip muncul di atas ikon; ikon memakai transisi spring dan ukuran sumber 60px/56px.
- Konfigurasi reduced-motion dihormati.

## Konten dan aset

- Delapan aset aplikasi desktop sumber: Tips, Framer, Music, Resume, Herding Cats, Interstellar, Figma, Resources.
- Lima aset dock sumber: About, Projects, Gallery, Reel, Contact.
- Enam item CMS `Works`: Laver, Atria, Plinq, Nexmind, Sorae, Veyra.
- Project type dan tahun dipertahankan dari CMS.
- Dua belas gambar `Life Dump — Gallery` dipertahankan dari komponen window sumber.
- Portrait About/Home dipertahankan dari proyek.
- Sprite Neko asli digunakan sebagai CSS sprite sheet 8×4, dengan frame arah gerak yang mengikuti mapping code component sumber.

## Fitur lokal yang direkonstruksi

- Desktop bebas dengan draggable app icons.
- Mobile grid tiga kolom dan dock mobile.
- Window manager: focus ordering, drag, close, dan `Esc`.
- About, Projects, project detail, Gallery, Reel, Contact form, Resume, Resources, Movies/Series, Tips.
- iPod UI interaktif dengan menu, daftar lagu, previous/next, play/pause.
- Herding Cats memakai endpoint game yang sama dengan code component Framer.
- Neko follow-pointer dengan toggle yang sama secara konseptual.

## Verifikasi

- `npm run build`: lulus.
- TypeScript strict: lulus.
- Vite production build: lulus.
- Dependency audit: 0 vulnerability.
- Dev server merespons HTTP 200 di `127.0.0.1:5173`.
- Aset lokal terdeteksi: 40 file.
