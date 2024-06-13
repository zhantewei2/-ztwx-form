export default class {
    constructor(errMessage, length) {
        this.name = "notEmptyList";
        this.errMessage = errMessage;
        this.length = length;
    }
    apply(value) {
        return !!value && Array.isArray(value) && value.length > 0;
    }
}
