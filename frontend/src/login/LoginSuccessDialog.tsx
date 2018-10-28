import * as React from "react";
import Dialog from "../Dialog";
import { observer } from 'mobx-react';
import ParticleEffect from "./ParticleEffect";
import PasswordLoginAttempt from './state/PasswordLoginAttempt';
import LoginState from './state/LoginState';
import "./LoginSuccessDialog.css";

interface State {
    burst: boolean;
    completedLoginCount: number;
    loginsRemaining: number;
    loginSuccessResult: number;
    progress: number;
    totalLogins: number;
};

@observer
class LoginSuccessDialog extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        const totalLogins = PasswordLoginAttempt.loginSuccessResult.message.totalLogins as number;
        const completedLoginCount = PasswordLoginAttempt.loginSuccessResult.message.completedLoginCount as number;
        const loginSuccessResult = PasswordLoginAttempt.loginSuccessResult.message;
        const loginsRemaining = loginSuccessResult ? loginSuccessResult.expectedLoginsByNow as number - completedLoginCount : 0;
        this.state = {
            burst: false,
            completedLoginCount,
            loginSuccessResult,
            loginsRemaining,
            progress: 0,
            totalLogins
        };
        this.change = this.change.bind(this);
        this.burst = this.burst.bind(this);
    }

    public componentDidMount() {
        setTimeout(this.change, 500);
        if (this.state.completedLoginCount === 57) {
            setTimeout(this.burst, 1500);
        }
    }

    public render() {
        const loginAgain = this.state.completedLoginCount === 57 ? (
            <div>
                <p>
                    You have finished your last login for this study, wohoo! I greatly appreciate the time and effort you put into this study. Contact me for the movie tickets at @thesauri (Telegram) or by email at <a href="mailto:walter.berggren@aalto.fi">walter.berggren@aalto.fi</a>.
                </p> 
                <p>
                    Thank you for participating!<br />
                    – Walter Berggren
                </p> 
            </div>
        ) : (this.state.loginsRemaining > 0) ?
            (
                <div className="LoginSuccessDialog-thank-you">
                    <p>
                        Thank you for logging in! You still have {this.state.loginsRemaining} uncompleted logins, would you like to login again now?
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
                    <ParticleEffect burst={this.state.burst}>
                        <h2 className="subtitle">Total progress</h2>
                        <progress
                            className="progress is-link"
                            value={this.state.progress}
                            onClick={this.change}
                            max={this.state.totalLogins}
                        >
                            {this.state.completedLoginCount / this.state.totalLogins}%
                        </progress>
                        <div className="LoginSuccessDialog-progress-footer">
                            <p>↑ October 15</p>     
                            <p>October 28 ↑</p>     
                        </div>     
                    </ParticleEffect>
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

    private burst() {
        this.setState({
            burst: true
        })
    }
}

export default () => (<LoginSuccessDialog />);
