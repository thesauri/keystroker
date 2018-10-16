import DialogState from "../../DialogState";
import EnterPasswordDialog from '../EnterPasswordDialog';
import EnterPatternDialog from '../EnterPatternDialog';
import LoginSuccessDialog from '../LoginSuccessDialog';
import { action } from 'mobx';
import Password from 'src/login/state/Password';

class LoginState extends DialogState {
    constructor() {
        super();
        this.selectedDialogIndex = 0;
        this.dialogs = [EnterPasswordDialog, EnterPatternDialog, LoginSuccessDialog];
    }

    @action.bound
    public loginAgain() {
        this.selectedDialogIndex = 0;
        Password.reset();
    }
}

export default new LoginState();
