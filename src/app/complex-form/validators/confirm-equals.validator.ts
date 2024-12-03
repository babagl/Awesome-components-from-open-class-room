import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function confirmEqualsValidator(main:string, confirm: string):ValidatorFn {
  return (ctrl: AbstractControl):null | ValidationErrors =>{
    if (!ctrl.get(main)  || !ctrl.get(confirm)){
      return {
        confirmEquals: 'Invalid control name',
      }
    }

    const  mainValue = ctrl.get(main)?.value;
    const confirmValue = ctrl.get(confirm)?.value;

    return  mainValue === confirmValue ? null : {
      confirmEquals: {
        main: mainValue,
        confirm: confirmValue,
      }
    }
  }
}
