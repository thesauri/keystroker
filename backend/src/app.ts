import express = require("express");
import * as useragent from "express-useragent";
import { createParticipant } from "./model/Participant";
import { fromJson as attackFromJson } from "../../common/Attack";
import { fromJson as loginFromJson } from "../../common/Login";
import { fromJson as participantFromJson } from "../../common/Participant";
import Success from "../../common/Success";
import { attemptAttack } from "./model/AttackAttempt";
import { attemptPasswordLogin, attemptPatternLogin } from "./model/LoginAttempt";

const PORT = process.env.PORT || 4000;
const app = express();

// Serve static content
app.use(useragent.express());
app.use(express.static(__dirname + "/dist"));
app.use(express.json());
app.use("/", express.static(__dirname + "/dist/index.html"));
app.use("/register", express.static(__dirname + "/dist/index.html"));
app.use("/login", express.static(__dirname + "/dist/index.html"));

app.post("/attack", (req, res) => {
    const userAgent = req.useragent ? req.useragent.source : "";
    attackFromJson(req.body)
        .then(attack => attemptAttack(attack, userAgent))
        .then(result => res.json(result))
        .catch(reason => {
            res.status(400).json({
                error: reason
            });
        })
});

app.post("/login", (req, res) => {
    const userAgent = req.useragent ? req.useragent.source : "";
    loginFromJson(req.body)
        .then(login => attemptPasswordLogin(login, userAgent))
        .then(result => {
            const body = { message: result };
            res.json(body);
        })
        .catch(reason => {
            console.log(`Failed login for user: ${reason}`);
            res.status(400).json({
                error: reason
            });
        })
});

app.post("/pattern", (req, res) => {
    try {
        const email: string = req.body.email as string;
        const pattern: number[] = req.body.pattern as number[];
        attemptPatternLogin(email, pattern)    
            .then(result => {
                const body: Success = { message: result };
                res.json(body);
            })
            .catch(reason => {
                console.log(`Failed pattern login for user: ${reason}`);
                res.status(400).json({
                    error: reason
                });
            })
    } catch (error) {
        res.status(400).json({
            error
        });
    }
});

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
