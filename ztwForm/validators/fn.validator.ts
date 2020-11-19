import {Validator,ValidatorErrMessage,ValueType,FnValidatorCb} from "../share";

export default class FnValidator implements Validator{
  name = "email";
  errMessage: ValidatorErrMessage;
  cb:FnValidatorCb;
  apply(value: ValueType) {
    return this.cb(value);
  }

  constructor(validateCb:FnValidatorCb,errMessage: ValidatorErrMessage) {
    this.cb=validateCb;
    this.errMessage = errMessage;
  }
}