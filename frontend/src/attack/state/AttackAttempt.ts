import { observable, action } from "mobx";
import AttackAttacker from './AttackAttacker';
import AttackEmail from './AttackEmail';
import { attemptAttack } from 'src/api';
import AttackPassword from './AttackPassword';

class AttackAttempt {
    @observable public notification?: string;
    @observable public isSuccessNotification: boolean = true;

    @action.bound
    public login() {
        if (AttackAttacker.attacker === "") {
            this.notification = "Attacker cannot be empty";
            return;
        } else if (AttackEmail.email === "") {
            this.notification = "Email cannot be empty";
            return;
        }


        attemptAttack(AttackAttacker.attacker, AttackEmail.email, AttackPassword.password, AttackPassword.keystrokeEvents)
            .then(this.successNotification)
            .catch(error => {
                if (typeof error === "string") {
                    this.errorNotification(error);
                } else {
                    // tslint:disable-next-line
                    console.log(error);
                }
            });

        AttackPassword.reset();
    }

    @action.bound
    public successNotification(newNotification: string) {
        this.isSuccessNotification = true;
        this.notification = newNotification;
    }

    @action.bound
    public errorNotification(newNotification: string) {
        this.isSuccessNotification = false;
        this.notification = newNotification;
    }
}

export default new AttackAttempt();
