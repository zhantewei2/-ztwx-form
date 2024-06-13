import {Validator, ValidatorErrMessage, ValueType} from "../share";

export default class implements Validator {
    name = "notEmptyList";
    errMessage: ValidatorErrMessage;
    length: number;

    apply(value: ValueType) {
        return !!value && Array.isArray(value) && value.length>0;
    }

    constructor(errMessage: ValidatorErrMessage, length: number) {
        this.errMessage = errMessage;
        this.length = length;
    }
}