import Login from "../../../common/Login";
import { query } from "./db";

export const attemptPasswordLogin = (login: Login): Promise<string> => {
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

export const attemptPatternLogin = (email: string, pattern: number[]): Promise<string> => {
    return query("SELECT pattern FROM Participant WHERE email=$1;", [email])
        .then(queryResult => {
            if (queryResult.rowCount > 0) {
                return Promise.resolve(<string> queryResult.rows[0].pattern);
            } else {
                return Promise.reject("Invalid email address");
            }
        })
        .then(correctStringPattern => {
            try {
                const correctPattern: number[] = JSON.parse(correctStringPattern);

                if (pattern.length !== correctPattern.length) {
                    return false;
                }

                for (let i = 0; i < pattern.length; i++) {
                    if (pattern[i] !== correctPattern[i]) {
                        return false;
                    }
                }

                return true;
            } catch (error) {
                return false;
            }
        })
        .then(correct => correct ? Promise.resolve("Correct pattern") : Promise.reject("Invalid Pattern"));
};
