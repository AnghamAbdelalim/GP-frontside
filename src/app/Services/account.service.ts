import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IuserRegister } from '../Models/IuserRegister';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _url =  `${environment.apiUrl}/api/Account`
  constructor(private _http:HttpClient) { }
  UserData(id:string):Observable<IuserRegister >{
    return this._http.get<IuserRegister >(`${this._url}/${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

}