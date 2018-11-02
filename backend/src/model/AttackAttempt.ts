import Attack from "../../../common/Attack";
import { query } from "./db";
import Success from '../../../common/Success';

export const attemptAttack = (attack: Attack, userAgent: string): Promise<Success> => {
    return resolvePassword(attack.email)
        .then(password => recordAttackAttempt(attack, userAgent, password))
        .then(message => ({ message }));
}

const resolvePassword = (email: string): Promise<string> => {
    return query("SELECT password FROM Participant WHERE email=$1;", [email])
        .then(queryResult => {
            if (queryResult.rowCount > 0) {
                return Promise.resolve(<string> queryResult.rows[0].password);
            } else {
                return Promise.reject("Invalid email address");
            }
        })
};

const recordAttackAttempt = (attack: Attack, userAgent: string, password: string): Promise<string> => {
    const passwordCorrect = attack.password === password;

    console.log(`Attack attempt at ${attack.email} by ${attack.attacker}`);

    return query("INSERT INTO AttackAttempt(participant_email, keystroke_timing, attacker, success, user_agent) VALUES ($1, $2, $3, $4, $5);",
        [attack.email, attack.keystrokeEvents, attack.attacker, passwordCorrect, userAgent])
        .then(queryResult => {
            if (passwordCorrect) {
                return Promise.resolve("Login successful!")
            } else {
                return Promise.reject("Login failed")
            }
        });
};

