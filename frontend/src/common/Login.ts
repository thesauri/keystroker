import { KeystrokeEvent } from 'src/login/state/Password';


export default class Login {
    public email: string;
    public password: string;
    public keystrokeEvents: KeystrokeEvent[];

    constructor(email: string, password: string, keystrokeEvents: KeystrokeEvent[]) {
        this.email = email;
        this.password = password;
        this.keystrokeEvents = keystrokeEvents;
    }
}
