export default class {
    constructor(errMessage, length) {
        this.name = "maxLength";
        this.errMessage = errMessage;
        this.length = length;
    }
    apply(value) {
        return !value || (typeof (value) == "string" && value.length <= this.length);
    }
}
