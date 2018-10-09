import * as React from "react";
import { observer } from "mobx-react";
import Dialog from './Dialog';
import Pattern, { State } from "./state/Pattern";
import RegistrationState from './state/RegistrationState';
import PatternLock from './PatternLock/PatternLock';

const EnterPatternDialog = () => (
    <Dialog
        title="Choose a pattern"
        back={{
            onClick: RegistrationState.back,
            text: "Back"
        }}
        next={{
            disabled: true,
            onClick: RegistrationState.next,
            text: "Next"
        }}
    >
        <PatternLock
            onPatternEntered={Pattern.updatePattern}
            pointRadius={8} />
    </Dialog>
);

const ConfirmPatternDialog = () => (
    <Dialog
        title="Confirm pattern"
        back={{
            onClick: RegistrationState.back,
            text: "Back"
        }}
        next={{
            disabled: true,
            onClick: RegistrationState.next,
            text: "Next"
        }}
    >
        <PatternLock
            onPatternEntered={Pattern.updateConfirmPattern}
            pointRadius={8} />
    </Dialog>
);

const InvalidPatternDialog = () => (
    <Dialog
        title="Invalid pattern"
        back={{
            onClick: RegistrationState.back,
            text: "Back"
        }}
        next={{
            disabled: true,
            onClick: RegistrationState.next,
            text: "Next"
        }}
    >
        <PatternLock
            onPatternEntered={Pattern.updatePattern}
            pointRadius={8} />
    </Dialog>
);

const PatternConfirmedDialog = () => (
    <Dialog
        title="Pattern confirmed!"
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
            The pattern was entered successfully!
        </h1>
    </Dialog>
 );

 const PatternMismatchDialog = () => (
    <Dialog
        title="The patterns did not match"
        back={{
            onClick: RegistrationState.back,
            text: "Back"
        }}
        next={{
            disabled: true,
            onClick: RegistrationState.next,
            text: "Next"
        }}
    >
        <PatternLock
            onPatternEntered={Pattern.updatePattern}
            pointRadius={8} />
    </Dialog>
);

const Dialogs = {
    [State.Pattern]: EnterPatternDialog,
    [State.ConfirmPattern]: ConfirmPatternDialog,
    [State.PatternConfirmed]: PatternConfirmedDialog,
    [State.PatternInvalid]: InvalidPatternDialog,
    [State.PatternMismatch]: PatternMismatchDialog
};

const PatternDialog = observer(() => {
    return Dialogs[Pattern.state]();
});

export default PatternDialog;