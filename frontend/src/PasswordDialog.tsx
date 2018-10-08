import * as React from 'react';
import Dialog from "./Dialog";
import RegistrationState from "./state/RegistrationState";

const PasswordDialog = () => (
    <Dialog
        title="Password"
        next={{
            onClick: RegistrationState.next,
            text: "Next"
        }}>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac placerat lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="field">
            <label className="label has-text-white">
                Password
            </label>
            <div className="control">
                <input className="input" type="password" autoFocus={true} />
            </div>
        </div>
        <div className="field">
            <label className="label has-text-white">
                Confirm password
            </label>
            <div className="control">
                <input className="input" type="password" />
            </div>
        </div>
    </Dialog>
);

export default PasswordDialog;
