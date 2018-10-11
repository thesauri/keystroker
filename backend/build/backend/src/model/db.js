"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
});
exports.query = function (query, params) {
    return pool.query(query, params);
};
//# sourceMappingURL=db.js.map