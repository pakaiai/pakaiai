# Pakai.AI — Motion Design Intro

Video intro 75 detik (1920×1080) untuk pakaiai.id. Dibangun dengan HTML/CSS + Three.js,
lalu direkam frame demi frame menjadi `pakaiai-intro.mp4`.

## Alur scene

| Waktu | Scene | Isi |
|---|---|---|
| 0:00–0:08 | Logo 3D | Logo Pakai.AI 3D terbang masuk, cincin orbit, partikel berkumpul. Lubang logo membesar menjadi portal ke homepage |
| 0:07–0:17 | Homepage | Browser pakaiai.id, hero, statistik, scroll ke Layanan, kursor klik |
| 0:16–0:25 | Menu layanan | AI Readiness Audit · Pelatihan AI Generatif · Otomasi Bisnis |
| 0:25–0:39 | Chat WhatsApp | Klien kirim profil perusahaan, rencana peserta, topik training, tujuan. Checklist tercentang |
| 0:38–0:49 | AUDIT | Zoom Meeting (discovery session) + Google Formulir, lalu kartu Hasil Audit |
| 0:49–0:58 | Metodologi A.I.A.T | Audit → Implement → Adopt → Train + loop Optimize, zoom ke "T" |
| 0:58–1:07 | Training | Layar workshop live, peserta, skor pre/post test, sertifikat |
| 1:07–1:15 | Penutup | Logo 3D kembali, tagline, layanan, CTA pakaiai.id & WhatsApp |

## Menonton langsung

Buka `index.html` di browser. Spasi untuk putar/jeda, panah kiri/kanan untuk loncat 5 detik.

## Render ulang ke MP4

```bash
npm i playwright            # atau pakai playwright global
node render.mjs pakaiai-intro.mp4 30
# preview beberapa frame:
PREVIEW="4,12,30" node render.mjs
```

Butuh `ffmpeg` di PATH (atau set `FFMPEG=/path/ke/ffmpeg`).

Catatan: nama klien "PT Arunika Logistik" dan angka di scene chat, audit, dan training
adalah contoh ilustrasi, bukan data klien nyata.
