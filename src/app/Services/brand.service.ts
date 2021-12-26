import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,throwError } from 'rxjs';
import { Category } from '../Models/category';
import { environment } from 'src/environments/environment';
import { Brand } from '../Models/brand';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

 
  
 constructor(private http: HttpClient) 
 {
    
  }
  //url='http://localhost:56568/api/controller';
  url=environment.apiUrl+'/api/Brand';
  
  addNrand(brand:Brand): Observable<any> {
    let url = `${environment.apiUrl}/api/Brand`;
    console.log(brand);
      //url='http://localhost:56568/api/controller';
    return this.http.post<Brand>(url,brand)
      .pipe(catchError((err) => {
        console.log(err);
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
}

    returnAllBrans():Observable<Brand[]>
    {
       return this.http.get<Brand[]>(this.url).pipe(catchError((err)=>
        {

          return throwError(err.message ||"Internal Server error contact site adminstarator");
        }));
    }
    updatebrand(id:any,brand:Brand): Observable<Brand> {
      return this.http.put<Brand>(this.url+'/'+id,brand).pipe(
        catchError((err)=>{
          console.log("erro ocuured")
          return throwError(err.message ||"Internal Server error contact site adminstarator");


        })
      );
  }
  deleteBrand(id: number):Observable<number>{
    return this.http.delete<number>(this.url+'/'+id)
    .pipe(
      catchError( (err) => {
        return throwError(err.message ||"Error deleting travellers data.");
     }));
}
getBrandById(id:any):Observable<Brand>
{
  return this.http.get<Brand>(this.url+'/'+id).pipe(catchError((err)=>
  {

    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}
}
