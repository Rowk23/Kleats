import { Injectable } from '@angular/core';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];
  a: any
  check: boolean = false;
  constructor() {
    this.items = JSON.parse(localStorage.getItem('items')||'[]');
  }

  addToCart(product: Product,s:string) {
    this.check = false;
    for(this.a of this.items){
      if(this.a.id==product.id) {
        this.check = true;
        this.items[this.items.indexOf(this.a)].quantity++;
        break;
      }
    }
    if(!this.check)
      this.items.push({...product, quantity: 1, size: s});
    this.syncItems();
  }

  getItems(){
    return this.items;
  }

  removeItem(product: Product){
    const index = this.items.indexOf(product);
    this.items.splice(index,1);
    this.syncItems();
  }

  clearCart(){
    this.items.splice(0);
    this.syncItems();
  }

  syncItems(){
    localStorage.setItem('items',JSON.stringify(this.items));
  }
}
