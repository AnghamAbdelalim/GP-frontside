import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {IBillingAddress } from 'src/app/Models/IBillingAddress';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { BillingAddresstService} from 'src/app/Services/billing-address.service';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.scss']
})
export class BillingAddressComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, 
    private _billingAddress: BillingAddresstService,
    private _router: Router , private _authenticationService: AuthenticationService) { }
    BillingAddressForm: FormGroup;
   
  errMsg: string ; 
    get formFields() { return this. BillingAddressForm.controls; } 

  ngOnInit(): void {
    {this.BillingAddressForm = this._formBuilder.group({
      street: ['', Validators.required],
     // Country: ['', Validators.required],
     // city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern("[0-9]+")]],
     
      shipperName: ['', [Validators.required, Validators.minLength(10), Validators.pattern("[a-z]+")]],
    });}}
  
    addBillingAddress()
     {
      let newBillingAddress: IBillingAddress =
      {
        street: this.formFields.street.value,
       // Country:this.formFields.Country.value,
       // city: this.formFields.city.value,
        phone: this.formFields.phone.value,
        shipperName: this.formFields.shipperName.value,
       
  
      };
      if(this._authenticationService.isLoggedIn())
      {
         this._billingAddress.addNewBillingAddress(newBillingAddress)
      .pipe(first())
      .subscribe(
        data => {
          this._router.navigate(['/Payment']);
        },
        error => {
          this.errMsg = error;
        });
      
      }
      else {
    
         this._router.navigate(['/Login']);
       }
  }

}
