import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/Models/brand';
import { Model } from 'src/app/Models/model';
import { BrandService } from 'src/app/Services/brand.service';
import { ModelService } from 'src/app/Services/model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  constructor(private _router:Router,private fb: FormBuilder, private modelservice: ModelService, private brandService: BrandService) { }

  modelForm = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required]
  })
action!:string
  flag!: boolean
  x: boolean = true;
  allBrands!: Brand[];
  allModels!: Model[];
  modelId!:number;

  ngOnInit(): void {

    this.modelservice.returnAllModels().subscribe((data) => {
     
      this.allModels = data
    // this.allModels=JSON.parse();
      console.log(this.allModels);
    }, (error) => {
      alert(error);
    });
    this.brandService.returnAllBrans().subscribe((data) => {
      this.allBrands = data;
      console.log(this.allBrands);
    }, (error) => {
      alert(error);


    })

    
  }
  get formFields() {
    return this.modelForm.controls;
  }
  add() {
    //alert(this.formFields.brand.value);
    let model: Model = {
      id: 0,

      name: this.formFields.name.value,
      brandId: this.formFields.brand.value,
      brandName: ""
    }
    this.modelservice.addModel(model).subscribe(() => {
    //  alert('succedded');
      this.flag=false;
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
     
      this._router.navigate([this._router.url]);
    },
      (error) => {
        alert(error);
      })
  }
  addOrUpdate()
  {
    if(this.action=='Add')
    {
      this.add();
    }
    else if(this.action=='Update')
    {
      this.updateModel();
    }
  }
  updateModel()
  {
    let updatedProduct:Model={
      id:this.modelId,
      name:this.formFields.name.value,
      brandId:this.formFields.brand.value,
      brandName:""

    }
    this.modelservice.updateModels(this.modelId,updatedProduct).subscribe(()=>{
      alert('updated successfully');
      this.flag=false;
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
     
      this._router.navigate([this._router.url]);
    },(err)=>{
      alert('Falied to Update');
    })           
  }
  show() {
    this.flag = true;
    this.action="Add"
  }
  close() {
    this.flag = false;

  }
  delete(id:any)
  {
    this.modelservice.deleteModel(id).subscribe(()=>{
      alert('Deletd ');
     this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
     
      this._router.navigate([this._router.url]);
     
    },(error)=>{
      alert('Problem Occured');
    })
  }
  update(id:any)
  {
    alert(id);
   
    this.action="Update"
    this.modelservice.getModelById(id).subscribe((data)=>{
      console.log(data);
      this.modelId=data.id
      this.modelForm.setValue({
name:data.name,
brand:data.brandId
      })
    },(error)=>{
alert(error);
    })
    this.flag=true;
  }
}
