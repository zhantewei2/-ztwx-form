export default class {
    constructor(errMessage) {
        this.name = "required";
        this.errMessage = errMessage;
    }
    apply(value) {
        return value === 0 || !!value;
    }
}
