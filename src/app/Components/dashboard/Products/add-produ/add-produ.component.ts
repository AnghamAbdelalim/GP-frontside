import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Brand } from 'src/app/Models/brand';
import { Category } from 'src/app/Models/category';
import { Model } from 'src/app/Models/model';
import { ProducVM } from 'src/app/Models/produc-vm';
import { Product } from 'src/app/Models/product';
import { SubCategory } from 'src/app/Models/sub-category';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ModelService } from 'src/app/Services/model.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-produ',
  templateUrl: './add-produ.component.html',
  styleUrls: ['./add-produ.component.scss']
})
export class AddProduComponent implements OnInit {

 

allProducts!:ProducVM[];
allCategories!:Category[];
errorMsg!:string;
allModel!:Model[]
prouctId!:number

productform=this.fb.group({
  name:['', [Validators.required,Validators.minLength(5)]],
  price:['', [Validators.required,Validators.min(1)]],
  description:['',[Validators.required,Validators.minLength(10)]],
  discount:['', [Validators.required,Validators.min(5)]],
  quantity:['', Validators.required],
  category:['',Validators.required],
  subcategory:['',Validators.required],
  model:['',Validators.required],
  brand:['',Validators.required]
 
})
public response = {dbPath: ''};
get formfields(){return this.productform.controls}
  ngOnInit(): void {
    this.returnAllProducts();
  }
  returnAllProducts()
  {
    this.productservice.getAllProducts().subscribe((data)=>{
      this.allProducts=data;
      console.log(this.allProducts);
    }
    ,(error)=>{
      alert(error)
    })

  }
  delete(id:any)
  {
    this.productservice.deleteProduct(id).subscribe(()=>{
      alert('deleted');
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
     
      this._router.navigate([this._router.url]);
    },(error)=>{
      alert(error);
      
    })
  }
  update(id:any)
  {
this.action='update';
this.flag=true;
this.productservice.getProductById(id).subscribe((data)=>{
  this.prouctId=data.id;
  this.productform.setValue({
    name:data.name,
    discount:data.discount,
     price:data.price,
     description:data.description,
     quantity:data.quantity,
     Model:data.modelName,
     subcategory:data.subCatgoryName
  })
},()=>{})

  }
  returnallcategory()
  {
   
    this.categoryService.returnAllCategory()
    .pipe(first())
    .subscribe(
        data => {
          console.log("Succeeded");
          this.allCategories=data;
          //  this._router.navigate([this._router.url]);
        },
        error => {
            this.errorMsg = error;
          //  this.loading = false;
        });
  
}
  returnAllBrands()
  {

    this.brandService.returnAllBrans()
    .pipe(first())
    .subscribe(
        data => {
          console.log("Succeeded");
          this.allbrands=data;
          //  this._router.navigate([this._router.url]);
        },
        error => {
            this.errorMsg = error;
          //  this.loading = false;
        });
  
}
  constructor(private _router:Router, private fb:FormBuilder,private productservice:ProductService,private categoryService:CategoryService,private subcategoryservice:SubcategoryService,private modelservice:ModelService,private brandService:BrandService) {}
  onCategorySelected(id:any)
  {
      this.subcategoryservice.returnRlatedSubCategory(id).subscribe((data)=>{
      this.allsubcategories=data;
      },(error)=>{
        alert(error);
      })
  }
  onBrandSelected(id:any){
  //  alert(id);
    this.modelservice.returnRlatedModels(id).subscribe((data)=>{
      this.allModel=data;
    },(error)=>{alert(error)})
  }
 add()
{
  let newProduct:Product = {
    Id:0 , 
    Name: this.formfields.name.value,
    price: this.formfields.price.value,
    description: this.formfields.description.value,
    discount: this.formfields.discount.value,
    image : this.response.dbPath,
    quantity: this.formfields.quantity.value,
    Sub_Catogery_Id:this.formfields.subcategory.value,
    Model_Id:this.formfields.model.value
  };
  this.productservice.addNewProduct(newProduct)
      .pipe(first())
      .subscribe(
          data => {
            alert("Succeeded");
            this.flag=false;
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
     
      this._router.navigate([this._router.url]);
            //  this._router.navigate([this._router.url]);
          },
          error => {
              this.errorMsg = error;
            //  this.loading = false;
          });
}
public uploadFinished = (event:any) => { 
  this.response = event;
}
public createImgPath = (serverPath: string) => {
  return `${environment.apiUrl}/${serverPath}`;
}
action!:string
  flag!: boolean
  allsubcategories!:SubCategory[]
  allbrands!:Brand[]

show() {
  this.flag = true;
  this.action="Add"
  this.returnallcategory();
  this.returnAllBrands();
}
close() {
  this.flag = false;

}
}
