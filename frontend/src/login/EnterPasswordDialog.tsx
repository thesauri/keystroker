import * as React from "react";
import Dialog from '../Dialog';
import PasswordLoginAttempt from "./state/PasswordLoginAttempt";
import Email from './state/Email';
import Password from './state/Password';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const onEmailUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    Email.update(event.currentTarget.value);
};

const onPasswordUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    Password.update(event.currentTarget.value);
};

@observer
class EnterPasswordDialog extends React.Component {
    private emailField: React.RefObject<HTMLInputElement>;
    private passwordField: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);
        this.emailField = React.createRef();
        this.passwordField = React.createRef();
    }

    public componentDidMount() {
        if (this.passwordField.current) {
            this.passwordField.current.addEventListener("keydown", this.logKeystroke);
        }

        const email = this.emailFromURLParameters();
        if (email) {
            Email.update(email);
            if (this.passwordField.current) {
                this.passwordField.current.focus();
            }
        } else {
            if (this.emailField.current) {
                this.emailField.current.focus();
            }
        }
    }

    public componentWillUnmount() {
        if (this.passwordField.current) {
            this.passwordField.current.removeEventListener("keydown", this.logKeystroke);
        }
    }

    public render() {
        return (
            <Dialog
                title="Login"
                notification={PasswordLoginAttempt.notification}
                next={{
                    onClick: PasswordLoginAttempt.login,
                    text: "Login"
                }}>
                <section className="section">
                    <p>
                        This is the login page for the <Link to="/register">user authentication study</Link>. For this study, please type your login details by hand instead of automatically filling them in.
                    </p>
                    <div className="field">
                        <label className="label">
                            Email
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                ref={this.emailField}
                                type="email"
                                value={Email.email}
                                onChange={onEmailUpdate}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Password
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                ref={this.passwordField}
                                value={Password.password}
                                onChange={onPasswordUpdate} />
                        </div>
                    </div>
                </section>
            </Dialog>
        );
    }

    private emailFromURLParameters(): string | null {
        const url = new URL(window.location.href);
        return url.searchParams.get("email");
    }

    private logKeystroke(event: KeyboardEvent) {
        Password.addKeystrokeEvent(event);
    }
}
export default () => <EnterPasswordDialog />;
