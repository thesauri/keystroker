import { action, observable, computed } from "mobx";

export enum State {
    Pattern,
    ConfirmPattern,
    PatternConfirmed,
    PatternInvalid,
    PatternMismatch
}

class Pattern {
    @observable public pattern?: number[];
    @observable public confirmPattern?: number[];

    @action.bound
    public updatePattern(newPattern: number[]) {
        this.pattern = newPattern;
        this.confirmPattern = undefined;
    }

    @action.bound
    public updateConfirmPattern(newConfirmPattern: number[]) {
        this.confirmPattern = newConfirmPattern;
    }

    @computed
    get state(): State {
        if (!this.pattern) {
            return State.Pattern;
        } else if (this.pattern.length < 3) {
            return State.PatternInvalid;
        } else if (!this.confirmPattern) {
            return State.ConfirmPattern;
        } else if (this.equalArrays(this.pattern, this.confirmPattern)) {
            return State.PatternConfirmed;
        } else {
            // tslint:disable-next-line
            console.log(this.pattern);
            // tslint:disable-next-line
            console.log(this.confirmPattern);
            return State.PatternMismatch;
        }
    }

    private equalArrays(a: number[], b: number[]): boolean {
        if (a.length !== b.length) {
            return false;
        }

        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }

        return true;
    }
}

export default new Pattern();
