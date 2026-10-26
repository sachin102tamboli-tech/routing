import { RouterModule, Routes } from "@angular/router";
import { ProductDashComponent } from "./component/product/product-dash/product-dash.component";
import { UserDetailsComponent } from "./component/user/user-details/user-details.component";
import { NgModule } from "@angular/core";
import { ProductFormComponent } from "./component/product/product-form/product-form.component";
import { ProductCardComponent } from "./component/product/product-card/product-card.component";


const routes : Routes = [
    {
        path : '',
        component : ProductDashComponent
    },
    {
        path : 'home',
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
        component : UserDetailsComponent
    }
]

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRouingModule {}