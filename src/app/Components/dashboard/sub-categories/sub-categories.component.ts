import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Category } from 'src/app/Models/category';
import { SubCategory } from 'src/app/Models/sub-category';
import { CategoryService } from 'src/app/Services/category.service';
//import { ConfirmModalComponent } from 'src/app/reusedComponent/confirm-modal/confirm-modal.component';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

 
  hasCategories:boolean = false;
  private _categoryToUpdate!:SubCategory;
  allCategories!:Category[]; 
  allSubCategories!:SubCategory[]
  errorMsg!:string;
  loading = false;
  submitted = false;
  action!:string;
  categoriesCount!:number;
  pageSize:number = 8;
  currentPageNumber:number = 1;
  numberOfPages!:number; // categoriesCount / pageSize

  public response = {dbPath: ''};
 
  get formFields() { return this.subCategoryForm.controls; }
  constructor(private _SubcategoryService:SubcategoryService,
    private categoryService:CategoryService,
    private _formBuilder: FormBuilder,
    private _router:Router,) { }

  ngOnInit(): void {
  
   this.GetAllbCategories();
   this.getAllSubCatgories()
  //  this.getSelectedPage(1);
  }
  subCategoryForm = this._formBuilder.group({
    name:['', Validators.required],
    description:['',Validators.required],
    category:['',Validators.required]
  });
flag!:boolean

  addOrUpdate()
  {

  }
GetAllbCategories()
{
  this.categoryService.returnAllCategory().subscribe((data)=>{
    this.allCategories=data;
  },(error)=>{
    alert(error);
  })
}

  getAllSubCatgories()
  {
    this._SubcategoryService.returnAllCategory().subscribe((data)=>{
   //   this.allSubCategories=data;
   for(let  sub of data)
   {
     this.categoryService.getCategoryById(sub.catogeryId).subscribe((data)=>{
       console.log(data.name)
       sub.catogeryId=data.name
     },(error)=>{
       alert(error)
     })
   }
this.allSubCategories=data
    },(error)=>{alert(error)})
  }
add()
{

  let sub:SubCategory={
    id:0,
    name:this.formFields.name.value,
    description:this.formFields.description.value,
    catogeryId:this.formFields.category.value,
    image:this.response.dbPath
  }
  this._SubcategoryService.addCategory(sub).subscribe(()=>{
 //   alert("added");
    this.flag=false;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
   
    this._router.navigate([this._router.url]);
   

  },(error)=>{
alert(error);
  })
}

  show() {
    this.flag = true;
    this.action="add"
  
  }


  close() {
    this.flag = false;

  }
  delete(id:any)
  {
this._SubcategoryService.deleteCategory(id).subscribe(()=>{
  this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  this._router.onSameUrlNavigation = 'reload';
 
  this._router.navigate([this._router.url]);
},(error)=>{alert(error)})
  }
  subId!:number
  update(id:any)
  {
    this.action='update'
     
    this.flag=true;
    this._SubcategoryService.getCategoryById(id).subscribe((data)=>{
       this.subId=data.id

     this.subCategoryForm.setValue({
      name:data.name,
      description:data.description,
      category:data.catogeryId
    })
    },(error)=>{alert(error)})
  
  }
  updateSubcategory()
  {
let sub:SubCategory={
  id:this.subId,
  name:this.formFields.name.value,
  description:this.formFields.description.value,
 catogeryId:this.formFields.category.value,
 image:this.response.dbPath

}
  }
  onAddOrUpdate()
  {
    if(this.action=='add')
    this.add();
    else if(this.action=='update')
    {
      this.updateSubcategory()
    }
  }
  public uploadFinished = (event:any) => { 
    this.response = event;
  }
  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
}
