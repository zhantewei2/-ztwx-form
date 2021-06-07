import { Validator, ValidatorErrMessage, ValueType, FnValidatorCb, FormVal } from "../share";
export default class FnValidator implements Validator {
    name: string;
    errMessage: ValidatorErrMessage;
    cb: FnValidatorCb;
    apply(value: ValueType, formVal?: FormVal): boolean;
    constructor(validateCb: FnValidatorCb, errMessage: ValidatorErrMessage);
}
