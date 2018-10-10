import { action, computed, observable } from "mobx";
import EmailDialog from "../EmailDialog";
import PasswordDialog from "../PasswordDialog";
import PatternDialog from "../PatternDialog";
import RegistrationDialog from "../RegistrationDialog";
import SuccessDialog from "../SuccessDialog";
import TOCDialog from "../TOCDialog";

class RegistrationState {
    @observable private selectedDialogIndex: number = 0;
    private dialogs: Array<() => JSX.Element> = [RegistrationDialog, EmailDialog, PasswordDialog, PatternDialog, TOCDialog, SuccessDialog];

    @computed
    get CurrentDialog(): () => JSX.Element {
        return this.dialogs[this.selectedDialogIndex];
    }

    @action.bound
    public back(): void {
        if (this.selectedDialogIndex > 0) {
            this.selectedDialogIndex -= 1;
        }
    }

    @action.bound
    public next(): void {
        if (this.selectedDialogIndex < this.dialogs.length - 1) {
            this.selectedDialogIndex += 1;
        }
    }
}

export default new RegistrationState();
