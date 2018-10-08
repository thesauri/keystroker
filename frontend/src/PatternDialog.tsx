import * as React from "react";
import Dialog from './Dialog';
import RegistrationState from './state/RegistrationState';

const PatternDialog = () => ( 
    <Dialog
        title="Pattern"
        back={{
            onClick: RegistrationState.back,
            text: "Back"
        }}
        next={{
            onClick: RegistrationState.next,
            text: "Next"
        }}
    >
        <h1>
            Hello world!
        </h1>
    </Dialog>
 )

export default PatternDialog;