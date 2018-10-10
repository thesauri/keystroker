import DialogState from "../../DialogState";
import PasswordDialog from '../PasswordDialog';

class LoginState extends DialogState {
    constructor() {
        super();
        this.selectedDialogIndex = 0;
        this.dialogs = [PasswordDialog];
    }
}

export default new LoginState();
