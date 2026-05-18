const calculatorController = require("../controller/calculatorController");
const indexHandler = require("../api/index");

const calculatorRoutes = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    return indexHandler(req, res);
  }

  if (url === "/calculate" && method === "POST") {
    return calculatorController.calculate(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: false, message: "Route tidak ditemukan" }));
};

module.exports = calculatorRoutes;
