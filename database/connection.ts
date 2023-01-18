import { Pool } from "pg";
const connection = new Pool({
  user: "postgres",
  password: "123456789xd",
  host: "localhost",
  port: 5432,
  database: "TiendaDino",
});

export { connection };
