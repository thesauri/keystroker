import DialogState from "../../DialogState";
import PasswordDialog from '../PasswordDialog';
import EnterPatternDialog from '../EnterPatternDialog';

class LoginState extends DialogState {
    constructor() {
        super();
        this.selectedDialogIndex = 0;
        this.dialogs = [PasswordDialog, EnterPatternDialog];
    }
}

export default new LoginState();
