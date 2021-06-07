@ztwx/form
===

Usage
---

```javascript
import {Form,maxValidator} from "@ztwx/form";

const form=new Form([
  {id:"name"},
  {id:"age",validator:[
      new maxValidator(10,"Can't be gt 10")
  ]}
])
console.log(form.value); // form value

form.age=10;

console.log(form.errorsDict);
````

API
===

### Form
##### constructor

*ControllerOpt[]*

|name|type|
|---|---|
|id|string|
|value?|Value|
|validator?|Validator[]|

##### Method
|Method|params|return|
|---|---|---|
|setOriginValue|Value|void|
|getUpdatedValue|void|Value|
|reset|void|void|
|checkValidators|void|`Promise<boolean>`|
|addController|`ControllerItem`|void|
##### Attribute

|Attrs|type|des|
|---|---|---|
|value|Value|x|
|isChanged|boolean|readonly|
|errorsDict|Record<Id,ErrorVal>|x|
|errorsChange|`Subject<ErrorsDict>`|x|
|isPass|boolean|x|
|controllers|ControllerItem[]|x|
|controllerDict|`Record<Id,ControllerItem>`|x|
|valueChange|`Subject<ControllerDict>`|x|


### ControllerItem
##### Method

|Method|params|return|
|---|---|---|
|reset|void|void|
|checkValidator|void|`Promise<boolean>`|
|setOrigin|Value|void|

##### Attribute

|Attrs|type|des|
|---|---|---|
|errors|string[]|undefined|x|
|value|Value|x|
|changed|boolean|x|
|errorsChange|`Subject<ErrorVal>`|x|

Validators
---
- emailValidator,
- maxLengthValidator,
- maxValidator,
- minLengthValidator,
- minValidator,
- rangeLengthValidator,
- rangeValidator,
- requiredValidator,
- regExpValidator,
- fnValidator 

fnValidator Instance:
```
new fnValidator(
    (val,formVal)=>{
        return val&&formVal.name;
    },
    "error message"
)
```

