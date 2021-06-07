import { Subject, SubjectOrder } from "./Subject";
export declare type ValidatorErrMessage = ((value: any) => string) | string;
export declare type ValueType = string | number | undefined | boolean;
export declare type FormVal = Record<string, ValueType>;
export interface Validator {
    apply: (value: ValueType, formValue?: FormVal) => boolean;
    name: string;
    errMessage: ValidatorErrMessage;
}
export interface Controller {
    id: string;
    validator: Validator | Validator[];
    value?: ValueType;
    errors?: string[];
    valueChange?: Subject<Controller>;
    reset?: () => void;
    _value?: ValueType;
    _changed?: boolean;
    changed?: boolean;
    valueChangeSubjectOrder?: SubjectOrder<any>;
    changeObservable?: () => Subject<Controller>;
    _changeObservable?: Subject<Controller>;
}
export declare type FnValidatorCb = (value: ValueType, formVal: FormVal) => boolean;
