// api/index.js — Root endpoint untuk cek status API
module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    success: true,
    message: "API Kalkulator PPITI - Pure Node.js",
    endpoints: [
      { method: "POST", path: "/calculate", description: "Hitung operasi matematika" }
    ],
    operators: ["+", "-", "*", "/", "%", "pow", "sqrt"]
  });
};
