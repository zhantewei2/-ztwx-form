export default class {
    constructor(errMessage, minLength, maxLength) {
        this.name = "rangeLength";
        this.errMessage = errMessage;
        this.minLength = minLength;
        this.maxLength = maxLength;
    }
    apply(value) {
        return !value || (typeof (value) == "string" && (value.length <= this.maxLength) && (value.length >= this.minLength));
    }
}
