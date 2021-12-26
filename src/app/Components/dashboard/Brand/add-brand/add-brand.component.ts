import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Brand } from 'src/app/Models/brand';
import { BrandService } from 'src/app/Services/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  constructor(private fb: FormBuilder, private brandService: BrandService,private _router:Router) { }

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands()
  {
    this.brandService.returnAllBrans().subscribe(
      (Data)=>{
        this.allbrands=Data;
        console.log(Data);
       },
      (err)=>{
      alert(err);
      })
  }
  BrandForm = this.fb.group({
    name: ['', Validators.required]
  })

  get formsfields() {
    return this.BrandForm.controls;
  }
  allbrands!:Brand[];
  flag!: boolean;
  openForm() {
    this.flag = true;
}

  closeForm() {
    this.flag = false;
  }
  Delete(id:any)
  {
    this.brandService.deleteBrand(id).subscribe(()=>{
      alert('Deletd ');
     this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
     
      this._router.navigate([this._router.url]);
     
    },(error)=>{
      alert('Problem Occured');
    })

  }
  add() {
    let brand: Brand = {
      id: 0,
      name: this.formsfields.name.value
    }
    this.brandService.addNrand(brand)
      .pipe(first())
      .subscribe(

        data => {
         // alert("Added");
          this._router.routeReuseStrategy.shouldReuseRoute = () => false;
          this._router.onSameUrlNavigation = 'reload';
         
          this._router.navigate([this._router.url]);
         
        },
        error => {
          //  this.errorMsg = error;
          alert(error);
          //  this.loading = false;

        });

  }
}
