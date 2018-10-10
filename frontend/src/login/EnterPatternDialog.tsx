import * as React from "react";
import LoginState from "./state/LoginState";
import Dialog from '../Dialog';
import PatternLock from '../PatternLock/PatternLock';

const EnterPatternDialog = () => (
    <Dialog
        title="Enter pattern">
        <PatternLock
            height={350}
            width={350}
            onPatternEntered={LoginState.next}
            pointRadius={8} />
    </Dialog>
);

export default EnterPatternDialog;
