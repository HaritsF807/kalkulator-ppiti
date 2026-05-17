require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const calculatorRoutes = require('./routes/calculatorRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/calculator', calculatorRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API Kalkulator - Struktur Simpel',
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
