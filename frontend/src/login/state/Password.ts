import { observable, action } from "mobx";

class Password {
    @observable public password: string = "";

    @action.bound
    public update(newPassword: string) {
        this.password = newPassword;
    }
}

export default new Password();
