// api/calculate.js — Vercel Serverless Function
// Reuse logika dari services yang sudah ada
const calculatorService = require("../services/calculatorService");

module.exports = (req, res) => {
  // Hanya izinkan POST
  if (req.method !== "POST") {
    res.setHeader("Content-Type", "application/json");
    res.status(405).json({ success: false, message: "Method tidak diizinkan, gunakan POST" });
    return;
  }

  const { a, b, operator } = req.body;

  if (a === undefined || !operator) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).json({ success: false, message: "Field a dan operator wajib diisi" });
    return;
  }

  const result = calculatorService.calculate(a, b, operator);

  if (result.error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).json({ success: false, message: result.error });
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ success: true, data: result });
};
