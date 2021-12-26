import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,throwError } from 'rxjs';
import { Category } from '../Models/category';
import { environment } from 'src/environments/environment';
import { Model } from '../Models/model';
import { MockExecutor } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

 constructor(private http: HttpClient) 
 {
   

  }
  //url='http://localhost:56568/api/controller';
  url=environment.apiUrl+'/api/Model';
  
  addModel(model:Model): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(model);

    return this.http.post<Category>(this.url, body,{headers:headers})
}

    returnAllModels():Observable<Model[]>
    {
       return this.http.get<Model[]>(this.url).pipe(catchError((err)=>
        {

          return throwError(err.message ||"Internal Server error contact site adminstarator");
        }));
    }
    returnRlatedModels(id:any):Observable<Model[]>
    {
       return this.http.get<Model[]>(this.url+'/GetModels/'+id).pipe(catchError((err)=>
        {

          return throwError(err.message ||"Internal Server error contact site adminstarator");
        }));
    }
    
    updateModels(id:any,model:Model): Observable<Model> {
      return this.http.put<Model>(this.url+'/'+id,model).pipe(
        catchError((err)=>{
          console.log("erro ocuured")
          return throwError(err.message ||"Internal Server error contact site adminstarator");


        })
      );
  }
  deleteModel(id: number):Observable<number>{
    return this.http.delete<number>(this.url+'/'+id)
    .pipe(
      catchError( (err) => {
        return throwError(err.message ||"Error deleting travellers data.");
     }));
}
getModelById(id:any):Observable<Model>
{
  return this.http.get<Model>(this.url+'/'+id).pipe(catchError((err)=>
  {

    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}
}
