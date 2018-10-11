"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJson = function (jsonObject) {
    hasFields(jsonObject, ["email", "password", "pattern", "toc_accepted"]);
    return new Participant(jsonObject.email, jsonObject.password, jsonObject.pattern, jsonObject.toc_accepted);
};
var hasFields = function (object, fields) {
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var field = fields_1[_i];
        if (object[field] === undefined) {
            throw new Error("Missing field: " + field);
        }
    }
};
var Participant = /** @class */ (function () {
    function Participant(email, password, pattern, toc_accepted) {
        this.email = email;
        this.password = password;
        this.pattern = pattern;
        this.toc_accepted = toc_accepted;
        this.validate();
    }
    Participant.prototype.validate = function () {
        if (this.email.length == 0) {
            throw new Error("Email cannot be empty");
        }
        if (this.email.length > 1024) {
            throw new Error("Email cannot be longer than 1024 characters");
        }
        if (this.password.length < 10) {
            throw new Error("Password must be at least 10 characters long");
        }
        if (this.password.length > 1024) {
            throw new Error("Password cannot be longer than 1024 characters");
        }
        if (this.pattern.length < 2) {
            throw new Error("The pattern must connect at least 2 dots");
        }
        if (!this.toc_accepted) {
            throw new Error("The terms of conditions must be accepted");
        }
    };
    return Participant;
}());
exports.default = Participant;
//# sourceMappingURL=Participant.js.map