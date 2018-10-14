"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./model/db");
exports.sendLinkToAllParticipants = function () {
    db_1.query("SELECT email FROM Participant;", [])
        .then(function (queryResult) { return queryResult.rows.map(function (row) { return row.email; }); })
        .then(function (email) { return console.log(email); });
};
//# sourceMappingURL=emailsender.js.map