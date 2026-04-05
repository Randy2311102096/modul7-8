🧩 1. Gambaran Umum Program

Program ini adalah aplikasi web sederhana berbasis CRUD (Create, Read, Update, Delete) yang digunakan untuk mengelola data pengguna (nama dan email).

Aplikasi terdiri dari:

Frontend → tampilan (HTML, Bootstrap, jQuery)
Backend → server (Node.js + Express)
Komunikasi data → menggunakan JSON
⚙️ 2. Backend (server.js)

Backend menggunakan:

Node.js
Express.js
🔹 Fungsi utama:
Menyimpan data sementara (array)
Menyediakan API CRUD
📌 a. Inisialisasi Server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

Penjelasan:

express() → membuat server
bodyParser.json() → membaca data JSON dari client
cors() → mengizinkan akses dari frontend
express.static('public') → menampilkan file HTML
📌 b. Penyimpanan Data
let data = [];
let idCounter = 1;

Penjelasan:

Data disimpan sementara di array
idCounter digunakan untuk ID unik
📌 c. CREATE (Tambah Data)
app.post('/api/data', (req, res) => {
    const newData = {
        id: idCounter++,
        nama: req.body.nama,
        email: req.body.email
    };
    data.push(newData);
    res.json(newData);
});

👉 Fungsi:

Menerima data dari form
Menyimpan ke array
Mengirim kembali sebagai JSON
📌 d. READ (Tampilkan Data)
app.get('/api/data', (req, res) => {
    res.json(data);
});

👉 Fungsi:

Mengambil semua data
Mengirim ke frontend
📌 e. UPDATE (Edit Data)
app.put('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(d => d.id === id);
    if (item) {
        item.nama = req.body.nama;
        item.email = req.body.email;
        res.json(item);
    }
});

👉 Fungsi:

Mencari data berdasarkan ID
Mengubah isi data
📌 f. DELETE (Hapus Data)
app.delete('/api/data/:id', (req, res) => {
    data = data.filter(d => d.id !== parseInt(req.params.id));
    res.send('Deleted');
});

👉 Fungsi:

Menghapus data berdasarkan ID
🌐 3. Frontend (Tampilan)

Frontend menggunakan:

Bootstrap
jQuery
DataTables
📝 4. Halaman Form (index.html)
🔹 Fungsi:
Input data user
$('#formData').submit(function(e){
    e.preventDefault();

    $.ajax({
        url: '/api/data',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            nama: $('#nama').val(),
            email: $('#email').val()
        })
    });
});

👉 Penjelasan:

e.preventDefault() → mencegah reload
$.ajax() → kirim data ke server
Data dikirim dalam format JSON
📊 5. Halaman Data (data.html)
🔹 Menggunakan DataTables
$('#myTable').DataTable({
    ajax: {
        url: '/api/data',
        dataSrc: ''
    },
    columns: [
        { data: 'id' },
        { data: 'nama' },
        { data: 'email' }
    ]
});

👉 Penjelasan:

Mengambil data dari server
Menampilkan dalam tabel interaktif
🔹 Tombol Aksi
<button onclick="hapus(${data.id})">Hapus</button>

👉 Fungsi:

Menghapus data dengan AJAX
✏️ 6. Halaman Edit (edit.html)
🔹 Ambil Data Lama
$.get('/api/data', function(data){
    const item = data.find(d => d.id == id);
});
🔹 Update Data
$.ajax({
    url: '/api/data/' + id,
    method: 'PUT',
    contentType: 'application/json',
});

👉 Penjelasan:

Data diambil berdasarkan ID
Data diperbarui ke server
🔄 7. Alur Kerja Sistem
User mengisi form
Data dikirim ke server (POST)
Server menyimpan data
Data ditampilkan di tabel (GET)
User bisa edit (PUT)
User bisa hapus (DELETE)
🎯 8. Kelebihan Program
✔ Mudah digunakan
✔ Tidak perlu reload halaman
✔ Tampilan modern (Bootstrap)
✔ Tabel interaktif (DataTables)
✔ Menggunakan JSON (standar modern)
⚠️ 9. Kekurangan Program
❌ Data belum tersimpan permanen (hanya di memory)
❌ Belum menggunakan database
❌ Belum ada sistem login
🚀 10. Pengembangan Selanjutnya
Tambah database (MySQL / MongoDB)
Tambah login user
Tambah validasi form
Hosting ke internet

link drive
https://drive.google.com/drive/folders/18fs5LYR_9HfFOcibif6YPV8Ls1_Yr1gF?usp=drive_link

