export default class Login {
    public email: string;
    public password: string;
    public pattern: string;

    constructor(email: string, password: string, pattern: string) {
        this.email = email;
        this.password = password;
        this.pattern = pattern;
    }
}
