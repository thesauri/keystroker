import * as React from "react";
import AttackState from './state/AttackState';
import { observer } from 'mobx-react';

const Attack = observer(() => {
    const CurrentDialog = AttackState.CurrentDialog;
    return (
        <CurrentDialog />
    );
});

export default Attack;

