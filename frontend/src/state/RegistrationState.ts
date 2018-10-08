import { action, computed, observable } from "mobx";
import RegistrationDialog from "../RegistrationDialog";

class RegistrationState {
    @observable private selectedDialogIndex: number = 0;
    private dialogs: Array<() => JSX.Element> = [RegistrationDialog];

    @computed
    get CurrentDialog(): () => JSX.Element {
        return this.dialogs[this.selectedDialogIndex];
    }

    @action
    public back(): void {
        if (this.selectedDialogIndex > 0) {
            this.selectedDialogIndex -= 1;
        }
    }

    @action
    public next(): void {
        if (this.selectedDialogIndex < this.dialogs.length - 1) {
            this.selectedDialogIndex += 1;
        }
    }
}

export default new RegistrationState();
