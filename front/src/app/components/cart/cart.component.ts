import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CartService} from '../../services/cart.service';
import {Product} from '../../models/Product';
import {ProductDTO} from '../../models/ProductDTO';
import {StripeService} from '../../services/stripe.service';
import {ResponseDTO} from '../../models/ResponseDTO';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  price: number = 0;
  shipping: number = 25;
  constructor(protected cartService: CartService, private stripeService: StripeService) {};

  removeItem(product: Product) {
    this.cartService.removeItem(product);
    this.price -= product.price;
    this.price = parseFloat(this.price.toFixed(2));
  }

  ngOnInit(): void {
    for (let item of this.cartService.getItems()) {
      this.price += item.price * item.quantity;
      this.price = parseFloat(this.price.toFixed(2));
    }
    this.price += this.shipping;
  }
  checkout(){
    let products:ProductDTO[] = [];
    for(let item of this.cartService.getItems()){
      products.push({name:item.name,amount:item.price*100,quantity:item.quantity});
    }
    this.stripeService.check(products).subscribe(data => {
      let res:ResponseDTO = <ResponseDTO>data;
      window.location.href=res.sessionUrl;
     });
  }
}
