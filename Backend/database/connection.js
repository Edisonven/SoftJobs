import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";

export const pool = new Pool({
  allowExitOnIdle: true,
});
