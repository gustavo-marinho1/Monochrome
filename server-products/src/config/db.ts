import { Pool, types } from "pg";
import 'dotenv/config';

// convert "100" to 100
types.setTypeParser(1700, function(val) {
  return parseFloat(val);
});

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT)
});

export default pool;