"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Participant_1 = require("./model/Participant");
var Participant_2 = require("../../common/Participant");
var PORT = process.env.PORT || 3000;
var app = express();
// Serve static content
app.use(express.static(__dirname + "/dist"));
app.use(express.json());
app.use("/", express.static(__dirname + "/dist/index.html"));
app.use("/register", express.static(__dirname + "/dist/index.html"));
app.use("/login", express.static(__dirname + "/dist/index.html"));
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