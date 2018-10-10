import * as React from "react";
import LoginState from "./state/LoginState";
import { observer } from 'mobx-react';

const Login = observer(() => {
    const CurrentDialog = LoginState.CurrentDialog;
    return (
        <CurrentDialog />
    );
});

export default Login;
