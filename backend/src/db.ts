import { Client } from "pg";

const client = new Client({
    connectionString: process.env.DATABASE,
    ssl: process.env.NODE_ENV === "production"
});

client.connect();

export const test = () => {
    client.query("SELECT * FROM TEST;", (err, res) => {
        if (err) {
            throw err;
        }
        for (let row of res.rows) {
            console.log(row);
        }
    });
};
