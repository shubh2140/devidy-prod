import { pool } from "../db.js";

async function initDb(reset = false) {
  try {
    if (reset) {
      await pool.query("DROP TABLE IF EXISTS users CASCADE;");
      console.log("🗑️ Dropped existing tables");
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Users table ready");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
initDb(args.includes("--reset"));
