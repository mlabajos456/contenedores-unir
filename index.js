const express = require("express");
const mongoose = require("mongoose");
const { uri } = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    service: "contenedores-lab",
    status: "ok",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

app.get("/health", (req, res) => {
  const mongoUp = mongoose.connection.readyState === 1;
  res.status(mongoUp ? 200 : 503).json({
    app: "up",
    mongo: mongoUp ? "up" : "down"
  });
});

app.get("/mensaje", (req, res) => {
  res.json({
    mensaje: "Michael Labajos lo hizo"
  });
});

async function start() {
  try {
    await mongoose.connect(uri);
    console.log("Conectando a MongoDB realizado por Michael Labajos Detquizan");

    app.listen(port, () => {
      console.log(`Api escuchando por el puerto: ${port}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servicio:", error.message);
    process.exit(1);
  }
}

start();
