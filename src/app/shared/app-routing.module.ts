import { RouterModule, Routes } from "@angular/router";
import { ProductDashComponent } from "./component/product/product-dash/product-dash.component";
import { UserDetailsComponent } from "./component/user/user-details/user-details.component";
import { NgModule } from "@angular/core";
import { ProductFormComponent } from "./component/product/product-form/product-form.component";
import { ProductCardComponent } from "./component/product/product-card/product-card.component";
import { UserFormsComponent } from "./component/user/user-forms/user-forms.component";
import { UserDashComponent } from "./component/user/user-dash/user-dash.component";


const routes : Routes = [
    {
        path : '',
        component : ProductDashComponent
    },
    {
        path : 'product',
        component : ProductDashComponent
    },
    {
        path : 'product/add',
        component : ProductFormComponent
    },
    {
        path : 'product/:id',
        component : ProductCardComponent
    },
    {
        path : 'product/add/:id',
        component : ProductCardComponent
    },
    {
        path : 'product/:id/edit',
        component : ProductFormComponent 
    },
    {
        path : 'user',
        component : UserDashComponent
    },
    {
        path : 'user/add',
        component : UserFormsComponent
    },
    {
        path : 'user/:id',
        component : UserDetailsComponent
    },
    {
        path : 'user/:id/edit',
        component : UserFormsComponent 
    }
]

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRouingModule {}