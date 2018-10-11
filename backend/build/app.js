"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("./db");
var PORT = process.env.PORT || 3000;
var app = express();
// Serve static content
app.use(express.static(__dirname + "/dist"));
app.use("/register", express.static(__dirname + "/dist/index.html"));
app.use("/login", express.static(__dirname + "/dist/index.html"));
app.post("/user", function (req, res) {
    db_1.test();
});
app.listen(PORT, function () { return console.log("Listening on port " + PORT); });
//# sourceMappingURL=app.js.map