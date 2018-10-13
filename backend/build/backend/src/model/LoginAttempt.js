"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
exports.attemptLogin = function (login) {
    return db_1.query("SELECT password FROM Participant WHERE email=$1;", [login.email])
        .then(function (queryResult) {
        if (queryResult.rowCount > 0) {
            return Promise.resolve(queryResult.rows[0].password);
        }
        else {
            return Promise.reject("Invalid email address");
        }
    })
        .then(function (correctPassword) {
        if (correctPassword === login.password) {
            return Promise.resolve("Login successful!");
        }
        else {
            return Promise.reject("Invalid password");
        }
    });
};
//# sourceMappingURL=LoginAttempt.js.map