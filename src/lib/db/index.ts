
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const POOL = new Pool({ // Create a connection pool from database url in env
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(POOL, { schema }); // Initialize the database connection with the schema