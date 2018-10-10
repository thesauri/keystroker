import * as React from "react";
import Dialog from "../Dialog";

const LoginSuccessDialog = () => (
    <Dialog
        title="Login successful! 🎉">
        <section className="section">
            <p>
                Thank you for logging in! You are now one login closer to the cinema tickets! 🍿
            </p>
            <p>
                Fancy progress bar or pie chart here 
            </p>
        </section>
    </Dialog>
);

export default LoginSuccessDialog;