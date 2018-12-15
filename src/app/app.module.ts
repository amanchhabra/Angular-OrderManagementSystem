import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { UiModule } from './ui/ui.module';

import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { CreateUpdateOrderComponent } from './create-update-order/create-update-order.component';
import { HomeComponent } from './home/home.component';
import { OrderService } from './order.service';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderData } from './order-data';
import { InMemoryWebApiModule } from '../../node_modules/angular-in-memory-web-api';

const appRoutes: Routes = [
  {path: 'order-list', component: AllOrdersComponent},
  {path: 'order-list/:modifiable', component: AllOrdersComponent},
  {path: 'update-order/:id', component: CreateUpdateOrderComponent},
  {path: 'order/:id', component: OrderDetailsComponent},
  {path: 'order', component: CreateUpdateOrderComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    OrderDetailsComponent,
    AllOrdersComponent,
    CreateUpdateOrderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(OrderData)
  ],
  providers: [UiModule,
  OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
