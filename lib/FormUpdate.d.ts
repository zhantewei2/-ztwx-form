import { Form } from "./validators";
import { ControllerOpt } from "./share";
export declare class FormUpdateVersion extends Form {
    constructor(controllerOpts: ControllerOpt[]);
    clearChange(): void;
    /**
     * 设置待更新的原始数据
     * @param originalValue
     */
    setOriginValue(originalValue: Record<string, any>): void;
    fillOriginVal(value: Record<string, any>): void;
    updateOriginValue(updateValue: Record<string, any>): void;
    reset(): void;
    /**
     * 获取发生更改的值
     */
    getUpdatedValue(): undefined | Record<string, any>;
    changeOrderExists: boolean;
    _isChanged: boolean;
    checkChanged(): boolean;
    get isChanged(): boolean;
}
