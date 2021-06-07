import {Subject, SubjectOrder} from "./Subject";

export type ValidatorErrMessage = ((value: any) => string) | string;

export type ValueType = string | number | undefined |boolean;

export type FormVal = Record<string,ValueType>;

export type ErrorVal=undefined|string[];

export interface Validator {
    apply: (value: ValueType , formVal? : FormVal, controller?:Controller) => boolean | Promise<boolean>;
    name: string;
    errMessage: ValidatorErrMessage;
}

export interface ControllerOpt{
    id:string;
    value?: ValueType;
    validator?:Validator | Validator[];
}

export interface Controller {
    id: string;
    validator?: Validator[];
    value?: ValueType;
    errors?: string[];
    valueChange?: Subject<Controller>;
    reset?: () => void;
    _value?: ValueType;
    _changed?:boolean;
    changed?:boolean;  //值是否改变
    errorsChange?:Subject<string[]>;
    // valueChangeSubjectOrder?:SubjectOrder<any>;
    // changeObservable?:()=>Subject<Controller>;
    // _changeObservable?:Subject<Controller>;
}

export type FnValidatorCb=(value:ValueType,formVal:FormVal)=>Promise<boolean>|boolean;