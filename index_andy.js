const express = require("express");
const mongoose = require("mongoose");
const { uri } = require("./db");
const pkg = require("./package.json");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    service: "contenedores-lab-andy",
    status: "ok",
    version: pkg.version || "0.0.0",
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.get("/health", (req, res) => {
  const mongoUp = mongoose.connection.readyState === 1;
  res
    .status(mongoUp ? 200 : 503)
    .json({ app: "up", mongo: mongoUp ? "up" : "down" });
});

app.get("/time", (req, res) => {
  res.json({ now: new Date().toISOString(), uptime: process.uptime() });
});

app.post("/echo", (req, res) => {
  res.json({ echo: req.body });
});

app.get("/metrics", (req, res) => {
  const mem = process.memoryUsage();
  res.json({
    memory: mem,
    pid: process.pid,
    mongoState: mongoose.connection.readyState,
  });
});

app.get("/info", (req, res) => {
  res.json({
    node: process.version,
    env: process.env.NODE_ENV || "development",
    name: pkg.name,
  });
});

async function start() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB (andy)");
    app.listen(port, () => {
      console.log(`App (andy) listening on port ${port}`);
    });
  } catch (error) {
    console.error("Startup error (andy):", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}

module.exports = app;
