import * as React from "react";
import { observer } from "mobx-react"
import Dialog from "./Dialog";
import Email from "./state/Email";
import RegistrationState from "./state/RegistrationState";

const onEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    Email.update(event.currentTarget.value);
}

const onNext = () => {
    if (Email.validate()) {
        RegistrationState.next();
    }
}

const EmailDialog = observer(() => (
    <Dialog
        title="Registration"
        notification={Email.notification}
        next={{
            onClick: onNext,
            text: "Next"
        }}>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac placerat lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="field">
            <label className="label has-text-white">
                Email
            </label>
            <div className="control">
                <input
                    onChange={onEmailChange}
                    value={Email.email}
                    className="input"
                    type="email"
                    placeholder="username@aalto.fi"
                    autoFocus={true} />
            </div>
        </div>
    </Dialog>
));

export default EmailDialog;
