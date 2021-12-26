import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProducVM } from 'src/app/Models/produc-vm';
import { User } from 'src/app/Models/user';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wish-list.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchKey:any;
  searchedProducts:ProducVM[];
  errorMsg:string;
  foundProducts:boolean = false;
  numOfitem:number;
  constructor(private _route:ActivatedRoute,
    private _productService:ProductService,
    private _authenticationService:AuthenticationService,
    private _router:Router,private productservice:ProductService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(
      params=>{
        this.searchKey = params.get('searchkeyword');
        this.getSearchedProducts();
      }
    )
  }
  getSearchedProducts(){
    this._productService.getProductsBySearch(this.searchKey).subscribe(
      data=>{
        this.searchedProducts = data;
        this.numOfItems=this.searchedProducts.length;
        if(data.length != 0)
          this.foundProducts = true;
        else
          this.foundProducts = false;
      },
      error=>{
        this.errorMsg = error;
      }
    )
  }
  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
 
 
currentUser:User
userCart:ProducVM[]
numOfItems:number
checkIfItemAlreadyExists(id: number) {
  this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')
  this.userCart = this.currentUser.products
  let founded = false
  this.userCart.forEach((element, index) => {
    if (element.id == id) {
      founded = true
    }

  });
  return founded
}
addToCart(id:number)
{
  
 

  if (localStorage.getItem('current_user')) {
 if(!this.checkIfItemAlreadyExists(id)){
    this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')
    this.userCart = this.currentUser.products
    this.numOfItems = this.userCart.length
     
      this.productservice.getProductById(id).subscribe((data) => {
        console.log(data);
        this.userCart.push(data);
          console.log(this.userCart)

        localStorage.setItem('current_user', JSON.stringify(this.currentUser))
  
      //  this._router.navigate([currentUrl]);
       /*  this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this._router.navigate([currentUrl])} */
          //  window.location.reload();

        }, (error) => {
          alert(error);
        })
      
    }
    else {
      alert('this is already in your cart')
    } 
  this._router.navigate(['/cart']);
  }
  else
  {
    alert('')
  }
}
}


