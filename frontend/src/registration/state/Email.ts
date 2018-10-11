import { action, observable } from "mobx";

class Email {
    @observable public email: string = "";
    @observable public notification?: string;

    @action.bound
    public update(newEmail: string) {
        this.email = newEmail;
    }

    @action.bound
    public setNotification(notification: string) {
        this.notification = notification;
    }

    @action.bound
    public validate(): boolean {
        if (this.email.length === 0) {
            this.notification = "Email cannot be empty"
            return false;
        } else {
            return true;
        }
    }
}

export default new Email();
