/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/
import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/Models/IOrder';
import { AccountService } from 'src/app/Services/account.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  allOrders:IOrder[]; 
  orderDetailsList:IOrder[]; 
  hasOrders:boolean = false;
  constructor(private _orderAppSeriv:OrderService, private _accountService:AccountService) { }
  pageSize:number=3;
  currentPageNumber:number=1
  errorMsg:string;
  OrdersCount:number;
  numberOfPages:number;
  ngOnInit(): void {

    this._orderAppSeriv.getOrderCount().subscribe(
      data => {
        console.log("Data",data)
        this.OrdersCount = data
        this.numberOfPages = Math.ceil(this.OrdersCount / this.pageSize)
      },
      error=>
      {
       this.errorMsg = error;
       alert(this.errorMsg)
      })
      this.getSelectedPage(1);
      this.orderDetails();
  }
  counter(i: number) {
    return new Array(i);
  }
  getSelectedPage(currentPageNumber:number){
    this._orderAppSeriv.getOrdersByPage(this.pageSize,currentPageNumber).subscribe(
      data => {
        this.allOrders = data
        for( let order of  this.allOrders){
          this._accountService.UserData(order.applicationUserIdentity_Id).subscribe(datas=>{
          //  order.appUser=datas.userName  
          })
        }

        this.currentPageNumber = currentPageNumber;
        if(data.length != 0)
          this.hasOrders = true;
        else
          this.hasOrders = false;
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
  }
  orderDetails(){
    this._orderAppSeriv.orderDetails().subscribe(
      data => {
        console.log("Oryder",data)
        this.orderDetailsList = data;
      },
      error=>
      {
        this.errorMsg = error;
      }
    ) 
  }

}

