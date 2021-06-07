import { ControllerOpt, ErrorVal, Validator, ValueType } from "./share";
import { Subject } from "./Subject";
import { Form } from "./validators";
export interface Controller {
    id: string;
    validator?: Validator[];
    value?: ValueType;
    errors?: string[];
    valueChange?: Subject<this>;
    reset?: () => void;
    _value?: ValueType;
    _changed?: boolean;
    changed?: boolean;
    errorsChange?: Subject<string[] | undefined>;
}
export declare class ControllerItem implements Controller {
    id: string;
    _value: ValueType;
    validators?: Validator[];
    errors: string[];
    errorsTmp: string[];
    valueChange: Subject<this>;
    errorsChange: Subject<ErrorVal>;
    form: Form;
    originVal: ValueType;
    changed?: boolean;
    _changed?: boolean;
    constructor(opt: ControllerOpt);
    forkForm(form: Form): void;
    setOrigin(v: ValueType): void;
    get value(): ValueType;
    set value(v: ValueType);
    /**
     * @return pass
     */
    checkValidator(): Promise<boolean>;
    reset(): void;
    resetChange(): void;
    /**
     * changed : true
     */
    checkOriginChange(): boolean;
}
