"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
exports.attemptPasswordLogin = function (login) {
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
exports.attemptPatternLogin = function (email, pattern) {
    return db_1.query("SELECT pattern FROM Participant WHERE email=$1;", [email])
        .then(function (queryResult) {
        if (queryResult.rowCount > 0) {
            return Promise.resolve(queryResult.rows[0].pattern);
        }
        else {
            return Promise.reject("Invalid email address");
        }
    })
        .then(function (correctStringPattern) {
        try {
            var correctPattern = JSON.parse(correctStringPattern);
            if (pattern.length !== correctPattern.length) {
                return false;
            }
            for (var i = 0; i < pattern.length; i++) {
                if (pattern[i] !== correctPattern[i]) {
                    return false;
                }
            }
            return true;
        }
        catch (error) {
            return false;
        }
    })
        .then(function (correct) { return correct ? Promise.resolve("Correct pattern") : Promise.reject("Invalid Pattern"); });
};
//# sourceMappingURL=LoginAttempt.js.map