const calculatorService = require("../services/calculatorService");

exports.calculate = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    let data;

    try {
      data = JSON.parse(body);
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ success: false, message: "Format JSON tidak valid" })
      );
    }

    const { a, b, operator } = data;

    if (a === undefined || !operator) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ success: false, message: "Field a dan operator wajib diisi" })
      );
    }

    const result = calculatorService.calculate(a, b, operator);

    if (result.error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ success: false, message: result.error }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, data: result }));
  });
};
