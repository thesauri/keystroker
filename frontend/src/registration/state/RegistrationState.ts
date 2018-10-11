import EmailDialog from "../EmailDialog";
import PasswordDialog from "../PasswordDialog";
import PatternDialog from "../PatternDialog";
import RegistrationDialog from "../RegistrationDialog";
import SuccessDialog from "../SuccessDialog";
import TOCDialog from "../TOCDialog";
import DialogState from '../../DialogState';
import CreatingAccountDialog from '../CreatingAccountDialog';
import { action } from 'mobx';
import Participant from '../../common/Participant';
import Email from './Email';
import Password from './Password';
import Pattern from './Pattern';
import TOC from './TOC';

class RegistrationState extends DialogState {
    constructor() {
        super();
        this.selectedDialogIndex = 0;
        this.dialogs = [RegistrationDialog, EmailDialog, PasswordDialog, PatternDialog, TOCDialog, CreatingAccountDialog, SuccessDialog];
    }

    @action.bound
    public registrationFailed(error: string) {
        this.selectedDialogIndex = this.dialogs.indexOf(EmailDialog);
        Email.setNotification(error);
    }

    public participant(): Promise<Participant> {
        const participant = new Participant(Email.email, Password.password, Pattern.pattern, TOC.ticked);
        return participant.validate();
    }
}

export default new RegistrationState();
