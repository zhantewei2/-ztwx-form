import {Form} from "./validators";
import {ControllerOpt} from "./share";
import { ControllerItem} from "./Controller";

export class FormUpdateVersion extends Form{
    constructor(
         controllerOpts: ControllerOpt[]
    ) {
        super(controllerOpts);
    }
 
    clearChange(){
        this._isChanged=false;
        this.controllers.forEach(i=>i.resetChange());
    }
    /**
     * 设置待更新的原始数据
     * @param originalValue
     */
    setOriginValue(
        originalValue:Record<string, any>,
    ){
        this.clearChange();
        this.fillOriginVal(originalValue);
    }
    fillOriginVal(value:Record<string, any>){
        let controller:ControllerItem;
        
        Object.keys(this.value).forEach((key:string)=>{
            controller=this.controllerDict[key];
            controller&&controller.setOrigin(value[key])
        })
    }
    updateOriginValue(
        updateValue:Record<string, any>
    ){
       this.fillOriginVal(updateValue);
       if(!this.getUpdatedValue())this.clearChange();
    }

    reset(){
        super.reset();
        this.clearChange();
    }
    /**
     * 获取发生更改的值
     */
    getUpdatedValue():undefined|Record<string, any>{
        const updateValue:Record<string, any>={};
        
        this.controllers.forEach(controller=>{
            if(controller.checkOriginChange())updateValue[controller.id]=controller.value;
        })
        return Object.keys(updateValue).length?updateValue:undefined;
    }
    
    changeOrderExists:boolean=false;
    _isChanged:boolean=false;
    
    checkChanged(){
        for(let i of this.controllers){
            if(i.changed)return true;
        }
        return false;
    }
    get isChanged():boolean{
        if(!this.changeOrderExists){
            this.valueChange.subscribe(dict=>{
                for(let i in dict){
                    if(dict[i].changed){
                        this._isChanged=true;
                        return;
                    }
                }
                this._isChanged=false;
            })
            this.changeOrderExists=true;
            return this._isChanged=this.checkChanged();
        }
        return this._isChanged;
    }
}