"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJson = function (jsonObject) {
    try {
        var login = jsonObject;
        return Promise.resolve(login);
    }
    catch (error) {
        return Promise.reject("Bad login request object");
    }
};
var Login = /** @class */ (function () {
    function Login(email, password, keystrokeEvents) {
        this.email = email;
        this.password = password;
        this.keystrokeEvents = keystrokeEvents;
    }
    return Login;
}());
exports.default = Login;
//# sourceMappingURL=Login.js.map