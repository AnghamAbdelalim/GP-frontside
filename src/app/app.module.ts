import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';

//import { CategoriesComponent } from './Components/dashboard/categories/categories.component';
//import { SubCategoryComponent } from './Components/dashboard/sub-category/sub-category.component';
//import { ProductComponent } from './Components/dashboard/product/product.component';
import { SideBarComponent } from './Components/dashboard/side-bar/side-bar.component';
import { UsersComponent } from './Components/dashboard/users/users.component';
import { DashboardComponent } from './Components/dashboard/dashboard/dashboard.component';
import { OrderComponent } from './Components/dashboard/order/order.component';
import { IndexComponent } from './Components/dashboard/Categorys/index/index.component';
import { AddCategoryComponent } from './Components/dashboard/Categorys/add-category/add-category.component';
import { UpdateCategoryComponent } from './Components/dashboard/Categorys/update-category/update-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { ConfirmModalComponent } from './reusedComponent/confirm-modal/confirm-modal.component';
import { SubCategoriesComponent } from './Components/dashboard/sub-categories/sub-categories.component';
//import { AddproductComponent } from './Components/dashboard/product/Products/addproduct/addproduct.component';
//import { UpdateproductComponent } from './Components/dashboard/product/Products/updateproduct/updateproduct.component';
import { UploadComponent } from './Components/ReusableComponents/upload/upload.component';
import { AddProduComponent } from './Components/dashboard/Products/add-produ/add-produ.component';
import { AddBrandComponent } from './Components/dashboard/Brand/add-brand/add-brand.component';
import { UpdateBrandComponent } from './Components/dashboard/Brand/update-brand/update-brand.component';
import { ModelComponent } from './Components/dashboard/Model/model/model.component';
import { HomeComponent } from './Components/Client/home/home.component';
import { ShopAllCategoriesComponent } from './Components/Client/shop-all-categories/shop-all-categories.component';
import { ShopSubCategoriesComponent } from './Components/Client/shop-sub-categories/shop-sub-categories.component';
import { QuickViewComponent } from './Components/Client/quick-view/quick-view.component';
import { ShowProductComponent } from './Components/Client/home/show-product/show-product.component';
import { UserCartComponent } from './Components/Client/user-cart/user-cart.component';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';
import { WishListComponent } from './Components/Client/wish-list/wish-list.component';
import { SearchComponent } from './Components/Client/search/search.component';
import { BillingAddressComponent } from './Components/Client/billing-address/billing-address.component';
import { PaymentComponent } from './Components/Client/payment/payment.component';
import { HomebodyComponent } from './Components/Client/home/homebody/homebody.component';
import { OrderUserComponent } from './Components/Client/order-user/order-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
  //  CategoriesComponent,
 
    //ProductComponent,
    SideBarComponent,
    UsersComponent,
    OrderComponent,
    IndexComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    SubCategoriesComponent,

    UploadComponent,
    AddProduComponent,
    AddBrandComponent,
    UpdateBrandComponent,
    ModelComponent,
    HomeComponent,
    ShopAllCategoriesComponent,
    ShopSubCategoriesComponent,
    QuickViewComponent,
    ShowProductComponent,
    UserCartComponent,
    LoginComponent,
    RegisterComponent,
    WishListComponent,
    SearchComponent,
PaymentComponent,
BillingAddressComponent,
HomebodyComponent,
OrderUserComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
    

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
