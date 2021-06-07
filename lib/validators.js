import { Subject } from "./Subject";
import { ControllerItem } from "./Controller";
export { Subject };
export class Form {
    constructor(controllerOpts) {
        this.controllers = [];
        this.controllerChangeSubject = new Subject();
        this.valueChange = new Subject();
        this.controllerDict = {};
        this.value = {};
        this.errorsDict = {};
        this.errorsChange = new Subject();
        this.isPass = false;
        if (!controllerOpts || !controllerOpts.length)
            return;
        controllerOpts.forEach(opt => {
            this.addController(new ControllerItem(opt));
        });
        this.controllerChangeSubject.subscribe(controller => {
            this.valueChange.next(this.controllerDict);
        });
    }
    addController(controller) {
        controller.forkForm(this);
        this.controllers.push(controller);
        this.controllerDict[controller.id] = controller;
        controller.valueChange.subscribe(c => {
            this.controllerChangeSubject.next(c);
            this.valueChange.next(this.controllerDict);
        });
        // handle value
        this.value[controller.id] = controller.value;
        Object.defineProperty(this.value, controller.id, {
            get() {
                return controller.value;
            },
            set(v) {
                controller.value = v;
            }
        });
        // handle error
        controller.errorsChange.subscribe(errors => {
            this.errorsDict[controller.id] = errors;
            this.errorsChange.next(this.errorsDict);
            this.isPass = this.checkPass();
        });
    }
    checkPass() {
        for (let i in this.errorsDict) {
            if (this.errorsDict[i])
                return false;
        }
        return true;
    }
    reset() {
        this.controllers.forEach(c => c.reset());
    }
    toSerializer() {
        return this.value;
    }
    /**
     * @return pass:boolean
     */
    async checkValidators() {
        let error = false;
        for (let controller of this.controllers) {
            if (!await controller.checkValidator())
                error = true;
        }
        return !error;
    }
}
