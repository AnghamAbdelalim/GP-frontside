import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';

import {HttpClientModule} from '@angular/common/http' 
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private fb: FormBuilder,private categoryService:CategoryService) { }
  categoryList!:Category [];
  errorMsg: any;
  dataSaved=false;
  massage!: string;
  id: number=0;
  addCategoryForm:any;

  ngOnInit(): void {
    
    this.addCategoryForm=this.fb.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]]
    })
   this.getCategory();
 
  }
  getCategory(){
    this.categoryService.returnAllCategory().subscribe(
    (Data)=>{
      this.categoryList=Data;
      console.log(Data);
     },
    (err)=>{
    this.errorMsg=err;
    })
  }

  deleteCategory(id:any){
    if (confirm("Are You Sure To Delete this Informations")) {  
  this.categoryService.deleteCategory(id)
  .subscribe(() => {
    console.log('Deleted'); 
     this.getCategory();
  }, (err) => {
    console.log(err);
  });

}  }

Reset() {  
  this.addCategoryForm.reset();  
 } 
 public createImgPath = (serverPath: string) => {
  return `${environment.apiUrl}/${serverPath}`;

}

}
