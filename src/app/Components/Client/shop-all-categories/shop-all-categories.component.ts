import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { CustomCategories } from 'src/app/Models/custom-categories';
import { SubCategory } from 'src/app/Models/sub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';

@Component({
  selector: 'app-shop-all-categories',
  templateUrl: './shop-all-categories.component.html',
  styleUrls: ['./shop-all-categories.component.scss']
})
export class ShopAllCategoriesComponent implements OnInit {
isAll!:boolean
allCaregories!:CustomCategories[]
allSubCategories!:SubCategory[]
  constructor(private route:ActivatedRoute,private categoryService:CategoryService,private subcategoryservice:SubcategoryService) { }

  ngOnInit(): void {
    this.getAllCategory();
  }
  getAllCategory()
  {
    this.categoryService.getCustomCategory().subscribe((data)=>{
      this.allCaregories=data;
     // console.log(this.allCaregories)
      for(let cat of this.allCaregories)
      {
       
   this.subcategoryservice.returnRlatedSubCategory(cat.id).subscribe((data)=>{
    cat.SubCategories=data
console.log(cat.SubCategories)
  },(error)=>{
    alert(error);
  });

      }
     // this.clonedCategories=this.allCaregories.splice(0,13);
    },(error)=>{alert(error)})
  
  }
  getSubs(id:number)
{
  
//alert(id);

   this.subcategoryservice.returnRlatedSubCategory(id).subscribe((data)=>{
     this.allSubCategories=data
   //  return this.allSubCategories
 //   console.log( this.allSubCategories);

 localStorage.setItem("subs","true");
   },(error)=>{
     alert(error);
   });

}

}
