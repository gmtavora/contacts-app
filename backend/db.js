const Database = require("./db/Database");
const dbSchema = require("./db/dbSchema");

const DB_PATH = "./db/database.db";

const db = new Database(DB_PATH, dbSchema);

module.exports = db;