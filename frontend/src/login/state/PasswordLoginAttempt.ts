import { action, observable } from 'mobx';
import { attemptPasswordLogin } from '../../api';
import Login from '../../common/Login';
import Email from './Email';
import Password from './Password';
import LoginState from './LoginState';

class PasswordLoginAttempt {
    @observable public notification?: string;

    @action.bound
    public login() {
        const login: Login = new Login(Email.email, Password.password, Password.keystrokeEvents);
        attemptPasswordLogin(login)
            .then(() => LoginState.next())
            .catch(this.setNotification);
    }

    @action.bound
    private setNotification(newNotification: string) {
        this.notification = newNotification;
    }
}

export default new PasswordLoginAttempt();
