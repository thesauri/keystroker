import * as React from "react";
import Dialog from "./Dialog";

const RegistrationDialog = () => (
    <Dialog
        title="Registration successful! 🎉">
        <section className="section">
            <p>
                Thank you for signing up to the study!
            </p>
            <p>
                During the two weeks from Monday October 15 to Sunday October 28, you will receive links to your email for logging in to the page. Your task is simple, log in and get your cinema tickets! 🍿
            </p>
            <p>
                Questions? Contact Walter Berggren at <a href="mailto:walter.berggren@aalto.fi">walter.berggren@aalto.fi</a>, or by Telegram @thesauri.
            </p>
            <p>
                Good luck!
            </p>
        </section>
    </Dialog>
);

export default RegistrationDialog;
