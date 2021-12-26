import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IOrder } from 'src/app/Models/IOrder';
import { IPayment } from 'src/app/Models/IPayment';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { OrderService } from 'src/app/Services/order.service';

import { PaymentService } from 'src/app/Services/payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
      paymentForm: FormGroup;
      errMsg: string ; 
      payments:IPayment[];
      TotalPrice :any;
      orderDetails : IOrder;
      constructor( private _formBuilder: FormBuilder, private _orderservice : OrderService,
        private _paymentService: PaymentService,
        private _router: Router , private _authenticationService: AuthenticationService) { }
        
       get formFields() { return this.paymentForm.controls; } 
    
    
      ngOnInit(): void {
        {
    
          
          //bulid payment form
          this.paymentForm = this._formBuilder.group({
            cardOwnerName: ['', Validators.required],
            cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern("[0-9]+")]],
            experationDate: ['', Validators.required],
            cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern("[0-9]+")]],
          });
      
        }
        
        }
        checkOut(){
          alert("Hello! I am an alert box!!");
        }
        addPayment() {
          let newPayment: IPayment =
          {
            cardOwnerName: this.formFields.cardOwnerName.value,
            CardNumber: this.formFields.cardNumber.value,
            cvc: this.formFields.cvc.value,
            ExperationDate: this.formFields.experationDate.value
      
          };
          if(this._authenticationService.isLoggedIn())
          {
           
            this._paymentService.addNewPayment(newPayment)
           /*  alert("Payment Add") */
           console.log("ouedata",newPayment)
           /* this.payments.push()
          this._paymentService.addNewPayment(newPayment)
            .subscribe(
              data => {
                alert("Payment Add")
              },
              error => {
                this.errMsg = error;
              });*/
            }
            else {
              // alert("Login to add product to wishlist");
               this._router.navigate(['/Login']);
             }
          }
          Checkout()
          {
         
            this.TotalPrice =  localStorage.getItem("TotalPrice")
    
            this.orderDetails = {id:0,applicationUserIdentity_Id:"" ,appUser:"",orderdate:new Date().toLocaleDateString(),totalPrice:this.TotalPrice};
            console.log("weca",this.orderDetails)
            this._orderservice.makeOrder(this.orderDetails)
              .pipe(first())
              .subscribe(
                data => {
                  console.log("fras",data)
                  this._router.navigate(['/home']);
                  
                },
                error => {
        
                });
    
          }
  }
   