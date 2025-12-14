const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Statik dosyaları (HTML, CSS, JS) sun
app.use(express.static(path.join(__dirname)));

// For any other route, serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
