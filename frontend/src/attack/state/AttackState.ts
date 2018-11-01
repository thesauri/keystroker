import DialogState from "src/DialogState";
import AttackDialog from '../AttackDialog';

class AttackState extends DialogState {
    constructor() {
        super();
        this.selectedDialogIndex = 0;
        this.dialogs = [AttackDialog];
    }
}

export default new AttackState();
