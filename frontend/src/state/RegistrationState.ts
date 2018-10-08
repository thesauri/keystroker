import { action, computed, observable } from "mobx";
import EmailDialog from "../EmailDialog";

class RegistrationState {
    @observable private selectedDialogIndex: number = 0;
    private dialogs: Array<() => JSX.Element> = [EmailDialog];

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
