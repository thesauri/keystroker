import { Pool, QueryResult } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
});

export const query = (query: string, params: any[]): Promise<QueryResult> => {
    return pool.query(query, params);
};
