import express = require("express");
import { createParticipant } from "./model/Participant";
import { fromJson as participantFromJson } from "../../common/Participant";
import Success from "../../common/Success";

const PORT = process.env.PORT || 3000;
const app = express();

// Serve static content
app.use(express.static(__dirname + "/dist"));
app.use(express.json());
app.use("/", express.static(__dirname + "/dist/index.html"));
app.use("/register", express.static(__dirname + "/dist/index.html"));
app.use("/login", express.static(__dirname + "/dist/index.html"));

app.post("/participant", (req, res) => {
    participantFromJson(req.body)
        .then(createParticipant)
        .then(() => {
            const body: Success = { message: "Participant added successfully!"};
            res.json(body);
        })
        .catch(reason => {
            console.log(`Error when parsing user: ${reason}`)
            res.status(400).json({
                error: reason
            });
        });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
