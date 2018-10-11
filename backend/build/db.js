"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var client = new pg_1.Client({
    connectionString: process.env.DATABASE,
    ssl: process.env.NODE_ENV === "production"
});
client.connect();
exports.test = function () {
    client.query("SELECT * FROM TEST;", function (err, res) {
        if (err) {
            throw err;
        }
        for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            console.log(row);
        }
    });
};
//# sourceMappingURL=db.js.map