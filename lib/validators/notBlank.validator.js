export default class {
    constructor(errMessage) {
        this.name = "notBlank";
        this.errMessage = errMessage;
    }
    apply(value) {
        if (typeof value == "string")
            return !!value.trim();
        return value === 0 || !!value;
    }
}
