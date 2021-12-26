import { AbstractControl } from "@angular/forms";

export function ConfirmPasswordValidator(control:AbstractControl)
{
  const PasswordHash= control.get('PasswordHash');
  const ConfirmPassword=control.get('ConfirmPassword');
   
  if(PasswordHash?.pristine || ConfirmPassword?.pristine)
  {
      return null;
  }
  return PasswordHash&& ConfirmPassword && PasswordHash.value!==ConfirmPassword.value 
  ? {'misMatch':true}
  :null;
}