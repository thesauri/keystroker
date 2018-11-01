import { observable, action } from "mobx";

class AttackAttacker {
    @observable public attacker: string = "";

    @action.bound
    public update(newAttacker: string) {
        this.attacker = newAttacker;
    }
}

export default new AttackAttacker();
