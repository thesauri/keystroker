"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
exports.attemptPasswordLogin = function (login) {
    return verifyEmailExists(login.email)
        .then(function () { return verifyHasUnfinishedLogins(login.email); })
        .then(function () { return db_1.query("SELECT password FROM Participant WHERE email=$1;", [login.email]); })
        .then(resolvePasswordForEmail)
        .then(function (correctPassword) { return checkPasswordAndRecordAttempt(login, correctPassword); });
};
var verifyEmailExists = function (email) {
    return db_1.query("SELECT email from Participant WHERE email=$1;", [email])
        .then(function (queryResult) { return queryResult.rowCount > 0 ? Promise.resolve(true) : Promise.reject("Invalid email"); });
};
var verifyHasUnfinishedLogins = function (email) {
    var expectedLogins = expectedLoginsByNow(email);
    var completedLogins = exports.completedLoginCount(email);
    return Promise.all([expectedLogins, completedLogins])
        .then(function (logins) { return logins[0] - logins[1]; })
        .then(function (remainingLogins) {
        if (remainingLogins > 0) {
            return Promise.resolve(true);
        }
        else {
            return Promise.reject("You have already logged in enough for now, well done! But don't worry, you will soon be able to log in again 🙂");
        }
    });
};
exports.completedLoginCount = function (email) {
    return db_1.query("SELECT COUNT(success) FROM LoginAttempt WHERE participant_email=$1 AND success='y';", [email])
        .then(function (queryResult) {
        if (queryResult.rowCount > 0) {
            return Promise.resolve(queryResult.rows[0].count);
        }
        else {
            return Promise.reject("Invalid email");
        }
    });
};
var expectedLoginsByNow = function (email) {
    return db_1.query("SELECT COUNT(participant_email) FROM EmailLinkEvent WHERE participant_email=$1", [email])
        .then(function (queryResult) {
        if (queryResult.rowCount > 0) {
            return Promise.resolve(queryResult.rows[0].count);
        }
        else {
            return Promise.reject("Invalid email");
        }
    });
};
var resolvePasswordForEmail = function (queryResult) {
    if (queryResult.rowCount > 0) {
        return Promise.resolve(queryResult.rows[0].password);
    }
    else {
        return Promise.reject("Invalid email address");
    }
};
var checkPasswordAndRecordAttempt = function (login, correctPassword) {
    var success = login.password === correctPassword;
    recordAttempt(login.email, JSON.stringify(login.keystrokeEvents), success);
    if (success) {
        return Promise.resolve("Login successful!");
    }
    else {
        return Promise.reject("Invalid password");
    }
};
var recordAttempt = function (email, keystrokeTiming, success) {
    db_1.query("INSERT INTO LoginAttempt(participant_email, keystroke_timing, success) VALUES ($1, $2, $3);", [email, keystrokeTiming, success])
        .catch(function (error) {
        console.log("Error while storing login for user " + email + ": " + error);
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