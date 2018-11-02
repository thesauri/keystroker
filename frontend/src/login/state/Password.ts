import { observable, action } from "mobx";

interface KeyboardProperties {
    held: boolean;
    key: string;
    keyCode?: number;
}

export interface KeystrokeEvent {
    keyboardEvent: KeyboardProperties;
    time: number;
}

export class Password {
    @observable public password: string = "";
    @observable public keystrokeEvents: KeystrokeEvent[] = [];

    @action.bound
    public update(newPassword: string) {
        this.password = newPassword;
    }

    @action.bound
    public addKeystrokeEvent(key: string, keyCode: number | undefined, held: boolean) {
        const time = new Date().getTime();
        const keyboardEventProperties: KeyboardProperties = { held, key, keyCode };
        this.keystrokeEvents.push({
            keyboardEvent: keyboardEventProperties,
            time
        });
    }

    @action.bound
    public reset() {
        this.password = "";
        this.keystrokeEvents = [];
    }
}

export default new Password();
