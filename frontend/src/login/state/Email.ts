import { observable, action } from "mobx";

export class Email {
    @observable public email: string = "";

    @action.bound
    public update(newEmail: string) {
        this.email = newEmail;
    }
}

export default new Email();
