import { Injectable } from '@angular/core';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];
  constructor() {
    this.items = JSON.parse(localStorage.getItem('items')||'[]');
  }

  addToCart(product: Product) {
    this.items.push({...product, quantity: 1});
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

  syncItems(){
    localStorage.setItem('items',JSON.stringify(this.items));
  }
}
