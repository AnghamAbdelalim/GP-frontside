import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProducVM } from 'src/app/Models/produc-vm';
import { User } from 'src/app/Models/user';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wish-list.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  currentUser: any;
  itemCart: ProducVM[]
  //userCart: ProducVM[]
  productTOadd: any
  total:number = 0;
  Total:number=0;
  numOfItems: number=0
  qty:number=1;
  flag=false
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
deleted=false;
conunter:number=0;
totalprice: number=0
  constructor(private route: ActivatedRoute, private _wishlistService: WishlistService, private _authenticationService: AuthenticationService, private productService: ProductService, private _router: Router) 
  {
    this.getCart();
    this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')
    this.itemCart= this.currentUser.products
    for(let i=0;i<this.itemCart.length;i++)
    this.Total+= Math.floor(this.itemCart[i].price-(this.itemCart[i].price*( this.itemCart[i].discount/100)))
   
    
   }
 
  ngOnInit(): void {
    
    

}
 /* ngAfterViewInit(){
  //  window.location.reload();
  this.CalctotalPrice()

  }*/
 /* getCartItem()
  {
    this.itemCart=this.cartService.getAllItems();
    this.total = this.itemCart.reduce(function(acc, val)
    {
        return acc + (val.price * val.quantity);
    }, 0);
  }*/

  checkIfItemAlreadyExists(id: number) {
    let founded = false
    this.itemCart.forEach((element, index) => {
      if (element.id == id) {
        founded = true
      }

    });
    return founded
  }

  getCart()
   {

      if (localStorage.getItem('current_user'))
       {
      this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')
      this.itemCart= this.currentUser.products
   
      this.numOfItems = this.itemCart.length
      //this.total = this.userCart.reduce(function(acc, val)
     // {
        /*for(let i=0;i<this.itemCart.length;i++)
        {
          this.Total+=(this.itemCart[i].price *this.itemCart[i].quantity);
        } 
        return this.Total;*/
      }
      else {
     //  alert('not founded things')
      }
        this.flag=true
        return this.itemCart
    }
    
    calcPriceAfterDiscount(price:number,discount:number):number
    {
       return  Math.floor(price-(price*(discount/100)))
      //{{item.price-(item.price *(item.discount/100))}}  
    }
    

    calculateTotal()
    {
    
      this.Total= this.itemCart.reduce(function(acc, val)
      {
    
     let p=Math.floor(val.price-(val.price*(val.discount/100)))
          return acc + ( p * val.quantity);
      }, 0);
    }

  
  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
  deleteFormCart(id: number) {
    this.itemCart.forEach((element, index) => {
      if (element.id == id) {
        this.itemCart.splice(index, 1);
        this.currentUser.products=this.itemCart
        localStorage.setItem('current_user', JSON.stringify(this.currentUser))
         this.numOfItems=this.itemCart.length
         this.Total-=element.price;
        window.location.reload();
      
      }

    });
  }
  
  public incrementQuantity(prodId:number)
  {
     for(let i=0; i<this.itemCart.length;i++)
      {
       if(this.itemCart[i].id === prodId)
       { 
         if (this.qty>0)
             this.qty++;
            else
            this.qty=1;
         this.itemCart[i].quantity=this.qty;
         console.log(this.itemCart[i].quantity);
      // this.Total+=this.itemCart[i].quantity* this.itemCart[i].price ;
        //console.log(this.Total);
       }
    }
   this.calculateTotal();
   // this.getCart();
  }
  public decreaseQuantity(prodId:number)
  {
    for(let i=0; i<this.itemCart.length;i++)
    {
       if(this.itemCart[i].id=== prodId)
       {
         if (this.qty>0)
          this.qty--;
         else
          this.qty=1;
         this.itemCart[i].quantity=this.qty;
        
         console.log(this.itemCart[i].quantity);
        //this.Total-=this.itemCart[i].quantity* this.itemCart[i].price ;
        // console.log(this.Total);

       }
   }
 //  this.getCart();
   this.calculateTotal();
  /*totalprice: number=0
  CalctotalPrice()
   {
    this.userCart.forEach((element, index) => {
      this.totalprice += element.price;
return this.totalprice

    });
  }*/
 /* changeTotalPrice(qty: any, id: number) {
    alert(qty);
    this.userCart.forEach((element, index) => {
      if (element.id == id) {
        this.totalprice += element.price * qty - element.price;
      }

    });
  }*/
}

  addProductToWishlist(productId:number) {
    if(this._authenticationService.isLoggedIn())
    {
      this._wishlistService.addProductToWishlist(productId).subscribe(
        data => {
                this.conunter++;
                localStorage.setItem('wishListItem',JSON.stringify(this.conunter));
          alert("added to wishlist");
          this.deleteFormCart(productId);
        },
        error => {
          alert(error);
        }
      )
    }
    else {
     // alert("Login to add product to wishlist");
      this._router.navigate(['/Login']);
    }
  }
  Savecartdata(){
      this.calculateTotal();
    localStorage.setItem("TotalPrice",`${this.Total}`)
  }
 
}
