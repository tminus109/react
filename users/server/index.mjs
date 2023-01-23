import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 9000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "/../", "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/../", "build", "index.html"));
});

app.listen(port);
