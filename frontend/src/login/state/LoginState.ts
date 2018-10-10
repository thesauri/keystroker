import DialogState from "../../DialogState";
import PasswordDialog from '../PasswordDialog';
import EnterPatternDialog from '../EnterPatternDialog';
import LoginSuccessDialog from '../LoginSuccessDialog';

class LoginState extends DialogState {
    constructor() {
        super();
        this.selectedDialogIndex = 0;
        this.dialogs = [PasswordDialog, EnterPatternDialog, LoginSuccessDialog];
    }
}

export default new LoginState();
