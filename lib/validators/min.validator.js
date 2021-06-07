export default class {
    constructor(errMessage, minValue) {
        this.name = "min";
        this.errMessage = errMessage;
        this.minValue = minValue;
    }
    apply(value) {
        if (!value && value !== 0)
            return true;
        value = Number(value);
        if (value !== 0 && !value)
            return false;
        return value >= this.minValue;
    }
}
