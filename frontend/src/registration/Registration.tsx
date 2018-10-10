import * as React from "react";
import { observer } from "mobx-react";
import RegistrationState from "./state/RegistrationState";

const Registration = observer(() => {
    const { CurrentDialog } = RegistrationState;
    return (
        <CurrentDialog />
    );
});

export default Registration;