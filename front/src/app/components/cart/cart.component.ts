import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CartService} from '../../services/cart.service';
import {Product} from '../../models/Product';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  price: number = 0;

  constructor(protected cartService: CartService) {};

  removeItem(product: Product) {
    this.cartService.removeItem(product);
    this.price -= product.price;
    this.price = parseFloat(this.price.toFixed(2));
  }

  ngOnInit(): void {
    for (let item of this.cartService.getItems()) {
      this.price += item.price;
      this.price = parseFloat(this.price.toFixed(2));
    }
  }
}
