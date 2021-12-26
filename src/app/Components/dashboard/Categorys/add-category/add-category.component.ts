import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category';

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
  public response = {dbPath: ''};
  
  massage: any;
  id: number=0;
  addCategoryForm!:FormGroup;
  ngOnInit(): void {
    this.addCategoryForm=this.fb.group({
      name:['',[Validators.required]],
      description :['',[Validators.required]],
      discount:['',Validators.required]
    })
//this.getCategory();
 
  }
  Move()
  {
    this.router.navigate(['/categories']);
  }
  get name()
  {
    return this.addCategoryForm.get('name')
  }
  get description(){

    return this.addCategoryForm.get('description')
  }
  get discount()
  {
    return this.addCategoryForm.get('discount')
  }
  /*getCategory(){
    this.categoryService.returnAllCategory().subscribe((Data)=>{
      this.categoryList=Data;
    },(err)=>{
    this.errorMsg=err;
    })
  }*/
Reset() {  
  this.addCategoryForm.reset();  
 } 
addCategory(category: Category) {  
  //debugger;  
  category.id= this.id;  
  console.log(this.response.dbPath)
  category.image=this.response.dbPath
  this.categoryService.addCategory(category).subscribe(  
   () => {  
    this.dataSaved = true;  
    this.massage = 'Record saved Successfully';  
    this.Reset();  
    this.id = 0; 
    this.router.navigate(['/categories']);     
   },
   (error)=>{
console.log(error)
   }
  )
   //this.router.navigate(['/Category/Index']);
 } 
 public uploadFinished = (event:any) => { 
  this.response = event;
  
}

}
