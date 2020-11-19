import { Validator, ValidatorErrMessage, ValueType, FnValidatorCb } from "../share";
export default class FnValidator implements Validator {
    name: string;
    errMessage: ValidatorErrMessage;
    cb: FnValidatorCb;
    apply(value: ValueType): boolean | Promise<boolean>;
    constructor(validateCb: FnValidatorCb, errMessage: ValidatorErrMessage);
}
