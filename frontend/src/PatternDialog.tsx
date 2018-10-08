import * as React from "react";
import Dialog from './Dialog';
import RegistrationState from './state/RegistrationState';
import PatternLock from './PatternLock';

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
        <PatternLock />
    </Dialog>
 )

export default PatternDialog;