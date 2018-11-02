export const fromJson = (jsonObject: any): Promise<Attack> => {
    try {
        const login: Attack = jsonObject;
        return Promise.resolve(login);
    } catch (error) {
        return Promise.reject("Bad attack request object");
    }
}

export default class Attack {
    public attacker: string;
    public email: string;
    public password: string;
    public keystrokeEvents: string;
    

    constructor(attacker: string, email: string, password: string, keystrokeEvents: string) {
        this.email = email;
        this.password = password;
        this.keystrokeEvents = keystrokeEvents;
    }
}
