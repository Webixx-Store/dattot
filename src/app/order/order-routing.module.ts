import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoesProductListComponent } from './shoes-product-list/shoes-product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { OrderAnalysicComponent } from './order-analysic/order-analysic.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { AnaCoinListComponent } from './ana-coin-list/ana-coin-list.component';

const routes: Routes = [
  {path:'checkout' , component:CheckoutComponent},
  {path:'wishlist' , component:WishListComponent},
  {path:'danh-sach' , component:ProductListComponent},
  {path:'cart' , component:WishListComponent},
  {path:'them-moi' , component:AddProductComponent},
  {path:'sua' , component:AddProductComponent},
  {path:'chi-tiet/:product' , component:ProductDetailComponent  , runGuardsAndResolvers: 'always'} ,
  {path:'order-detail' , component:OrderDetailComponent},
  {path:'order-tracking' , component:OrderTrackingComponent},
  {path:'order-analysic' , component:OrderAnalysicComponent},
  {path:'them-danh-muc' , component:AddCategoryComponent},
  {path:'tao-vi' , component:CreateWalletComponent},
  {path:'phan-tich-tien-ao' , component:AnaCoinListComponent},
  {path:'' , component:ShoesProductListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
