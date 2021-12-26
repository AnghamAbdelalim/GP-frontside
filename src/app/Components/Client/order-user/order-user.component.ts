import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/Models/IOrder';
import { IOrderDetailes } from 'src/app/Models/IOrderDetailes';
import { AccountService } from 'src/app/Services/account.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.scss']
})
export class OrderUserComponent implements OnInit {
  user:any;
  allOrders:IOrder[]; 
  UserOrders:IOrder[] =[]; 
  orderDetailsList:IOrder[];
  constructor(private _orderAppSeriv:OrderService,private _accountService:AccountService) { }
  errorMsg:string;

  hasOrders:boolean = false;
  
  pageSize:number=30;
  currentPageNumber:number=1
  
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

         
            console.log("rrrrrrrrrrrrr")
          this._accountService.UserData(order.applicationUserIdentity_Id).subscribe(datas=>{
            order.appUser=datas.userName
            console.log("uuuu",order.appUser)  
            console.log("ffft",order)
        
          })}
          for( let order of  this.allOrders){
           this.user=localStorage.getItem('userName');
           console.log("rrr",this.user)
            if(order.appUser==this.user)
          {
this.UserOrders.push(order)
console.log("fff",this.UserOrders)
          }
        
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
    console.log("orders")
    this._orderAppSeriv.orderDetails().subscribe(
      data => {
        console.log("Oryder",data)
        alert('Order Saved Successfully');
        
        /* this._accountService.AllUserData().subscribe(datya=>{
          for (  let account of datya){
            if(account.userName==localStorage.getItem('userName'))
            {
              localStorage.setItem('currentuserid',account.)
            }
          } */

       /*  }) */
       this.orderDetailsList=data;
        this.orderDetailsList = data;
      },
      error=>
      {
        this.errorMsg = error;
      }
    ) 
  }
}
