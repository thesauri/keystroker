import * as React from "react";
import { observer } from "mobx-react"
import Dialog from "../Dialog";
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
        title="Terms and conditions"
        notification={TOC.notification}
        back={{
            onClick: RegistrationState.back,
            text: "Back"
        }}
        next={{
            onClick: onNext,
            text: "Submit"
        }}>
        <section className="section">
            <p>
                I have understood that participation is voluntary and at any point in the research study, I am at liberty to notify that I no longer wish to participate in the study, but all the information gathered up until that point is can be used as described.
            </p>
            <p>
                I have received sufficient information about the research study, I have had the possibility to have my questions answered, I have understood the information and I wish to participate in the research study.
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
