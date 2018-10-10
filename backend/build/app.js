var express = require("express");
var PORT = process.env.PORT || 3000;
var app = express();
// Serve static content
var distPath = __dirname + "/dist";
app.use(express.static(distPath));
app.use("/register", express.static(__dirname + "/dist/index.html"));
app.use("/login", express.static(__dirname + "/dist/index.html"));
app.use(express.static(distPath));
app.listen(PORT, function () { return console.log("Listening on port " + PORT); });
//# sourceMappingURL=app.js.map