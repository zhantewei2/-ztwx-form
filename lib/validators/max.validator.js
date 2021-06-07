export default class {
    constructor(errMessage, maxValue) {
        this.name = "max";
        this.errMessage = errMessage;
        this.maxValue = maxValue;
    }
    apply(value) {
        if (!value && value !== 0)
            return true;
        value = Number(value);
        if (value !== 0 && !value)
            return false;
        return value <= this.maxValue;
    }
}
