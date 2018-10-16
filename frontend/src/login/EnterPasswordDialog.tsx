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
        this.logKeystrokeDown = this.logKeystrokeDown.bind(this);
        this.logKeystrokeUp = this.logKeystrokeUp.bind(this);
        this.logKeystroke = this.logKeystroke.bind(this);
    }

    public componentDidMount() {
        if (this.passwordField.current) {
            this.passwordField.current.addEventListener("input", this.logKeystrokeDown);
            this.passwordField.current.addEventListener("keyup", this.logKeystrokeUp);
        }

        const email = this.emailFromURLParameters() || Email.email;
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
            this.passwordField.current.removeEventListener("input", this.logKeystrokeDown);
            this.passwordField.current.removeEventListener("keyup", this.logKeystrokeUp);
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

    private logKeystrokeDown(event: TextEvent) {
        this.logKeystroke(event.data, undefined, true);
    }

    private logKeystrokeUp(event: KeyboardEvent) {
        this.logKeystroke(event.key, event.keyCode, false);
    }

    private logKeystroke(key: string, keyCode: number | undefined, held: boolean, ) {
        Password.addKeystrokeEvent(key, keyCode, held);
    }
}
export default () => <EnterPasswordDialog />;
