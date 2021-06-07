import { Form } from "./validators";
export class FormUpdateVersion extends Form {
    constructor(controllerOpts) {
        super(controllerOpts);
        this.changeOrderExists = false;
        this._isChanged = false;
    }
    clearChange() {
        this._isChanged = false;
        this.controllers.forEach(i => i.resetChange());
    }
    /**
     * 设置待更新的原始数据
     * @param originalValue
     */
    setOriginValue(originalValue) {
        this.clearChange();
        this.fillOriginVal(originalValue);
    }
    fillOriginVal(value) {
        Object.keys(this.value).forEach((key) => {
            this.controllerDict[key].setOrigin(value[key]);
        });
    }
    updateOriginValue(updateValue) {
        this.fillOriginVal(updateValue);
        if (!this.getUpdatedValue())
            this.clearChange();
    }
    reset() {
        super.reset();
        this.clearChange();
    }
    /**
     * 获取发生更改的值
     */
    getUpdatedValue() {
        const updateValue = {};
        this.controllers.forEach(controller => {
            if (controller.checkOriginChange())
                updateValue[controller.id] = controller.value;
        });
        return Object.keys(updateValue).length ? updateValue : undefined;
    }
    checkChanged() {
        for (let i of this.controllers) {
            if (i.changed)
                return true;
        }
        return false;
    }
    get isChanged() {
        if (!this.changeOrderExists) {
            this.valueChange.subscribe(dict => {
                for (let i in dict) {
                    if (dict[i].changed) {
                        this._isChanged = true;
                        break;
                    }
                }
            });
            return this._isChanged = this.checkChanged();
        }
        return this._isChanged;
    }
}
