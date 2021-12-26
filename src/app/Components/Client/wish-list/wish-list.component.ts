import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProducVM } from 'src/app/Models/produc-vm';
import { User } from 'src/app/Models/user';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wish-list.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  products!:ProducVM[];
  userID:any;
  deletedProd:any
  item:any;
  constructor(private _wishlistService: WishlistService,
    private _authenticationService: AuthenticationService,private productservice:ProductService,private _router:Router,private route:ActivatedRoute
   ) { }

  ngOnInit(): void {
     this.item=localStorage.getItem('wishListItem');
    this._wishlistService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.products=data
        },
        error=>{

       });
  }
  deleteProductFromWishList(prodID: number) {
    this._wishlistService.deleteProductFromWishlist(prodID)
      .pipe(first())
      .subscribe(
        data => {
           this.deletedProd = this.products.find(pc => pc.id == prodID);
          this.products.splice(this.products.indexOf(this.deletedProd), 1);
        },
        error => {

        });
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
  
  if (localStorage.getItem('current_user')) 
  {
 if(!this.checkIfItemAlreadyExists(id)){
    this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')
    this.userCart = this.currentUser.products
    this.numOfItems = this.userCart.length
     
      this.productservice.getProductById(id).subscribe((data) => {
        console.log(data);
        this.userCart.push(data);
          console.log(this.userCart)

        localStorage.setItem('current_user', JSON.stringify(this.currentUser))

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
