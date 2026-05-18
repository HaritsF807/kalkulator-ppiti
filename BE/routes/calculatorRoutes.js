const calculatorController = require("../controller/calculatorController");

const calculatorRoutes = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/calculate" && method === "POST") {
    return calculatorController.calculate(req, res);
  }

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ message: "API Kalkulator PPITI - Pure Node.js" })
    );
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: false, message: "Route tidak ditemukan" }));
};

module.exports = calculatorRoutes;
