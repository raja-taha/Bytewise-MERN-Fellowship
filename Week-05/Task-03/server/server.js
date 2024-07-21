const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const filePath = path.join(__dirname, "data", "products.json");

  if (pathname === "/api/products" && req.method === "GET") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ Error: "Not Found" }));
  }
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
