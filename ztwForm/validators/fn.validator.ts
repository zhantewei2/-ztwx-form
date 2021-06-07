import {Validator, ValidatorErrMessage, ValueType, FnValidatorCb, FormVal} from "../share";

export default class FnValidator implements Validator{
  name = "fn";
  errMessage: ValidatorErrMessage;
  cb:FnValidatorCb;
  apply(value: ValueType, formVal?: FormVal) {
    return this.cb(value,formVal as FormVal);
  }

  constructor(validateCb:FnValidatorCb,errMessage: ValidatorErrMessage) {
    this.cb=validateCb;
    this.errMessage = errMessage;
  }
}