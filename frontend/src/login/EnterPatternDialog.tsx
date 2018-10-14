import * as React from "react";
import Dialog from '../Dialog';
import PatternLock from '../PatternLock/PatternLock';
import PatternLoginAttempt from './state/PatternLoginAttempt';
import { observer } from 'mobx-react';

const EnterPatternDialog = observer(() => (
    <Dialog
        title="Enter pattern"
        notification={PatternLoginAttempt.notification}>
        <PatternLock
            height={350}
            width={350}
            onPatternEntered={PatternLoginAttempt.login}
            pointRadius={8} />
    </Dialog>
));

export default EnterPatternDialog;
