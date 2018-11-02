"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
exports.attemptAttack = function (attack, userAgent) {
    return resolvePassword(attack.email)
        .then(function (password) { return recordAttackAttempt(attack, userAgent, password); })
        .then(function (message) { return ({ message: message }); });
};
var resolvePassword = function (email) {
    return db_1.query("SELECT password FROM Participant WHERE email=$1;", [email])
        .then(function (queryResult) {
        if (queryResult.rowCount > 0) {
            return Promise.resolve(queryResult.rows[0].password);
        }
        else {
            return Promise.reject("Invalid email address");
        }
    });
};
var recordAttackAttempt = function (attack, userAgent, password) {
    var passwordCorrect = attack.password === password;
    console.log("Attack attempt at " + attack.email + " by " + attack.attacker);
    return db_1.query("INSERT INTO AttackAttempt(participant_email, keystroke_timing, attacker, success, user_agent) VALUES ($1, $2, $3, $4, $5);", [attack.email, attack.keystrokeEvents, attack.attacker, passwordCorrect, userAgent])
        .then(function (queryResult) {
        if (passwordCorrect) {
            return Promise.resolve("Login successful!");
        }
        else {
            return Promise.reject("Login failed");
        }
    });
};
//# sourceMappingURL=AttackAttempt.js.map