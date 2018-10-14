import Login from "../../../common/Login";
import { query } from "./db";
import { QueryResult } from 'pg';

export const attemptPasswordLogin = (login: Login): Promise<string> =>
    verifyHasUnfinishedLogins(login.email)
        .then(() => query("SELECT password FROM Participant WHERE email=$1;", [login.email]))
        .then(resolvePasswordForEmail)
        .then(correctPassword => checkPasswordAndRecordAttempt(login, correctPassword));

const verifyHasUnfinishedLogins = (email: string): Promise<boolean> => {
    const expectedLogins = expectedLoginsByNow(email);
    const completedLogins = completedLoginCount(email);
    return Promise.all([expectedLogins, completedLogins])
        .then(logins => logins[0] - logins[1])
        .then(remainingLogins => {
            if (remainingLogins > 0) {
                return Promise.resolve(true);
            } else {
                return Promise.reject("You have already logged in enough for now, well done! But don't worry, you will soon be able to log in again 🙂");
            }
        });
};

export const completedLoginCount = (email: string): Promise<number> =>
    query("SELECT COUNT(success) FROM LoginAttempt WHERE participant_email=$1 AND success='y';", [email])
        .then(queryResult => {
            if (queryResult.rowCount > 0) {
                return Promise.resolve(queryResult.rows[0].count as number);
            } else {
                return Promise.reject("Invalid email");
            }
        });

const expectedLoginsByNow = (email: string): Promise<number> =>
    query("SELECT COUNT(participant_email) FROM EmailLinkEvent WHERE participant_email=$1", [email])
        .then(queryResult => {
            if (queryResult.rowCount > 0) {
                return Promise.resolve(queryResult.rows[0].count as number);
            } else {
                return Promise.reject("Invalid email");
            }
        });

const resolvePasswordForEmail = (queryResult: QueryResult) => {
    if (queryResult.rowCount > 0) {
        return Promise.resolve(<string> queryResult.rows[0].password);
    } else {
        return Promise.reject("Invalid email address");
    }
};

const checkPasswordAndRecordAttempt = (login: Login, correctPassword: string) => {
    const success = login.password === correctPassword;
    recordAttempt(login.email, JSON.stringify(login.keystrokeEvents), success);
    if (success) {
        return Promise.resolve("Login successful!");
    } else {
        return Promise.reject("Invalid password");
    }
};

const recordAttempt = (email: string, keystrokeTiming: string, success: boolean) => {
    query("INSERT INTO LoginAttempt(participant_email, keystroke_timing, success) VALUES ($1, $2, $3);",
        [email, keystrokeTiming, success])
        .catch(error => {
            console.log(`Error while storing login for user ${email}: ${error}`);
        });
};

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
