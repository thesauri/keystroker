import { action, observable } from "mobx";

class Password {
    @observable public password: string = "";
    @observable public confirmPassword: string = "";
    @observable public notification?: string;

    @action.bound
    public updatePassword(newPassword: string) {
        this.password = newPassword;
    }

    @action.bound
    public updateConfirmPassword(newConfirmPassword: string) {
        this.confirmPassword = newConfirmPassword;
    }

    @action.bound
    public validate(): boolean {
        if (this.password !== this.confirmPassword) {
            this.notification = "The passwords must match"
            return false;
        } else if (this.password.length < 10) {
            this.notification = "The password must be at least 10 characters long"
            return false;
        } else {
            return true;
        }
    }
}

export default new Password();
