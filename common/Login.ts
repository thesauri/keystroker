export const fromJson = (jsonObject: any): Promise<Login> => {
    try {
        const login: Login = jsonObject;
        return Promise.resolve(login);
    } catch (error) {
        return Promise.reject("Bad login request object");
    }
}

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
