import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  errorMsg: any;
  caty!:Category;

  constructor(private fb:FormBuilder,private categoryService:CategoryService, private route: ActivatedRoute ,private router: Router) {
   
   }

  updateCategoryForm=this.fb.group({
    name:['',[Validators.required]],
    discount:['',[Validators.required]]
  })
  get name()
  {

    return this.updateCategoryForm.get('name')
  }
  get id()
  {
    return this.updateCategoryForm.get('id')
  }
  get discount()
  {
    return this.updateCategoryForm.get('discount')
  }

catId!:number;
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
 this.catId= this.route.snapshot.params['id'];;
     this.categoryService.getCategoryById(this.catId).subscribe(
      (res)=>
      {
        this.caty=res;
     //   alert(this.caty.Name);
     console.log(res);
        this.updateCategoryForm.controls['name'].setValue(this.caty.name);
      },
    
      (errorResponse)=>
      {
       this.errorMsg=errorResponse;
    //   alert("aaaaaaaaaaa");
   //    alert(this.catId)
       
      }
    );

  });
  }
 
  UpdateCategory() {
    
       this.caty=Object.assign(this.caty, this.updateCategoryForm.value);
       //console.log(this.caty);
       this.caty.image=this.response.dbPath
    this.categoryService.updateCategory(this.route.snapshot.params.id,this.caty).subscribe(
      (res)=>
      {
      //  this.router.navigate(['/  this.r']);
        this.router.navigate(['/categories']);
    
      },
    
      (errorResponse)=>
      {
       this.errorMsg=errorResponse;
       alert("falied")
      }
    );
}
public response = {dbPath: ''};
public uploadFinished = (event:any) => { 
  this.response = event;
}

}
