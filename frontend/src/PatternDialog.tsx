import * as React from "react";
import { observer } from "mobx-react";
import Dialog from './Dialog';
import Pattern, { State } from "./state/Pattern";
import RegistrationState from './state/RegistrationState';
import PatternLock from './PatternLock/PatternLock';

interface IStyledPatternLock {
    onPatternEntered: (pattern: number[]) => any;
}

const StyledPatternLock = ({ onPatternEntered }: IStyledPatternLock) => (
    <PatternLock
        height={350}
        width={350}
        onPatternEntered={onPatternEntered}
        pointRadius={8} />
);



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
        <StyledPatternLock
            onPatternEntered={Pattern.updatePattern} />
    </Dialog>
);

const ConfirmPatternDialog = () => (
    <Dialog
        title="Confirm pattern"
        back={{
            onClick: Pattern.resetPattern,
            text: "Back"
        }}
        next={{
            disabled: true,
            onClick: RegistrationState.next,
            text: "Next"
        }}
    >
        <StyledPatternLock
            onPatternEntered={Pattern.updateConfirmPattern} />
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
        <StyledPatternLock
            onPatternEntered={Pattern.updatePattern} />
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
        <section className="section">
            <p>
                The pattern was entered successfully!
            </p>
            <p>
                In case you want to change the pattern, click the button below. Otherwise, click next to finish the registration.
            </p>
            <button className="button" onClick={Pattern.resetPattern}>
                Change pattern
            </button>
        </section>
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
        <StyledPatternLock
            onPatternEntered={Pattern.updatePattern} />
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