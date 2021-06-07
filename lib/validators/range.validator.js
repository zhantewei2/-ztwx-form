export default class {
    constructor(errMessage, minValue, maxValue) {
        this.name = "range";
        this.errMessage = errMessage;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
    apply(value) {
        if (!value && value !== 0)
            return true;
        value = Number(value);
        if (value !== 0 && !value)
            return false;
        return value >= this.minValue && value <= this.maxValue;
    }
}
