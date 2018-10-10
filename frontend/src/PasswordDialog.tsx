import * as React from 'react';
import { observer } from "mobx-react";
import Dialog from "./Dialog";
import Password from "./state/Password";
import RegistrationState from "./state/RegistrationState";

const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    Password.updatePassword(event.currentTarget.value);
};

const onConfirmPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    Password.updateConfirmPassword(event.currentTarget.value);
};

const onNext = () => {
    if (Password.validate()) {
        RegistrationState.next();
    }
};

const PasswordDialog = observer(() => (
    <Dialog
        title="Password"
        notification={Password.notification}
        back={{
            onClick: RegistrationState.back,
            text: "Back"
        }}
        next={{
            onClick: onNext,
            text: "Next"
        }}>
        <section className="section">
            <p>
                Choose a password. The password should be at least 8 characters long and not in use anywhere else.
            </p>
            <div className="field">
                <label className="label">
                    Password
                </label>
                <div className="control">
                    <input
                        onChange={onPasswordChange}
                        value={Password.password}
                        className="input"
                        type="password"
                        autoFocus={true} />
                </div>
            </div>
            <div className="field">
                <label className="label">
                    Confirm password
                </label>
                <div className="control">
                    <input
                        onChange={onConfirmPasswordChange}
                        value={Password.confirmPassword}
                        className="input"
                        type="password" />
                </div>
            </div>
        </section>
    </Dialog>
));

export default PasswordDialog;
