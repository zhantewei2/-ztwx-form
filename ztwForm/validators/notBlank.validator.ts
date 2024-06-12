import {Validator, ValidatorErrMessage, ValueType} from "../share";

export default class implements Validator {
    name = "notBlank";
    errMessage: ValidatorErrMessage;

    apply(value: ValueType) {
        if(typeof value =="string") return !!value.trim();
        return value === 0 || !!value;
    }

    constructor(errMessage: ValidatorErrMessage) {
        this.errMessage = errMessage;
    }
}