import * as React from "react";
import Dialog from '../Dialog';
import { observer } from 'mobx-react';
import AttackPassword from './state/AttackPassword';
import AttackEmail from './state/AttackEmail';
import AttackAttempt from './state/AttackAttempt';
import AttackAttacker from './state/AttackAttacker';

const onAttackerUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    AttackAttacker.update(event.currentTarget.value);
}

const onEmailUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    AttackEmail.update(event.currentTarget.value);
};

const onPasswordUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    AttackPassword.update(event.currentTarget.value);
};

@observer
class AttackDialog extends React.Component {
    private attackerField: React.RefObject<HTMLInputElement>;
    private emailField: React.RefObject<HTMLInputElement>;
    private passwordField: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);
    
        this.attackerField = React.createRef();
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

        const email = this.emailFromURLParameters() || AttackEmail.email;
        if (AttackAttacker.attacker === "") {
            if (this.attackerField.current) {
                this.attackerField.current.focus();
            }
        } else if (email) {
            AttackEmail.update(email);
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
                title="Attack 😈"
                notification={AttackAttempt.notification}
                next={{
                    onClick: AttackAttempt.login,
                    text: "Login"
                }}>
                <section className="section">
                    <div className="field">
                        <label className="label">
                            Attacker
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                ref={this.attackerField}
                                type="text"
                                autoComplete="off"
                                value={AttackAttacker.attacker}
                                onChange={onAttackerUpdate}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Email
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                ref={this.emailField}
                                type="email"
                                value={AttackEmail.email}
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
                                value={AttackPassword.password}
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
        AttackPassword.addKeystrokeEvent(key, keyCode, held);
    }
}
export default () => <AttackDialog />;
