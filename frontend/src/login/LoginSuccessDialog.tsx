import * as React from "react";
import Dialog from "../Dialog";
import { observer } from 'mobx-react';
import PasswordLoginAttempt from './state/PasswordLoginAttempt';
import LoginState from './state/LoginState';

const LoginSuccessDialog = observer(() => {
    const loginSuccessResult = PasswordLoginAttempt.loginSuccessResult.message;
    const loginsRemaining = loginSuccessResult ? loginSuccessResult.expectedLoginsByNow as number - loginSuccessResult.completedLoginCount as number : 0;
    const loginAgain = loginsRemaining > 0 ?
        (
            <div>
                <p>
                    Thank you for logging! You still have {loginsRemaining} uncompleted logins, would you like to login again now?
                </p>
                <button
                    className="button is-primary"
                    onClick={LoginState.loginAgain}
                >
                    Login again
                </button>
            </div>
        ) : (
            <p>
                Thank you for logging in! You have completed all logins for now and you are one step closer to the movie tickets! You will receive an email when you can login again. 🍿
            </p>
        );

    return (
        <Dialog
            title="Login successful! 🎉">
            <section className="section">
                { loginAgain }
            </section>
        </Dialog>
    );
});

export default LoginSuccessDialog;
