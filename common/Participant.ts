export const fromJson = (jsonObject: any): Promise<Participant> => (
    hasFields(jsonObject, ["email", "password", "pattern", "toc_accepted"])
        .then(() => new Participant(jsonObject.email, jsonObject.password, jsonObject.pattern, jsonObject.toc_accepted))
);

const hasFields = (object: any, fields: string[]): Promise<boolean> => {
    for (let field of fields) {
        if (object[field] === undefined) {
            return Promise.reject(`Missing field: ${field}`);
        }
    }

    return Promise.resolve(true);
}

export default class Participant {
    public email: string;
    public password: string;
    public pattern: number[];
    public toc_accepted: boolean;

    constructor(email: string, password: string, pattern: number[], toc_accepted: boolean) {
        this.email = email;
        this.password = password;
        this.pattern = pattern;
        this.toc_accepted = toc_accepted;
        this.validate();
    }

    public validate(): Promise<boolean> {
        if (this.email.length == 0) {
            return Promise.reject("Email cannot be empty");
        }
        if (this.email.length > 1024) {
            throw new Error("Email cannot be longer than 1024 characters");
        }

        if (this.password.length < 10) {
            return Promise.reject("Password must be at least 10 characters long");
        }
        if (this.password.length > 1024) {
            return Promise.reject("Password cannot be longer than 1024 characters");
        }

        if (this.pattern.length < 2) {
            return Promise.reject("The pattern must connect at least 2 dots");
        }

        if (!this.toc_accepted) {
            return Promise.reject("The terms of conditions must be accepted");
        }

        return Promise.resolve(true);
    }
}