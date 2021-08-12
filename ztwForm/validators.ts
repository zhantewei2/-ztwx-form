import {Controller, ControllerOpt, ErrorVal, FormVal, Validator, ValueType} from "./share";
import {SubjectOrder, Subject} from "./Subject";
import {ControllerItem} from "./Controller";

export {
    Controller,
    Validator,
    ValueType,
    Subject,
    SubjectOrder
}
export type ErrorsDict=Record<string, ErrorVal>;

export class Form {
    controllers: ControllerItem[]=[];
    controllerChangeSubject: Subject<ControllerItem> = new Subject<ControllerItem>();
    valueChange: Subject<{ [key: string]: ControllerItem }> = new Subject<{ [key: string]: ControllerItem }>();
    controllerDict: { [key: string]: ControllerItem } = {};
    public value: FormVal = {};
    errorsDict:ErrorsDict={};
    public errorsChange: Subject<ErrorsDict>=new Subject<ErrorsDict>();
    public isPass:boolean= false;
    constructor(
        controllerOpts: ControllerOpt[]
    ) {
        if(!controllerOpts||!controllerOpts.length)return;
        controllerOpts.forEach(opt=>{
           this.addController(new ControllerItem(opt));
        });
        
        this.controllerChangeSubject.subscribe(controller => {
            this.valueChange.next(this.controllerDict);
        })
    }
    
    addController(controller:ControllerItem){
        controller.forkForm(this);
        this.controllers.push(controller);
        this.controllerDict[controller.id]=controller;
        controller.valueChange.subscribe(c=>{
            this.controllerChangeSubject.next(c);
            this.valueChange.next(this.controllerDict);
        });
        // handle value
        this.value[controller.id]=controller.value;
        Object.defineProperty(this.value,controller.id,{
            get(){
                return controller.value
            },
            set(v: ValueType){
                controller.value=v
            }
        });
        // handle error
        controller.errorsChange.subscribe(errors=>{
            this.errorsDict[controller.id]=errors;
            this.errorsChange.next(this.errorsDict);
            this.isPass=this.checkPass();
        })
    }
   
    checkPass():boolean{
        for(let i in this.errorsDict){
            if(this.errorsDict[i])return false;
        }
        return true;
    }
    
    
    reset() {
        this.controllers.forEach(c=>c.reset());
    }

    toSerializer(): Record<string, any> {
        return this.value;
    }

    /**
     * @return pass:boolean
     */
    async checkValidators():Promise<boolean>{
        let error:boolean=false;
        for(let controller of this.controllers){
            if(!await controller.checkValidator())error=true;
        }
        return !error;
    }

    /**
     * @return errMsg:string;
     */
    async catchValidatorsErr():Promise<string[]|void>{
        return this.checkValidators().then((pass) => {
            if (!pass) {
                for (const i in this.errorsDict) {
                    if(this.errorsDict[i]){
                        return this.errorsDict[i]
                    }
                }
            }
        });
    }
}