import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './shared/component/product/product-card/product-card.component';
import { ProductFormComponent } from './shared/component/product/product-form/product-form.component';
import { ProductDashComponent } from './shared/component/product/product-dash/product-dash.component';
import { UserDetailsComponent } from './shared/component/user/user-details/user-details.component';
import { UserFormsComponent } from './shared/component/user/user-forms/user-forms.component';
import { AppRouingModule } from './shared/app-routing.module';
import { NavbarComponent } from './shared/component/navbar/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './shared/component/home/home/home.component';
import { GetConfirmComponent } from './shared/component/getConfirm/get-confirm/get-confirm.component' 
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductFormComponent,
    ProductDashComponent,
    UserDetailsComponent,
    UserFormsComponent,
    NavbarComponent,
    HomeComponent,
    GetConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
