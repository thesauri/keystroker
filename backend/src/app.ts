const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

// Serve static content
const distPath = __dirname + "/dist";
app.use(express.static(distPath));
app.use("/register", express.static(__dirname + "/dist/index.html"));
app.use("/login", express.static(__dirname + "/dist/index.html"));
app.use(express.static(distPath));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));