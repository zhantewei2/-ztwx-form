import { Subject } from "./Subject";
export declare type ValidatorErrMessage = ((value: any) => string) | string;
export declare type ValueType = string | number | undefined | boolean | Array<any>;
export declare type FormVal = Record<string, ValueType>;
export declare type ErrorVal = undefined | string[];
export interface Validator {
    apply: (value: ValueType, formVal?: FormVal, controller?: Controller) => boolean | Promise<boolean>;
    name: string;
    errMessage: ValidatorErrMessage;
}
export interface ControllerOpt {
    id: string;
    value?: ValueType;
    validator?: Validator | Validator[];
}
export interface Controller {
    id: string;
    validator?: Validator[];
    value?: ValueType;
    errors?: string[];
    valueChange?: Subject<Controller>;
    reset?: () => void;
    _value?: ValueType;
    _changed?: boolean;
    changed?: boolean;
    errorsChange?: Subject<string[]>;
}
export declare type FnValidatorCb = (value: ValueType, formVal: FormVal) => Promise<boolean> | boolean;
