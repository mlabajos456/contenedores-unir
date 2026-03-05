const express = require("express");
const mongoose = require("mongoose");
const { uri } = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    service: "contenedores-lab",
    status: "ok",
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.get("/health", (req, res) => {
  const mongoUp = mongoose.connection.readyState === 1;
  res.status(mongoUp ? 200 : 503).json({
    app: "up",
    mongo: mongoUp ? "up" : "down",
  });
});

async function start() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error("Startup error:", error.message);
    process.exit(1);
  }
}

start();
