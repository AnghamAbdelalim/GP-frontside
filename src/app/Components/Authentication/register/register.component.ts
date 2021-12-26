import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ConfirmPasswordValidator } from 'src/app/Models/ConfirmPassword.validator';
import { IuserRegister } from 'src/app/Models/IuserRegister';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit 
{
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  usernamePattern="/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/";
  successMessage: string;
  errorMessage: string;
 showSuccess: boolean;
 showError: boolean;
 Iuser:object;
  public registerForm: FormGroup;
  constructor(private _authService: AuthenticationService,private _router:Router) { 
  }
  suser:User
  userList!:any
  ngOnInit(): void 
  {
    this.registerForm = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      Email: new FormControl('', [Validators.required,Validators.pattern(this.emailPattern)]),// Validators.email,Validators.pattern(this.emailPattern)
      PasswordHash: new FormControl('', [Validators.required]),
      ConfirmPassword: new FormControl('',[Validators.required])
    },{validators:[ConfirmPasswordValidator]});
  }
  public validateControl = (controlName: string) =>
   {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
   }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }
  public registerUser = (registerFormValue:any) => {
    this.showError = this.showSuccess = false;
    const formValues = { ...registerFormValue };
    const user: IuserRegister = {
       userName: formValues.userName,
      Email: formValues.Email,
      PasswordHash: formValues.PasswordHash,
      ConfirmPassword: formValues.ConfirmPassword
    };
   
    this._authService.RegisterUser(user)
    .subscribe(res =>
       {
        this.showSuccess=true;
        this.successMessage ='Successful registration'
         console.log("Successful registration");
         //localStorage.setItem('user', JSON.stringify(res));
         //creating object contains his email and array of products
        this.suser={
          email:user.Email,
          products:[]
        }
////////pushing the new user into list
        this.userList=JSON.parse(localStorage.getItem('users')||'[]')
        this.userList.push(this.suser)
        localStorage.setItem('users',JSON.stringify(this.userList))
         if(this.showSuccess==true)
         {
          var userId= this._authService.getUserId()
          localStorage.setItem('userId',JSON.stringify(userId))
            this._router.navigate(['/Login']);
         }
       },
     error => 
     {
      this.showError = true;
      this.errorMessage = 'user name or password is not valid';
     })
    }
    
}
