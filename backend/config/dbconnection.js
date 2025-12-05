import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const db = await mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.dbname,
  waitForConnections: true,
  connectionLimit: 10, // allows 10 concurrent connections
  queueLimit: 0,
});

export default db;
