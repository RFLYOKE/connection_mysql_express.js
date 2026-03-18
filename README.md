# Tugas 1 Arsitektur Backend - Express MySQL User CRUD

REST API sederhana untuk manajemen Pengguna (CRUD) yang dibangun menggunakan **Node.js**, **Express.js**, dan database **MySQL**.

---

## 📋 Fitur (Endpoint)

Aplikasi memiliki endpoint berikut yang terfokus pada _resource_ `/users`:

| Metode | Rute           | Deskripsi                       |
| ------ | -------------- | ------------------------------- |
| GET    | `/users`       | Mengambil daftar semua pengguna |
| POST   | `/users`       | Menambahkan pengguna baru       |
| PUT    | `/users/:id`   | Memperbarui data pengguna       |
| DELETE | `/users/:id`   | Menghapus data pengguna         |

> **Catatan Struktur Data (MySQL):**
> *   `id` : INT AUTO_INCREMENT [Primary Key]
> *   `name` : VARCHAR(100)
> *   `email` : VARCHAR(100) (UNIQUE)

---

## 🚀 Persyaratan Sistem

Sebelum menjalankan project ini, pastikan Anda telah menginstal:
*   [Node.js](https://nodejs.org/) (Project berjalan dengan npm)
*   [MySQL Server](https://dev.mysql.com/downloads/mysql/) atau bundle software seperti [XAMPP](https://www.apachefriends.org/)

---

## 🛠️ Cara Instalasi & Setup

**1. Unduh / Buka Direktori**
Pastikan Anda berada di direktori project:
```bash
cd "apb_api_2311103096_Akmal Rafly Dzunurain_S1SI-07-B"
```

**2. Instal seluruh dependensi (npm)**
```bash
npm install
```

**3. Konfigurasi Sistem (_Environment Variables_)**
Buatlah file bernama `.env` di _root_ folder (sejajar dengan file `package.json`), dan isi dengan kredensial database MySQL Anda:
```env
DB_HOST=localhost
DB_PORT=3307      # Sesuaikan port MySQL Anda (biasanya 3306 atau 3307)
DB_USER=root      # Username MySQL
DB_PASSWORD=      # Password MySQL (Kosongkan jika tidak ada password)
DB_NAME=tugas1
PORT=3000
```

---

## 🗄️ Database: Migrasi & Sample Data (Seeding)

Anda tidak perlu mengkonfigurasi tabel dan database secara manual menggunakan _phpMyAdmin_. Jalankan script migrasi otomatis berikut yang akan membuatkan database, tabel, serta data sampel:

```bash
npm run db:migrate
```

*(Script ini otomatis membaca kredensial di `.env`, mengecek dan membuat DB `apb_api_db`, tabel `users`, lalu memasukkan beberapa baris data `dummy` ke sana).*

---

## 💻 Cara Menjalankan Server (Start)

**Mode Development** (_Auto-reload_ saat file berubah menggunakan `nodemon`):
```bash
npm run dev
```

**Mode Standard** (_Single run_ langsung menggunakan node):
```bash
node src/index.js
```

Server Anda sekarang sudah menyala dan dapat diakses melalui browser atau aplikasi API di alamat **`http://localhost:3000`**.

---

## 💡 Contoh Pengujian API

Gunakan Rest Client seperti **Postman**, **Insomnia**, atau ekstensi VSCode seperti **Thunder Client**. _Pastikan untuk mengirim dan menerima JSON_.

### POST /users (Tambah Data)
*   **Aksi:** Body -> Raw -> JSON
*   **Payload:**
```json
{
  "name": "Orang Keren",
  "email": "orangkeren@example.com"
}
```

### PUT /users/:id (Edit Data)
*   **Target:** `http://localhost:3000/users/1`
*   **Payload:**
```json
{
  "name": "Admin Baru",
  "email": "adminbaru@example.com"
}
```
