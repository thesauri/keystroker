import Login from "../../../common/Login";
import { query } from "./db";
import { QueryResult } from 'pg';

export const attemptPasswordLogin = (login: Login, userAgent: string): Promise<object> =>
    verifyEmailExists(login.email)
        .then(() => verifyHasUnfinishedLoginsAndGetCompletedLogins(login.email))
        .then(completedLoginCount => {
            const completedAfterThis = completedLoginCount + 1;
            return query("SELECT password FROM Participant WHERE email=$1;", [login.email])
                .then(resolvePasswordForEmail)
                .then(correctPassword => checkPasswordAndRecordAttempt(login, correctPassword, userAgent))
                .then(message => 
                    Promise.all([expectedLoginsByNow(), totalLogins()])
                        .then(result => ({
                            completedLoginCount: completedAfterThis,
                            expectedLoginsByNow: result[0],
                            message,
                            totalLogins: result[1]
                        }))
                );
        });


const verifyEmailExists = (email: string): Promise<boolean> => {
    return query("SELECT email from Participant WHERE email=$1;", [email])
        .then(queryResult => queryResult.rowCount > 0 ? Promise.resolve(true) : Promise.reject("Invalid email"))
};

const verifyHasUnfinishedLoginsAndGetCompletedLogins = (email: string): Promise<number> => {
    const expectedLogins = expectedLoginsByNow();
    const completedLogins = completedLoginCount(email);
    return Promise.all([expectedLogins, completedLogins])
        .then(logins => logins[0] - logins[1])
        .then(remainingLogins => {
            if (remainingLogins > 0) {
                return Promise.resolve(completedLogins);
            } else {
                return Promise.reject("You have already logged in enough for now, well done! But don't worry, you will soon be able to log in again 🙂");
            }
        });
};

export const completedLoginCount = (email: string): Promise<number> =>
    query("SELECT COUNT(success) FROM LoginAttempt WHERE participant_email=$1 AND success='y';", [email])
        .then(queryResult => {
            if (queryResult.rowCount > 0) {
                return Promise.resolve(parseInt(queryResult.rows[0].count));
            } else {
                return Promise.reject("Invalid email");
            }
        });

export const expectedLoginsByNow = (): Promise<number> => {
    // query("SELECT COUNT(participant_email) FROM EmailLinkEvent WHERE participant_email=$1", [email])
    //     .then(queryResult => {
    //         if (queryResult.rowCount > 0) {
    //             return Promise.resolve(queryResult.rows[0].count as number);
    //         } else {
    //             return Promise.reject("Invalid email");
    //         }
    //     });
    // 8, 11, 14, 18 -> 5, 8, 11, 15 
    const dateToday = new Date(Date.now());
    const hour = dateToday.getHours();
    const attemptsToday = hour < 5 ? 0 :
        hour >= 5 && hour < 8 ? 1 :
        hour >= 8 && hour < 11 ? 2 :
        hour >= 11 && hour < 15 ? 3 : 4;
    const expectedLoginCount = Math.min(4 * (dateToday.getDate() - 15) + attemptsToday + 1, 57);
    return Promise.resolve(expectedLoginCount);
}

export const totalLogins = (): Promise<number> => Promise.resolve(57);

const resolvePasswordForEmail = (queryResult: QueryResult) => {
    if (queryResult.rowCount > 0) {
        return Promise.resolve(<string> queryResult.rows[0].password);
    } else {
        return Promise.reject("Invalid email address");
    }
};

const checkPasswordAndRecordAttempt = (login: Login, correctPassword: string, userAgent: string) => {
    const success = login.password === correctPassword;
    recordAttempt(login.email, JSON.stringify(login.keystrokeEvents), success, userAgent);
    if (success) {
        return Promise.resolve("Login successful!");
    } else {
        return Promise.reject("Invalid password");
    }
};

const recordAttempt = (email: string, keystrokeTiming: string, success: boolean, userAgent: string) => {
    query("INSERT INTO LoginAttempt(participant_email, keystroke_timing, success, user_agent) VALUES ($1, $2, $3, $4);",
        [email, keystrokeTiming, success, userAgent])
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
