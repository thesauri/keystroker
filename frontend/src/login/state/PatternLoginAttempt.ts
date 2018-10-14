import { action, observable } from 'mobx';
import { attemptPatternLogin } from '../../api';
import LoginState from './LoginState';
import Email from './Email';

class PatternLoginAttempt {
    @observable public notification?: string;

    @action.bound
    public login(pattern: number[]) {
        attemptPatternLogin(Email.email, pattern)
            .then(() => LoginState.next())
            .catch(this.setNotification);
    }

    @action.bound
    private setNotification(newNotification: string) {
        this.notification = newNotification;
    }
}

export default new PatternLoginAttempt();
