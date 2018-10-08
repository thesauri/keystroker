import * as React from 'react';
import Dialog from "./Dialog";

const RegistrationDialog = () => (
    <Dialog
        title="Registration"
        nextText="Next">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac placerat lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="field">
            <label className="label has-text-white">
                Email
            </label>
            <div className="control">
                <input className="input" type="email" placeholder="username@aalto.fi" autoFocus={true} />
            </div>
        </div>
    </Dialog>
);

export default RegistrationDialog;