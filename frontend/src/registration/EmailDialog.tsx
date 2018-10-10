import * as React from "react";
import { observer } from "mobx-react"
import Dialog from "../Dialog";
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
        title="Email"
        notification={Email.notification}
        next={{
            onClick: onNext,
            text: "Next"
        }}>
        <section className="section">
            <p>
                Enter the email address you want to receive the login links to
            </p>
            <div className="field">
                <label className="label">
                    Email
                </label>
                <div className="control">
                    <input
                        onChange={onEmailChange}
                        value={Email.email}
                        className="input"
                        type="email"
                        placeholder="E.g. username@aalto.fi"
                        autoFocus={true} />
                </div>
            </div>
        </section>
    </Dialog>
));

export default EmailDialog;
