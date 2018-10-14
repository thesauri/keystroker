"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Participant_1 = require("./model/Participant");
var Login_1 = require("../../common/Login");
var Participant_2 = require("../../common/Participant");
var LoginAttempt_1 = require("./model/LoginAttempt");
var PORT = process.env.PORT || 4000;
var app = express();
// Serve static content
app.use(express.static(__dirname + "/dist"));
app.use(express.json());
app.use("/", express.static(__dirname + "/dist/index.html"));
app.use("/register", express.static(__dirname + "/dist/index.html"));
app.use("/login", express.static(__dirname + "/dist/index.html"));
app.post("/login", function (req, res) {
    Login_1.fromJson(req.body)
        .then(LoginAttempt_1.attemptPasswordLogin)
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