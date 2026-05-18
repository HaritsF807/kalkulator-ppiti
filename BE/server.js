const http = require("http");
const calculatorRoutes = require("./routes/calculatorRoutes");

const server = http.createServer((req, res) => {
  calculatorRoutes(req, res);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
