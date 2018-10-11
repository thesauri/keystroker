export const fromJson = (jsonObject: any): Participant => {
    hasFields(jsonObject, ["email", "password", "pattern", "toc_accepted"]);
    return new Participant(jsonObject.email, jsonObject.password, jsonObject.pattern, jsonObject.toc_accepted);
};

const hasFields = (object: any, fields: string[]) => {
    for (let field of fields) {
        if (object[field] === undefined) {
            throw new Error(`Missing field: ${field}`);
        }
    }
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

    public validate() {
        if (this.email.length == 0) {
            throw new Error("Email cannot be empty");
        }
        if (this.email.length > 1024) {
            throw new Error("Email cannot be longer than 1024 characters");
        }

        if (this.password.length < 10) {
            throw new Error("Password must be at least 10 characters long");
        }
        if (this.password.length > 1024) {
            throw new Error("Password cannot be longer than 1024 characters");
        }

        if (this.pattern.length < 2) {
            throw new Error("The pattern must connect at least 2 dots");
        }

        if (!this.toc_accepted) {
            throw new Error("The terms of conditions must be accepted");
        }
    }
}