"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJson = function (jsonObject) {
    try {
        var login = jsonObject;
        return Promise.resolve(login);
    }
    catch (error) {
        return Promise.reject("Bad attack request object");
    }
};
var Attack = /** @class */ (function () {
    function Attack(attacker, email, password, keystrokeEvents) {
        this.email = email;
        this.password = password;
        this.keystrokeEvents = keystrokeEvents;
    }
    return Attack;
}());
exports.default = Attack;
//# sourceMappingURL=Attack.js.map