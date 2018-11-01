import { observable, action } from "mobx";

class AttackAttempt {
    @observable public notification?: string;

    @action.bound
    public login() {
        this.notification = "Jee";
    }
}

export default new AttackAttempt();
