import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopAllCategoriesComponent } from './Components/Client/shop-all-categories/shop-all-categories.component';
import { ShopSubCategoriesComponent } from './Components/Client/shop-sub-categories/shop-sub-categories.component';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';
import { AddBrandComponent } from './Components/dashboard/Brand/add-brand/add-brand.component';
import { AddCategoryComponent } from './Components/dashboard/Categorys/add-category/add-category.component';
//import { CategoriesComponent } from './Components/dashboard/categories/categories.component';
import { IndexComponent } from './Components/dashboard/Categorys/index/index.component';
import { DashboardComponent } from './Components/dashboard/dashboard/dashboard.component';
import { ModelComponent } from './Components/dashboard/Model/model/model.component';
import { OrderComponent } from './Components/dashboard/order/order.component';
import { AddProduComponent } from './Components/dashboard/Products/add-produ/add-produ.component';
import { SubCategoriesComponent } from './Components/dashboard/sub-categories/sub-categories.component';
//import { AddSubCategoryComponent } from './Components/dashboard/SubCategory/add-sub-category/add-sub-category.component';
//import { ProductComponent } from './Components/dashboard/product/product.component';
//import { SubCategoryComponent } from './Components/dashboard/sub-category/sub-category.component';
//import { ShowComponent } from './Components/dashboard/SubCategory/show/show.component';
import { UsersComponent } from './Components/dashboard/users/users.component';
import { UpdateCategoryComponent } from './Components/dashboard/Categorys/update-category/update-category.component';
import { ShowProductComponent } from './Components/Client/home/show-product/show-product.component';
import { UserCartComponent } from './Components/Client/user-cart/user-cart.component';
import { HeaderComponent } from './Components/header/header.component';
import { WishListComponent } from './Components/Client/wish-list/wish-list.component';
import { HomeComponent } from './Components/Client/home/home.component';
import { SearchComponent } from './Components/Client/search/search.component';
import { BillingAddressComponent } from './Components/Client/billing-address/billing-address.component';
import { PaymentComponent } from './Components/Client/payment/payment.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Login',component:LoginComponent},
  {path: 'categories', component: IndexComponent},
  {path: 'orders', component:OrderComponent},
  {path: 'products', component:AddProduComponent},
  {path: 'users', component: UsersComponent},
  {path:"AddCategory",component:AddCategoryComponent},
{path:'subCategories',component:SubCategoriesComponent},
{path:'brans',component:AddBrandComponent},
{path:'models',component:ModelComponent},
{path:'subcategories',component:SubCategoriesComponent},
{path:'dashboard',component:DashboardComponent},
{path:'allcategories',component:ShopAllCategoriesComponent},
{path:'Getsubcategories/:id',component:ShopSubCategoriesComponent},
{path:'CategorysUPdate/:id',component: UpdateCategoryComponent },
{path:'relatedproducts/:id/:id1',component:ShowProductComponent},
{path:'head',component:HeaderComponent},
{
  path:'cart',component:UserCartComponent
},

{path:'wishList',component:WishListComponent},
{path:'home',component:HomeComponent},
{path:'search-results/:searchkeyword',component:SearchComponent},

{path:'BillingAddress',component:BillingAddressComponent},
{path:'Payment',component:PaymentComponent},
{path:'order',component:OrderComponent},
//{path:'allcategories',component}search-results
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
