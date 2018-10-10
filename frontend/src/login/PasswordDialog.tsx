import * as React from "react";
import LoginState from "./state/LoginState";
import Dialog from '../Dialog';

const PasswordDialog = () => (
    <Dialog
        title="Login"
        next={{
            onClick: LoginState.next,
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
                        defaultValue="walter.berggren@aalto.fi" />
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
                        autoFocus={true} />
                </div>
            </div>
        </section>
    </Dialog>
);

export default PasswordDialog;
