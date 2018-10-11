"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJson = function (jsonObject) { return (hasFields(jsonObject, ["email", "password", "pattern", "toc_accepted"])
    .then(function () { return new Participant(jsonObject.email, jsonObject.password, jsonObject.pattern, jsonObject.toc_accepted); })); };
var hasFields = function (object, fields) {
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var field = fields_1[_i];
        if (object[field] === undefined) {
            return Promise.reject("Missing field: " + field);
        }
    }
    return Promise.resolve(true);
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
            return Promise.reject("Email cannot be empty");
        }
        if (this.email.length > 1024) {
            throw new Error("Email cannot be longer than 1024 characters");
        }
        if (this.password.length < 10) {
            return Promise.reject("Password must be at least 10 characters long");
        }
        if (this.password.length > 1024) {
            return Promise.reject("Password cannot be longer than 1024 characters");
        }
        if (this.pattern.length < 2) {
            return Promise.reject("The pattern must connect at least 2 dots");
        }
        if (!this.toc_accepted) {
            return Promise.reject("The terms of conditions must be accepted");
        }
        return Promise.resolve(true);
    };
    return Participant;
}());
exports.default = Participant;
//# sourceMappingURL=Participant.js.map