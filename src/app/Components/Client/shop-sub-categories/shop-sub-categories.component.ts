import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/Models/sub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop-sub-categories',
  templateUrl: './shop-sub-categories.component.html',
  styleUrls: ['./shop-sub-categories.component.scss']
})
export class ShopSubCategoriesComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private categoryService:CategoryService,private subcategoryservice:SubcategoryService) { }
id!:any
clonedSubCategories!:SubCategory[]
allSubCategories!:SubCategory[]
numOfRows!:number
numOfSubsCategories!:number
fixed:boolean=true
  ngOnInit(): void {
 
   // this.id = Number( this.route.snapshot.paramMap.get('id'));
   this.route.paramMap.subscribe(params => {
    this.id = params.get('id');
    // Do more processing here if needed
  });

  //alert(this.id);
    this.getSubs(this.id)
  }
  getNumberOfRows(numOfSubsCategories:any)
{
  //alert(numOfSubsCategories)
  this.numOfRows=Math.floor(numOfSubsCategories/4);

}
categoryImage!:string
  getSubs(id:number)
  {
  
 this.categoryService.getCategoryById(id).subscribe((data)=>{
this.categoryImage=this.returnCateoryImage(data.image)
//alert(this.categoryImage)
 },(error)=>{
   alert(error);
 });
 
 
     this.subcategoryservice.returnRlatedSubCategory(id).subscribe((data)=>{
       this.allSubCategories=data

  //    alert(data.length);
     //  this.getNumberOfRows(this.allSubCategories.length);
  // this.clonedSubCategories=this.allSubCategories.splice(0,this.numOfRows*4)
   console.log(data)

     },(error)=>{
       alert(error);
     });
     /*  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = 'reload';
    
     this.router.navigate([this.router.url]);  */
  }
  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
  public returnCateoryImage = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
 
  goTORelatedProducts(id:number)
  {
    this.router.navigate(['/relatedproducts/'+id,this.id]);
  }
}
