import {ControllerOpt, ErrorVal, Validator, ValueType} from "./share";
import {Subject, SubjectOrder} from "./Subject";
import {Form} from "./validators";
import {filterUpdate} from "./filterUpdate";

export interface Controller {
  id: string;
  validator?: Validator[];
  value?: ValueType;
  errors?: string[];
  valueChange?: Subject<this>;
  reset?: () => void;
  _value?: ValueType;
  _changed?:boolean;
  changed?:boolean;  //值是否改变
  errorsChange?:Subject<string[]|undefined>;
  // valueChangeSubjectOrder?:SubjectOrder<any>;
  // changeObservable?:()=>Subject<Controller>;
  // _changeObservable?:Subject<Controller>;
}

export class ControllerItem implements Controller{
  id:string;
  _value:ValueType;
  validators?: Validator[];
  errors: string[]  = [];
  errorsTmp: string[] = [];
  valueChange : Subject<this>= new Subject<this>();
  errorsChange: Subject<ErrorVal> = new Subject<ErrorVal>();
  form: Form;
  originVal: ValueType;
  changed?:boolean; 
  _changed?:boolean;
  constructor(opt:ControllerOpt) {
    this.id=opt.id;
    this.setOrigin(opt.value);
    this.validators=!opt.validator?undefined: opt.validator instanceof Array? opt.validator: [opt.validator];
  }
  forkForm(form:Form){
    this.form=form;
  }
  setOrigin(v:ValueType){
    this._value=this.originVal=v;
  }
  get value(){
    return this._value;
  }
  
  set value(v: ValueType){
    this._value=v;
    this.checkOriginChange(); // check origin change before valueChange.
    this.valueChange.next(this);
    this.checkValidator();
  }

  /**
   * @return pass
   */
  async checkValidator():Promise<boolean>{
    this.errorsTmp=[];
    if(!this.validators)return true;
    let pass:boolean;
    for(let validator of this.validators){
      const valPass=validator.apply(this._value,this.form&&this.form.value);
      pass=valPass instanceof Promise?await valPass : valPass;
      if(pass)continue;
      this.errorsTmp.push(typeof validator.errMessage === "string"?
        validator.errMessage:
        validator.errMessage(this._value)
      );
    }
    this.errors=this.errorsTmp;
    const result=this.errors.length?this.errors:undefined
    this.errorsChange.next(result);
    return !result;
  }
  
  reset(){
    this.errors=[];
    this._value=this.originVal;
    this.resetChange();
    this.valueChange.next(this);
    this.errorsChange.next(this.errors);
  }
  resetChange(){
    this._changed=this.changed=false;
  }

  /**
   * changed : true
   */
  checkOriginChange():boolean{
    const [originVal,currentVal]=filterUpdate(this.originVal,this._value);
    return this._changed=this.changed=originVal!==currentVal;
  }
  
}