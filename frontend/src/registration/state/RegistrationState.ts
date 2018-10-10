import EmailDialog from "../EmailDialog";
import PasswordDialog from "../PasswordDialog";
import PatternDialog from "../PatternDialog";
import RegistrationDialog from "../RegistrationDialog";
import SuccessDialog from "../SuccessDialog";
import TOCDialog from "../TOCDialog";
import DialogState from '../../DialogState';

class RegistrationState extends DialogState {
    constructor() {
        super();
        this.selectedDialogIndex = 0;
        this.dialogs = [RegistrationDialog, EmailDialog, PasswordDialog, PatternDialog, TOCDialog, SuccessDialog];
    }
}

export default new RegistrationState();
