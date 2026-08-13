# Macxfolio — local replica

Rekonstruksi lokal dari proyek Framer **Macxfolio copy**. Implementasi memakai React 19, TypeScript 7, Vite 8, Motion, GSAP, dan font variable lokal. Aset visual utama diambil dari proyek Framer yang diberikan dan disimpan di `public/assets`, jadi halaman utama tidak bergantung pada Framer saat dijalankan.

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://127.0.0.1:5173](http://127.0.0.1:5173).

Build production:

```bash
npm run build
npm run preview
```

## Interaksi

- Tunggu preloader Apple “hello” selesai.
- Double-click ikon desktop untuk membuka aplikasi; pada mobile cukup tap.
- Drag ikon desktop dan window ke posisi lain.
- Klik ikon dock untuk About, Projects, Gallery, Reel, dan Contact.
- Tekan `Esc` untuk menutup window paling depan.
- Window Music berisi iPod interaktif.
- Herding Cats memuat game aslinya melalui iframe.
- Toggle “You like cats?” mengaktifkan sprite Neko yang mengikuti pointer.

Rincian audit sumber dan mapping implementasi tersedia di [AUDIT.md](./AUDIT.md).
