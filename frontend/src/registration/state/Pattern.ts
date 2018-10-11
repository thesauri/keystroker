import { action, observable, computed } from "mobx";

export enum State {
    Pattern,
    ConfirmPattern,
    PatternConfirmed,
    PatternInvalid,
    PatternMismatch
}

class Pattern {
    @observable public pattern: number[] = [];
    @observable public confirmPattern: number[] = [];

    @action.bound
    public updatePattern(newPattern: number[]) {
        this.pattern = newPattern;
        this.confirmPattern = [];
    }

    @action.bound
    public updateConfirmPattern(newConfirmPattern: number[]) {
        this.confirmPattern = newConfirmPattern;
    }

    @action.bound
    public resetPattern() {
        this.pattern = [];
        this.confirmPattern = [];
    }

    @computed
    get state(): State {
        if (this.pattern.length === 0) {
            return State.Pattern;
        } else if (this.pattern.length < 3) {
            return State.PatternInvalid;
        } else if (this.confirmPattern.length === 0) {
            return State.ConfirmPattern;
        } else if (this.equalArrays(this.pattern, this.confirmPattern)) {
            return State.PatternConfirmed;
        } else {
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
