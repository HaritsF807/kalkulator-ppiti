# 🧮 Kalkulator PPITI — Backend API

Backend sederhana berbasis **Pure Node.js** (tanpa framework) untuk operasi matematika dasar.

---

## 📁 Struktur Folder

```
BE/
├── api/
│   ├── calculate.js       ← Serverless function (Vercel)
│   └── index.js           ← Root endpoint
├── controller/
│   └── calculatorController.js
├── routes/
│   └── calculatorRoutes.js
├── services/
│   └── calculatorService.js
├── .gitignore
├── package.json
├── server.js              ← Entry point (lokal)
├── test.js                ← Script test lokal
└── vercel.json            ← Konfigurasi routing Vercel
```

---

## ⚡ Menjalankan Secara Lokal

```bash
node server.js
```

Server berjalan di: `http://localhost:3000`

---

## 🧪 Test Lokal

```bash
node test.js
```

---

## 🌐 Endpoint

| Method | Path         | Deskripsi                        |
|--------|--------------|----------------------------------|
| GET    | `/`          | Cek status API                   |
| POST   | `/calculate` | Hitung operasi matematika        |

### Contoh Request — POST `/calculate`

```json
{
  "a": 10,
  "b": 5,
  "operator": "+"
}
```

### Contoh Response Sukses

```json
{
  "success": true,
  "data": {
    "a": 10,
    "b": 5,
    "operator": "+",
    "result": 15
  }
}
```

### Operator yang Didukung

| Operator | Fungsi        | Contoh            |
|----------|---------------|-------------------|
| `+`      | Penjumlahan   | 10 + 5 = 15       |
| `-`      | Pengurangan   | 10 - 5 = 5        |
| `*`      | Perkalian     | 10 * 5 = 50       |
| `/`      | Pembagian     | 10 / 5 = 2        |
| `%`      | Modulus       | 10 % 3 = 1        |
| `pow`    | Pemangkatan   | 2 pow 8 = 256     |
| `sqrt`   | Akar kuadrat  | 9 sqrt = 3 (b=null) |

> Untuk operator `sqrt`, field `b` tidak perlu diisi.

---

## 🚀 Deploy ke Vercel

### STEP 1 — Push ke GitHub

Buka terminal di folder **root project** (`kalkulator-ppiti`):

```bash
# Inisialisasi git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "feat: add BE Node.js kalkulator"

# Hubungkan ke repo GitHub
git remote add origin https://github.com/USERNAME/kalkulator-ppiti.git

# Push ke branch main
git push -u origin main
```

> Buat repo baru di [github.com/new](https://github.com/new) terlebih dahulu jika belum ada.  
> Nama repo: `kalkulator-ppiti` | Visibility: **Public**

---

### STEP 2 — Login ke Vercel

1. Buka **[vercel.com](https://vercel.com)**
2. Klik **"Sign Up"** → pilih **"Continue with GitHub"**
3. Authorize akses GitHub

---

### STEP 3 — Import Project

1. Di dashboard Vercel, klik **"Add New..."** → **"Project"**
2. Cari repo **`kalkulator-ppiti`** → klik **"Import"**

---

### STEP 4 — Konfigurasi Root Directory ⚠️

Karena BE berada di dalam subfolder, wajib diatur:

| Setting              | Nilai                              |
|----------------------|------------------------------------|
| **Framework Preset** | `Other`                            |
| **Root Directory**   | Klik **Edit** → ketik `BE` → ✅   |
| **Build Command**    | *(kosongkan)*                      |
| **Output Directory** | *(kosongkan)*                      |
| **Install Command**  | *(kosongkan)*                      |

---

### STEP 5 — Deploy

1. Klik tombol **"Deploy"**
2. Tunggu ±1 menit hingga muncul **"Congratulations! 🎉"**
3. Kamu mendapat URL live seperti:
   ```
   https://kalkulator-ppiti-be.vercel.app
   ```

---

### STEP 6 — Verifikasi Setelah Deploy

**Cek status API** — buka di browser:
```
https://kalkulator-ppiti-be.vercel.app/
```

**Test endpoint** — gunakan Postman / Thunder Client:
```
POST https://kalkulator-ppiti-be.vercel.app/calculate

Body (JSON):
{
  "a": 10,
  "b": 5,
  "operator": "+"
}
```

**Atau via PowerShell:**
```powershell
Invoke-RestMethod `
  -Uri "https://kalkulator-ppiti-be.vercel.app/calculate" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"a": 10, "b": 5, "operator": "+"}'
```

---

## 📋 Catatan

- `server.js` digunakan untuk menjalankan server **secara lokal** saja
- `api/` folder digunakan khusus untuk **Vercel Serverless Function**
- Tidak ada database — semua kalkulasi dilakukan **in-memory** dan langsung dikembalikan
- Tidak ada dependencies eksternal — cukup **Node.js bawaan**
