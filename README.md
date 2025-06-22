# Proyek Chatbot Sederhana dengan Gemini AI

Ini adalah proyek chatbot sederhana yang menggunakan API Google Gemini untuk memberikan respons cerdas. Aplikasi ini dibangun dengan Node.js dan Express di sisi backend, serta HTML, CSS, dan JavaScript standar di sisi frontend.

## Fitur

- Antarmuka obrolan yang simpel dan bersih.
- Terhubung langsung dengan model `gemini-1.5-flash` dari Google.
- Mudah untuk dijalankan dan dimodifikasi.

## Prasyarat

Pastikan Anda sudah menginstal:
- Node.js (versi 18 atau lebih baru direkomendasikan)
- npm (biasanya terinstal bersama Node.js)

## Instalasi dan Pengaturan

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/artien/gemini-ai-chatbot-project.git
    cd gemini-ai-chatbot-project
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Buat file `.env`:**
    Buat sebuah file baru di direktori utama proyek dengan nama `.env`.

4.  **Tambahkan Kunci API Gemini Anda:**
    Buka file `.env` dan tambahkan kunci API Anda seperti di bawah ini. Ganti `KUNCI_API_ANDA_DISINI` dengan kunci API yang Anda dapatkan dari Google AI Studio.
    ```
    GEMINI_API_KEY=KUNCI_API_ANDA_DISINI
    ```

## Menjalankan Aplikasi

Untuk memulai server, jalankan perintah berikut di terminal:
```bash
node index.js
```

Setelah server berjalan, buka browser web Anda dan kunjungi `http://localhost:3000` untuk mulai berinteraksi dengan chatbot.

