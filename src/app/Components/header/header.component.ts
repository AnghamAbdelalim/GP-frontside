import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { combineAll } from 'rxjs/operators';
import { IuserRegister } from 'src/app/Models/IuserRegister';
import { User } from 'src/app/Models/user';
import { AuthenticationService } from 'src/app/Services/authentication.service';
//import { LoginComponent } from '../Authentication/login/login.component';
//import { RegisterComponent } from '../Authentication/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn :boolean=false;
   name:any;
   role:any;
   openSearch:boolean = true;
   numOfItems:number;
  constructor(private _authService:AuthenticationService,private _router: Router)
   { 
      if(localStorage.getItem('current_user')){
     let current_user:User=JSON.parse(localStorage.getItem('current_user')||'{}')
    this.numOfItems=current_user.products.length
    }
    else
    {
      this.numOfItems=0
    }
   
   }
  ngOnInit(): void 
  {
     if(localStorage.getItem('token')==null)
     this._router.navigate(['/home']);
    /*if(localStorage.getItem('current_user')){
     let current_user:User=JSON.parse(localStorage.getItem('current_user')||'{}')
    this.numOfItems=current_user.products.length
    }
    else
    {
      this.numOfItems=0
    }*/
   this.name=this._authService.getUsername();
  }
  public logout = () => {
    this._authService.logout();
  }
  isUserLoggedIn() 
  {
   return this._authService.isLoggedIn();
  }
  
  openSearchBar(){
    this.openSearch = true;
  }
  closeSearchBar(){
    this.openSearch = false;
  }
  
 
  goToSearchPage(searchKey:any){
    this._router.navigate([`/search-results/${searchKey}`])
  }
}
