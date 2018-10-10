import { action, observable } from "mobx";

class TOC {
    @observable public ticked: boolean = false;
    @observable public notification?: string;

    @action.bound
    public tick(ticked: boolean) {
        this.ticked = ticked;
    }

    @action.bound
    public validate(): boolean {
        if (this.ticked) {
            this.notification = undefined;
            return true;
        } else {
            this.notification = "You must agree to the terms of condition";
            return false;
        }
    }
}

export default new TOC();
