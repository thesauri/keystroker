import * as React from "react";
import Dialog from '../Dialog';
import PasswordLoginAttempt from "./state/PasswordLoginAttempt";
import Email from './state/Email';
import Password from './state/Password';
import { observer } from 'mobx-react';

const onEmailUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    Email.update(event.currentTarget.value);
};

const onPasswordUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    Password.update(event.currentTarget.value);
};

const EnterPasswordDialog = observer(() => (
    <Dialog
        title="Login"
        notification={PasswordLoginAttempt.notification}
        next={{
            onClick: PasswordLoginAttempt.login,
            text: "Login"
        }}>
        <section className="section">
            <div className="field">
                <label className="label">
                    Email
                </label>
                <div className="control">
                    <input
                        className="input"
                        type="email"
                        value={Email.email}
                        onChange={onEmailUpdate} />
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
                        autoFocus={true}
                        value={Password.password}
                        onChange={onPasswordUpdate} />
                </div>
            </div>
        </section>
    </Dialog>
));

export default EnterPasswordDialog;
