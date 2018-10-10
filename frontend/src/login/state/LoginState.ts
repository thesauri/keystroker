import DialogState from "../../DialogState";
import EnterPasswordDialog from '../EnterPasswordDialog';
import EnterPatternDialog from '../EnterPatternDialog';
import LoginSuccessDialog from '../LoginSuccessDialog';

class LoginState extends DialogState {
    constructor() {
        super();
        this.selectedDialogIndex = 0;
        this.dialogs = [EnterPasswordDialog, EnterPatternDialog, LoginSuccessDialog];
    }
}

export default new LoginState();
