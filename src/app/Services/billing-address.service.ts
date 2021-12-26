import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBillingAddress } from '../Models/IBillingAddress';


@Injectable({
  providedIn: 'root'
})
export class BillingAddresstService {
  token:any=localStorage.getItem('token');
  headers_object :any;
  constructor(private _http:HttpClient)
   {this.headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token); }

  addNewBillingAddress(newbillingAddress:IBillingAddress){

    const httpOptions = {
      headers:this.headers_object
    };
    console.log(newbillingAddress);
    let url = `${environment.apiUrl}/api/BillingAddress`;
    return this._http.post<IBillingAddress>(url, newbillingAddress,httpOptions)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
          ));
  }
}

