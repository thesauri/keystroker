import { observable, action } from "mobx";

interface KeyboardProperties {
    altKey: boolean;
    code: string;
    ctrlKey: boolean;
    key: string;
    keyCode: number;
    metaKey: boolean;
    repeat: boolean;
    returnValue: boolean;
    shiftKey: boolean;
    timeStamp: number;
}

export interface KeystrokeEvent {
    keyboardEvent: KeyboardProperties;
    time: number;
}

class Password {
    @observable public password: string = "";
    @observable public keystrokeEvents: KeystrokeEvent[] = [];

    @action.bound
    public update(newPassword: string) {
        this.password = newPassword;
    }

    @action.bound
    public addKeystrokeEvent(keyboardEvent: KeyboardEvent) {
        const time = new Date().getTime();
        const keyboardEventProperties = this.extractKeyboardEventProperties(keyboardEvent);
        this.keystrokeEvents.push({
            keyboardEvent: keyboardEventProperties,
            time
        });
    }

    private extractKeyboardEventProperties(keyboardEvent: KeyboardEvent): KeyboardProperties {
        return {
            altKey: keyboardEvent.altKey,
            code: keyboardEvent.code,
            ctrlKey: keyboardEvent.ctrlKey,
            key: keyboardEvent.key,
            keyCode: keyboardEvent.keyCode,
            metaKey: keyboardEvent.metaKey,
            repeat: keyboardEvent.repeat,
            returnValue: keyboardEvent.returnValue,
            shiftKey: keyboardEvent.shiftKey,
            timeStamp: keyboardEvent.timeStamp,
        };
    }
}

export default new Password();
