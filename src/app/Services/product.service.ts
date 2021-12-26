import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProducVM } from '../Models/produc-vm';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../Models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
 constructor(private _http: HttpClient) 
 {
    

  }
  getAllProducts(): Observable<ProducVM[]> {
   let url = `${environment.apiUrl}/api/Product`;
    return this._http.get<ProducVM[]>(url).pipe(catchError((err) =>
     {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }
    ));
  }
  getNewArrivalsProducts(numberOfProducts:number): Observable<ProducVM[]> {
    let url = `${environment.apiUrl}/api/product/newArrivals/${numberOfProducts}`;
    return this._http.get<ProducVM[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getRelatedProducts(id: number): Observable<ProducVM[]> {
    let url = `${environment.apiUrl}/api/Product/GetAllWith/${id}`;
    return this._http.get<ProducVM[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getProductById(id: number): Observable<ProducVM> {
    let url = `${environment.apiUrl}/api/product/${id}`;
    return this._http.get<ProducVM>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  addNewProduct(newProduct: Product): Observable<Product> {
    console.log(newProduct);
    let url = `${environment.apiUrl}/api/product`;
    return this._http.post<Product>(url, newProduct)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
  }
  updateProduct(id: number, productToUpdate: Product): Observable<Product> {
    let url = `${environment.apiUrl}/api/product/${id}`;
    return this._http.put<Product>(url, productToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
  }
  deleteProduct(id: number): Observable<any> {
    let url = `${environment.apiUrl}/api/product/${id}`;
    return this._http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getProductsCount(categoryId:number = 0, colorId = 0): Observable<number> {
    let url = `${environment.apiUrl}/api/product/count`;
    if(categoryId != 0){
      url = `${environment.apiUrl}/api/product/count?categoryId=${categoryId}`;
    }
    if(colorId != 0){
      url = `${environment.apiUrl}/api/product/count?colorId=${colorId}`;
    }
    return this._http.get<number>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  /*
  getProductsByPage(pageSize: number, pageNumber: number): Observable<ProductVM[]> {
    let url = `${environment.apiUrl}/api/product/${pageSize}/${pageNumber}`;
    return this._http.get<Product[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }*/
  getProductsByCategoryPaging(categoryId:number, pageSize: number, pageNumber: number): Observable<ProducVM[]> {
    let url = `${environment.apiUrl}/api/product/category/${categoryId}/${pageSize}/${pageNumber}`;
    return this._http.get<ProducVM[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getProductsByColorPaging(colorId:number, pageSize: number, pageNumber: number): Observable<ProducVM[]> {
    let url = `${environment.apiUrl}/api/product/color/${colorId}/${pageSize}/${pageNumber}`;
    return this._http.get<ProducVM[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getProductsBySearch(searchKeyWord:string): Observable<ProducVM[]> {
    let url = `${environment.apiUrl}/api/product/search/${searchKeyWord}`;
    return this._http.get<ProducVM[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getRandomRelatedProducts(categoryId:number, numberOfProducts:number): Observable<ProducVM[]> {
    let url = `${environment.apiUrl}/api/product/relatedProducts/${categoryId}/${numberOfProducts}`;
    return this._http.get<ProducVM[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

}
