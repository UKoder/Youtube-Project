const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'memberDB'
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

app.post('/api/log-scan', (req, res) => {
  const { email, qrData } = req.body;
  const timestamp = new Date();

  const sql = "INSERT INTO scan_logs (email, qr_data, timestamp) VALUES (?, ?, ?)";
  db.query(sql, [email, qrData, timestamp], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error logging scan" });
    }
    res.json({ message: "Scan logged successfully!" });
  });
});

app.listen(port, () => {
  console.log(`Member portal backend running on http://localhost:${port}`);
});