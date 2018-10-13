import Login from "../../../common/Login";
import { query } from "./db";

export const attemptLogin = (login: Login): Promise<string> => {
    return query("SELECT password FROM Participant WHERE email=$1;", [login.email])
        .then(queryResult => {
            if (queryResult.rowCount > 0) {
                return Promise.resolve(<string> queryResult.rows[0].password);
            } else {
                return Promise.reject("Invalid email address");
            }
        })
        .then(correctPassword => {
            if (correctPassword === login.password) {
                return Promise.resolve("Login successful!");
            } else {
                return Promise.reject("Invalid password");
            }
        });
}
