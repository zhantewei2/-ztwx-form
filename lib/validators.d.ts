import { Controller, ControllerOpt, ErrorVal, FormVal, Validator, ValueType } from "./share";
import { SubjectOrder, Subject } from "./Subject";
import { ControllerItem } from "./Controller";
export { Controller, Validator, ValueType, Subject, SubjectOrder };
export declare type ErrorsDict = Record<string, ErrorVal>;
export declare class Form {
    controllers: ControllerItem[];
    controllerChangeSubject: Subject<ControllerItem>;
    valueChange: Subject<{
        [key: string]: ControllerItem;
    }>;
    controllerDict: {
        [key: string]: ControllerItem;
    };
    value: FormVal;
    errorsDict: ErrorsDict;
    errorsChange: Subject<ErrorsDict>;
    isPass: boolean;
    constructor(controllerOpts: ControllerOpt[]);
    addController(controller: ControllerItem): void;
    checkPass(): boolean;
    reset(): void;
    toSerializer(): Record<string, any>;
    /**
     * @return pass:boolean
     */
    checkValidators(): Promise<boolean>;
    /**
     * @return errMsg:string;
     */
    catchValidatorsErr(): Promise<string[] | void>;
}
