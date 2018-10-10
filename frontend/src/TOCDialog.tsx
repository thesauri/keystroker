import * as React from "react";
import { observer } from "mobx-react"
import Dialog from "./Dialog";
import TOC from "./state/TOC";
import RegistrationState from "./state/RegistrationState";

const onCheck = (event: React.FormEvent<HTMLInputElement>) => {
    TOC.tick(event.currentTarget.checked);
};

const onNext = () => {
    if (TOC.validate()) {
        RegistrationState.next();
    }
};

const TOCDialog = observer(() => (
    <Dialog
        title="One last step"
        notification={TOC.notification}
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
                I, bla bla bla nice TOC here and I, bla bla bla nice TOC here
            </p>
            <div className="field">
                <label className="checkbox">
                    <input type="checkbox" defaultChecked={TOC.ticked} onChange={onCheck} />
                    I agree to the terms and conditions above
                </label>
            </div>
        </section>
    </Dialog>
));

export default TOCDialog;
