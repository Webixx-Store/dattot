import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';

import { HomePageComponent } from '../home-page/home-page.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { ChatTingComponent } from './trade/chat-ting/chat-ting.component';
import { AuthDetail } from '../common/util/auth-detail';
import { OrderAnalysicComponent } from '../order/order-analysic/order-analysic.component';
import { WeddingComponent } from '../wedding/wedding.component';
import { AnaCoinListComponent } from '../order/ana-coin-list/ana-coin-list.component';
const postModule = () => import ("../../app/app-layout/post/post.module").then(x => x.PostModule);
const orderModule = () => import ("../../app/order/order.module").then(x => x.OrderModule);
const authModule = () => import ("../../app/app-layout/login/login-routing.module").then(x=>x.LoginRoutingModule)
const trade = () => import ("../../app/app-layout/trade/trade.module").then(x=>x.TradeModule)
const about = () => import ("../../app/app-layout/about/about.module").then(x=>x.AboutModule)

let role =  AuthDetail.getLoginedInfo()?.role;
const routes: Routes = [
  {
    path: '', component: AppLayoutComponent, children: [

       { path: '', component:   AnaCoinListComponent},
       { path: 'auth', loadChildren: authModule },
       { path: 'du-an'  , loadChildren: orderModule },
       { path: 'tin-tuc', loadChildren: postModule },
       { path: 'trade',canActivate : [AuthGuardService]  , loadChildren: trade },
       { path: 'about'  , loadChildren: about },
    ]
  },
  { path: 'wedding', component: WeddingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
