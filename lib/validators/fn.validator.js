export default class FnValidator {
    constructor(validateCb, errMessage) {
        this.name = "fn";
        this.cb = validateCb;
        this.errMessage = errMessage;
    }
    apply(value, formVal) {
        return this.cb(value, formVal);
    }
}
