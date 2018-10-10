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
        <section className="section">
            <p>
                Thank you for your interest in participating in this study!
            </p>
            <p>
                During the two weeks from Monday October 15 to Sunday October 28, you will be asked to log in to this website four times a day. To make this as simple as possible, you will receive reminders by email with links for logging in.
            </p>
            <p>
                Logging in is done using a password and a pattern that you will assign in the next steps. As the purpose of the study is to compare login methods for mobile phones, please log in using your mobile phone.
            </p>
            <p>
                The total time commitment for this study is estimated to be 1–2 hours. This will be compensated with two cinema tickets. 🍿
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
                        placeholder="username@aalto.fi"
                        autoFocus={true} />
                </div>
            </div>
        </section>
    </Dialog>
));

export default EmailDialog;
