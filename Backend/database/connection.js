import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  password: "admin123",
  database: "softjobs",
  host: "localhost",
  allowExitOnIdle: true,
});
