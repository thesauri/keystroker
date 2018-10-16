import * as React from "react";
import Dialog from "../Dialog";
import { observer } from 'mobx-react';
import PasswordLoginAttempt from './state/PasswordLoginAttempt';
import LoginState from './state/LoginState';
import "./LoginSuccessDialog.css";

interface State {
    progress: number;
};

@observer
class LoginSuccessDialog extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            progress: 0
        };
        this.change = this.change.bind(this);
    }

    public componentDidMount() {
        setTimeout(this.change, 500);
    }

    public render() {
        const totalLogins = PasswordLoginAttempt.loginSuccessResult.message.totalLogins as number;
        const completedLoginCount = PasswordLoginAttempt.loginSuccessResult.message.completedLoginCount as number;
        const loginSuccessResult = PasswordLoginAttempt.loginSuccessResult.message;
        const loginsRemaining = loginSuccessResult ? loginSuccessResult.expectedLoginsByNow as number - completedLoginCount : 0;
        const loginAgain = loginsRemaining > 0 ?
            (
                <div className="LoginSuccessDialog-thank-you">
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
                    <h2 className="subtitle">Total progress</h2>
                    <progress
                        className="progress is-link"
                        value={this.state.progress}
                        onClick={this.change}
                        max={totalLogins}
                    >
                        {completedLoginCount / totalLogins}%
                    </progress>
                    <div className="LoginSuccessDialog-progress-footer">
                        <p>↑ October 15</p>     
                        <p>October 28 ↑</p>     
                    </div>     
                </section>
            </Dialog>
        );
    }

    private change() {
        const loginSuccessResult = PasswordLoginAttempt.loginSuccessResult.message;
        this.setState({
            progress: loginSuccessResult.completedLoginCount
       });
    }
}

export default () => (<LoginSuccessDialog />);
