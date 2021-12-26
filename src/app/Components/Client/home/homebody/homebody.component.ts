import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { CustomCategories } from 'src/app/Models/custom-categories';
import { ProducVM } from 'src/app/Models/produc-vm';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homebody',
  templateUrl: './homebody.component.html',
  styleUrls: ['./homebody.component.scss']
})
export class HomebodyComponent implements OnInit {

  constructor(private productservice:ProductService, private categoryService:CategoryService,private subcategoryservice:SubcategoryService,private route:Router) { }
  allCaregories!:Category[]
  images!:string[]
  rendomImage!:string
  newArrivals!:ProducVM[]
  src!:string
  fewCategories!:CustomCategories[]

clonedCategories!:Category[]//this for categories that will be shown

numOfRows!:number
numOfSubsCategories!:number
fixed:boolean=true
subs:boolean=true
all!:boolean

  ngOnInit(): void {
    this.getAllCategory()
  }
  
  getFewCategories()
{
  this.categoryService.getCustomCategory().subscribe((data)=>{
   
  
    
    
    this.fewCategories=data.splice(1,2);
    this.fewCategories.forEach((ele)=>{
      this.subcategoryservice.returnRlatedSubCategory(ele.id).subscribe((data)=>{
        ele.SubCategories=data.splice(0,4);
      },(error)=>{
        alert(error)
      })
    })



 /*    console.log(this.fewCategories)
    this.fewCategories.forEach((element)=>{
      console.log(element.SubCategories)
      element.SubCategories=element.SubCategories.splice(5,8)
    }) */
  },(error)=>{alert(error)})

}
getNewArrivalsProduct()
{
  this.productservice.getNewArrivalsProducts(14).subscribe((data)=>{
 this.newArrivals=data
  },(error)=>{

    alert(error);
  })
}
getSubs(id:number)
{
 // this.home=true;


 this.route.routeReuseStrategy.shouldReuseRoute = () => false;

 this.route.onSameUrlNavigation = 'reload';
this.route.navigate(['/Getsubcategories',id]);

}
  getAllCategory()
  {
    this.categoryService.returnAllCategory().subscribe((data)=>{
      console.log(data);
      this.clonedCategories=data;
     /*  this.allCaregories.forEach((element)=>{
        this.images.push(element.image)
      }) */
      setInterval(()=>{
      //  this.rendomImage=this.images[Math.floor(Math.random() * this.images.length)]
        this.src=this.createImgPath(this.rendomImage) 
      },2000)
      
      
  
    },(error)=>{alert(error)})
  
  }
  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
  viewAllCategories()
{
//  this.home=true;
 // this.subs=false;
//alert(this.subs)
this.route.navigate(['/allcategories']);
}
}
