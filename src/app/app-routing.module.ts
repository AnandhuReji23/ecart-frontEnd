import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNoteFoundComponent } from './page-note-found/page-note-found.component';
import { ViewProductsComponent } from './products/view-products/view-products.component';
import { CartComponent } from './products/cart/cart.component';
import { WishlistComponent } from './products/wishlist/wishlist.component';

const routes: Routes = [
  {
     path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) 
    },
    //4200/products set to main
    {
        path:'',redirectTo:'products',pathMatch:'full'
    },
    //page not fount path
    {
      path:'**',component:PageNoteFoundComponent
    }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
