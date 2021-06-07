export default class {
    constructor(errMessage, regExp) {
        this.name = "required";
        this.errMessage = errMessage;
        this.regExp = regExp;
    }
    apply(value) {
        if (!value && value !== 0)
            return true;
        return typeof (value) === "string" && this.regExp.test(value);
    }
}
