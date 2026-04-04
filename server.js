const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

let data = [];
let idCounter = 1;

// CREATE
app.post('/api/data', (req, res) => {
    const newData = {
        id: idCounter++,
        nama: req.body.nama,
        email: req.body.email
    };
    data.push(newData);
    res.json(newData);
});

// READ
app.get('/api/data', (req, res) => {
    res.json(data);
});

// UPDATE
app.put('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(d => d.id === id);
    if (item) {
        item.nama = req.body.nama;
        item.email = req.body.email;
        res.json(item);
    } else {
        res.status(404).send('Data tidak ditemukan');
    }
});

// DELETE
app.delete('/api/data/:id', (req, res) => {
    data = data.filter(d => d.id !== parseInt(req.params.id));
    res.send('Deleted');
});

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));