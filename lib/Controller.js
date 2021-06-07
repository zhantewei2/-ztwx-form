import { Subject } from "./Subject";
import { filterUpdate } from "./filterUpdate";
export class ControllerItem {
    constructor(opt) {
        this.errors = [];
        this.errorsTmp = [];
        this.valueChange = new Subject();
        this.errorsChange = new Subject();
        this.id = opt.id;
        this.setOrigin(opt.value);
        this.validators = !opt.validator ? undefined : opt.validator instanceof Array ? opt.validator : [opt.validator];
    }
    forkForm(form) {
        this.form = form;
    }
    setOrigin(v) {
        this._value = this.originVal = v;
    }
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v;
        this.checkOriginChange(); // check origin change before valueChange.
        this.valueChange.next(this);
        this.checkValidator();
    }
    /**
     * @return pass
     */
    async checkValidator() {
        this.errorsTmp = [];
        if (!this.validators)
            return true;
        let pass;
        for (let validator of this.validators) {
            const valPass = validator.apply(this._value, this.form && this.form.value);
            pass = valPass instanceof Promise ? await valPass : valPass;
            if (pass)
                continue;
            this.errorsTmp.push(typeof validator.errMessage === "string" ?
                validator.errMessage :
                validator.errMessage(this._value));
        }
        this.errors = this.errorsTmp;
        const result = this.errors.length ? this.errors : undefined;
        this.errorsChange.next(result);
        return !result;
    }
    reset() {
        this.errors = [];
        this._value = this.originVal;
        this.resetChange();
        this.valueChange.next(this);
        this.errorsChange.next(this.errors);
    }
    resetChange() {
        this._changed = this.changed = false;
    }
    /**
     * changed : true
     */
    checkOriginChange() {
        const [originVal, currentVal] = filterUpdate(this.originVal, this._value);
        return this._changed = this.changed = originVal !== currentVal;
    }
}
