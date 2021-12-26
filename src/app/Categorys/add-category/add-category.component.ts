import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/Shared_Interfaces/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

 
  constructor(private fb:FormBuilder,private categoryService:CategoryService,private router :Router) { }
  categoryList:Category []=[];
  errorMsg: any;
  dataSaved=false;
  
  massage: any;
  id: number=0;
  addCategoryForm:any
  ngOnInit(): void {
    this.addCategoryForm=this.fb.group({
      name:['',[Validators.required]],
      description :['',[Validators.required]],
    })
   this.getCategory();
 
  }
  get name()
  {
    return this.addCategoryForm.get('name')
  }
  get description(){

    return this.addCategoryForm.get('description')
  }
  getCategory(){
    this.categoryService.returnAllCategory().subscribe((Data)=>{
      this.categoryList=Data;
    },(err)=>{
    this.errorMsg=err;
    })
  }
Reset() {  
  this.addCategoryForm.reset();  
 } 
addCategory(category: Category) {  
  debugger;  
  category.id= this.id;  
  this.categoryService.addCategory(category).subscribe(  
   () => {  
    this.dataSaved = true;  
    this.massage = 'Record saved Successfully';  
    this.Reset();  
    this.id = 0; 
    this.getCategory();      
   });  
   this.router.navigate(['/Category/Index']);
 } 


}
