import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ProductspageComponent} from './components/productspage/productspage.component';
import {CartComponent} from './components/cart/cart.component';
import {SingleproductComponent} from './components/singleproduct/singleproduct.component';

export const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'products',
    component: ProductspageComponent
  },
  {
    path:'cart',
    component: CartComponent
  },
  {
    path:'product/:id',
    component: SingleproductComponent
  }
];
