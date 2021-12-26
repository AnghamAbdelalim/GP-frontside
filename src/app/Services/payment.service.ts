import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPayment } from '../Models/IPayment';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  token:any=localStorage.getItem('token');
  headers_object :any;
  paymentList:IPayment[]=[];
  constructor(private _http:HttpClient)
   { this.headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token); }

   addNewPayment(product:IPayment) 
  {
    this.paymentList.push(product)
  }
  /*addNewPayment(newPayment:IPayment):Observable<IPayment[]>
  {
    return this.paymentList.push(newPayment);
    /*const httpOptions = {
      headers:this.headers_object
             };
    console.log(newPayment)
    let url = `${environment.apiUrl}/api/Payment`;
    return this._http.post<IPayment>(url,newPayment,httpOptions)
          .pipe(catchError((err)=>{
             return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
  ));*/
  
}
