import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { CustomCategories } from 'src/app/Models/custom-categories';
import { ProducVM } from 'src/app/Models/produc-vm';
import { SubCategory } from 'src/app/Models/sub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
allCaregories!:Category[]
clonedCategories!:Category[]//this for categories that will be shown
clonedSubCategories!:SubCategory[]
allSubCategories!:SubCategory[]
numOfRows!:number
numOfSubsCategories!:number
fixed:boolean=true
subs:boolean=true
all!:boolean
fewCategories!:CustomCategories[]
newArrivals!:ProducVM[]
//@HostListener('window:scroll', ['$event']) 
  constructor( private productservice:ProductService,private categoryService:CategoryService,private subcategoryservice:SubcategoryService,private route:Router) { }
src:string
images:string[]=[]
rendomImage!:string
  ngOnInit(): void {
 /*  if(this.route.url.includes('/Getsubcategories')||this.route.url.includes('allcategories'||this.route.url.includes('relatedproducts')||this.route.url.includes('Payment')||this.route.url.includes('cart')))
  {
this.home=true
  }
else{
  this.home=false
} */
    this.getAllCategory();
  //  console.log(window.pageYOffset)
    window.onscroll=()=>{
      if(window.pageYOffset>300)
      {
        this.fixed=false
      }
      else
      {
        this.fixed=true
      }
    }
 // alert(this.getCurrentOffsetTop(10));
 //console.log(this.clonedCategories)
 this.getFewCategories()
 this.getNewArrivalsProduct()
  }

 
getAllCategory()
{
  this.categoryService.returnAllCategory().subscribe((data)=>{
    this.allCaregories=data;
    this.allCaregories.forEach((element)=>{
      this.images.push(element.image)
    })
    setInterval(()=>{
      this.rendomImage=this.images[Math.floor(Math.random() * this.images.length)]
      this.src=this.createImgPath(this.rendomImage) 
    },2000)
    
    
    this.clonedCategories=this.allCaregories.splice(0,14);
  },(error)=>{alert(error)})

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
getNumberOfRows(numOfSubsCategories:any)
{
  //alert(numOfSubsCategories)
  this.numOfRows=Math.floor(numOfSubsCategories/4);

}
getCurrentOffsetTop(element: ElementRef) {
  const rect = element.nativeElement.getBoundingClientRect();
  return rect.top + window.pageYOffset - document.documentElement.clientTop;
}
home:boolean=false;

getSubs(id:number)
{
 // this.home=true;


 this.route.routeReuseStrategy.shouldReuseRoute = () => false;

 this.route.onSameUrlNavigation = 'reload';
this.route.navigate(['/Getsubcategories',id]);

}
public createImgPath = (serverPath: string) => {
  return `${environment.apiUrl}/${serverPath}`;
}
viewAllCategories()
{
  this.subs=false;

this.route.navigate(['/allcategories']);
}
getNewArrivalsProduct()
{
  this.productservice.getNewArrivalsProducts(14).subscribe((data)=>{
 this.newArrivals=data
  },(error)=>{

    alert(error);
  })
}
}
