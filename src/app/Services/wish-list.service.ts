import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Category } from '../Models/category';
import { environment } from '../../environments/environment';
import { Product } from '../Models/product'
import { ProducVM } from '../Models/produc-vm';
import {HttpHeaders} from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  token:any=localStorage.getItem('token');
  headers_object :any;
 constructor(private _http: HttpClient) 
 {
     this.headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);

  }
   getAll():Observable<ProducVM[]>
    {
       const httpOptions = {
          headers:this.headers_object
        };
    let url = `${environment.apiUrl}/api/wishlist`;
    return this._http.get<ProducVM[]>(url ,httpOptions).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

  addProductToWishlist(productID: number) 
  {
     const httpOptions = {
          headers:this.headers_object
        };
    let url = `${environment.apiUrl}/api/wishlist/${productID}`;
    return this._http.post<ProducVM>(url, {productID},httpOptions)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }));
  }

  deleteProductFromWishlist(prodID:number)
  {
    const httpOptions = {
      headers:this.headers_object
    };
    let url = `${environment.apiUrl}/api/wishlist/${prodID}`;
    return this._http.delete<any>(url,httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}
