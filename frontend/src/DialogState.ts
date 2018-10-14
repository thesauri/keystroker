import { action, computed, observable } from "mobx";

export default class DialogState {
    @observable public selectedDialogIndex: number;
    public dialogs: Array<() => JSX.Element>

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
