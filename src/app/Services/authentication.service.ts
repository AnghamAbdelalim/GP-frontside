import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import {  IuserRegister } from '../Models/IuserRegister';
import { IuserLogin } from '../Models/IuserLogin';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
  token:any;  
  header:any;  
  userID:string;
  userName:string;
  Role:string;
  UserList:any;
    private _authChangeSub = new Subject<boolean>()
    public authChanged = this._authChangeSub.asObservable();
  constructor(private http : HttpClient,private router: Router)
   {
     
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
    
    }
    getRole():string {
      if(localStorage.getItem('token')){
          let token = localStorage.getItem('token');

          let jwtData = token!.split('.')[1]

          let decodedJwtJsonData = window.atob(jwtData)

          let decodedJwtData = JSON.parse(decodedJwtJsonData)
          return decodedJwtData.role;
      }
      return "No Role";
    }

    loginUser(login : IuserLogin)
    { 
   
        return this.http.post(`${environment.apiUrl}/Login`,login).pipe(map(res => {
         this.setSession(res);
      }));
    } 
     RegisterUser(register:IuserRegister)  
     { 
      
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<IuserRegister[]>(`${environment.apiUrl}/Register`,register ,httpOptions)
     } 
     
     private setSession(Result:any) {
  
      const expires = Result.expiration;
      localStorage.setItem('token', Result.token);
      localStorage.setItem("expires_at", JSON.stringify(expires));
  } 

  
 public isLoggedIn() 
 {
      if(localStorage.getItem('token')) 
      {
          this.token = localStorage.getItem('token');
          let jwtData =this.token.split('.')[1]

          let decodedJwtJsonData = window.atob(jwtData)

          let decodedJwtData = JSON.parse(decodedJwtJsonData)

          let expirationDateInMills = decodedJwtData.exp * 1000;

          let todayDateInMills = new Date().getTime();

          if (expirationDateInMills >= todayDateInMills)
              return true;
          
      }
      return false;
  }
  getUserId(){
        if(localStorage.getItem('token')){
           this.token = localStorage.getItem('token');

            let jwtData =this.token.split('.')[1]

            let decodedJwtJsonData = window.atob(jwtData)

            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            console.log(decodedJwtData);
            this.userID =decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
            return this.userID;
        }
        return '';
    }
    
  getUsername(){
        if(localStorage.getItem('token')){
           this.token = localStorage.getItem('token');
            let jwtData =this.token.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            this.userName =decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            console.log(this.userName);
            return this.userName;
        }
        return null;
    }
    


    userList:User[];
    currentUser:User

    public logout = () => {
      this.saveUserCartFirst();
      localStorage.removeItem('current_user');
       localStorage.removeItem("token");
      
       localStorage.removeItem("expires_at");
       // this.router.navigate(['/Login']);
   }
saveUserCartFirst()
{

     this.userList=JSON.parse(localStorage.getItem('users')||'[]');
     console.log('the user are '+this.userList)
    // console.log(login.email)
 //  alert(this.userList.length)
    this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')
     for(var i=0;i<this.userList.length;i++)
     {
       if(this.userList[i].email==this.currentUser.email)
       {
   //      alert('founded');
           this.userList[i].products=this.currentUser.products
           console.log(this.userList[i])
           localStorage.setItem('users',JSON.stringify(this.userList))
         break;
       }
     }
}

}


