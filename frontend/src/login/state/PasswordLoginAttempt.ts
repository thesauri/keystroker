import { action, observable } from 'mobx';
import { attemptPasswordLogin } from '../../api';
import Login from '../../common/Login';
import Email from './Email';
import Password from './Password';
import LoginState from './LoginState';

class PasswordLoginAttempt {
    @observable public notification?: string;
    @observable public loginSuccessResult?: any;

    @action.bound
    public login() {
        this.notification = "";
        const login: Login = new Login(Email.email, Password.password, Password.keystrokeEvents);
        attemptPasswordLogin(login)
            .then(this.setLoginSuccessResult)
            .then(() => LoginState.next())
            .catch(this.setNotification);
    }

    @action.bound
    private setNotification(newNotification: string) {
        this.notification = newNotification;
    }

    @action.bound
    private setLoginSuccessResult(result: object) {
        this.loginSuccessResult = result;
    }
}

export default new PasswordLoginAttempt();
