import {catchError} from 'rxjs/operators';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrder } from '../Models/IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  token:any=localStorage.getItem('token');
headers_object :any;

  private _url =  `${environment.apiUrl}/api/order`
  constructor(private _http:HttpClient)
   {  
    this.headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
  }
  getOrdersByPage(pageSize:number, pageNumber:number):Observable<IOrder[]>{
    return this._http.get<IOrder[]>(`${this._url}/${pageSize}/${pageNumber}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }getOrdersByPageForSpecficUser(userID:string,pageSize:number, pageNumber:number):Observable<IOrder[]>{
    return this._http.get<IOrder[]>(`${this._url}/${userID}/${pageSize}/${pageNumber}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getOrderCountForSpecficUser(userID:string):Observable<number>{
    
    return this._http.get<number>(`${this._url}/countordersforspecifcuser/${userID}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }getOrderCount():Observable<number>{
    return this._http.get<number>(`${this._url}/count`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  makeOrder(order:IOrder)
  {
    const httpOptions = {
      headers:this.headers_object
    };
    let url = `${environment.apiUrl}/api/order`;
    return this._http.post<IOrder>(url, order,httpOptions)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  orderDetails():Observable<IOrder[]>{
    return this._http.get<IOrder[]>(`${this._url}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}
