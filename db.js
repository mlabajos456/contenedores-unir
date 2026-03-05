const host = process.env.MONGO_HOST || "mongo";
const port = process.env.MONGO_PORT || "27017";
const user = process.env.MONGO_USER || "labajos";
const pass = process.env.MONGO_PASS || "labajosmichael";
const db = process.env.MONGO_DB || "appdb";

const uri = `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`;

module.exports = { uri };