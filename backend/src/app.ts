import express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

// Serve static content
app.use(express.static(__dirname + "/dist"));
app.use("/register", express.static(__dirname + "/dist/index.html"));
app.use("/login", express.static(__dirname + "/dist/index.html"));

app.post("/user", (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
