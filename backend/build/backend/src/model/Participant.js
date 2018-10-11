"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
exports.createParticipant = function (participant) {
    return db_1.query("INSERT INTO Participant(email, password, pattern, toc_accepted) VALUES ($1, $2, $3, $4);", [participant.email, participant.password, JSON.stringify(participant.pattern), participant.tocAccepted]);
};
//# sourceMappingURL=Participant.js.map