export default class {
    constructor(errMessage) {
        this.name = "email";
        this.reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        this.errMessage = errMessage;
    }
    apply(value) {
        return !value || (typeof (value) == "string" && this.reg.test(value));
    }
}
