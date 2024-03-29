"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var useragent = require("express-useragent");
var Participant_1 = require("./model/Participant");
var Attack_1 = require("../../common/Attack");
var Login_1 = require("../../common/Login");
var Participant_2 = require("../../common/Participant");
var AttackAttempt_1 = require("./model/AttackAttempt");
var LoginAttempt_1 = require("./model/LoginAttempt");
var PORT = process.env.PORT || 4000;
var app = express();
// Serve static content
app.use(useragent.express());
app.use(express.static(__dirname + "/dist"));
app.use(express.json());
app.use("/", express.static(__dirname + "/dist/index.html"));
app.use("/attack", express.static(__dirname + "/dist/index.html"));
app.use("/register", express.static(__dirname + "/dist/index.html"));
app.use("/login", express.static(__dirname + "/dist/index.html"));
app.post("/attack", function (req, res) {
    var userAgent = req.useragent ? req.useragent.source : "";
    Attack_1.fromJson(req.body)
        .then(function (attack) { return AttackAttempt_1.attemptAttack(attack, userAgent); })
        .then(function (result) { return res.json(result); })
        .catch(function (reason) {
        res.status(400).json({
            error: reason
        });
    });
});
app.post("/login", function (req, res) {
    var userAgent = req.useragent ? req.useragent.source : "";
    Login_1.fromJson(req.body)
        .then(function (login) { return LoginAttempt_1.attemptPasswordLogin(login, userAgent); })
        .then(function (result) {
        var body = { message: result };
        res.json(body);
    })
        .catch(function (reason) {
        console.log("Failed login for user: " + reason);
        res.status(400).json({
            error: reason
        });
    });
});
app.post("/pattern", function (req, res) {
    try {
        var email = req.body.email;
        var pattern = req.body.pattern;
        LoginAttempt_1.attemptPatternLogin(email, pattern)
            .then(function (result) {
            var body = { message: result };
            res.json(body);
        })
            .catch(function (reason) {
            console.log("Failed pattern login for user: " + reason);
            res.status(400).json({
                error: reason
            });
        });
    }
    catch (error) {
        res.status(400).json({
            error: error
        });
    }
});
app.post("/participant", function (req, res) {
    Participant_2.fromJson(req.body)
        .then(Participant_1.createParticipant)
        .then(function () {
        var body = { message: "Participant added successfully!" };
        res.json(body);
    })
        .catch(function (reason) {
        console.log("Error when parsing user: " + reason);
        res.status(400).json({
            error: reason
        });
    });
});
app.listen(PORT, function () { return console.log("Listening on port " + PORT); });
//# sourceMappingURL=app.js.map