import * as React from "react";
import { observer } from 'mobx-react';
import "./CreatingAccountDialog.css";
import Dialog from '../Dialog';
import RegistrationState from './state/RegistrationState';
import { createParticipant } from '../api';

const addParticipant = () => ( 
    RegistrationState.participant()
        .then(createParticipant)
        .then(() => RegistrationState.next())
        .catch(RegistrationState.registrationFailed)
);

const CreatingAccountDialog = observer(() => {
    addParticipant();
    return (
        <Dialog
            title="Creating account">
            <section className="section">
                <div className="ripple">
                    <div />
                    <div />
                </div>
            </section>
        </Dialog>
    );
});

export default CreatingAccountDialog;
