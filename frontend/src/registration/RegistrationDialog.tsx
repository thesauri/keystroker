import * as React from "react";
import Dialog from "../Dialog";
import RegistrationState from "./state/RegistrationState";
import { Link } from 'react-router-dom';

const RegistrationDialog = () => (
    <Dialog
        title="Registration"
        next={{
            onClick: RegistrationState.next,
            text: "Next"
        }}>
        <section className="section">
            <p>
                Thank you for your interest in participating in this study!
            </p>
            <p>
                During two weeks, from Monday (2018-10-15) to Sunday (2018-10-28), you will be asked to log in to this website four times a day. To make this as simple as possible, you will receive reminders by email with links for logging in.
            </p>
            <p>
                Logging in is done using a password and a pattern that you will assign in the next steps. As the purpose of the study is to compare login methods for mobile phones, please log in using your mobile phone.
            </p>
            <p>
                The total time commitment for this study is estimated to be 1–2 hours. This will be compensated with two cinema tickets. 🍿
            </p>
            <p>
                Questions? Contact Walter Berggren at <a href="mailto:walter.berggren@aalto.fi">walter.berggren@aalto.fi</a>, or by Telegram @thesauri.
            </p>
            <p>
                Already registered? You can either log in by following the links sent by email or by <Link to="/login">visiting the login page</Link>.
            </p>
        </section>
    </Dialog>
);

export default RegistrationDialog;
