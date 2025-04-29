import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';
import {Observable, range} from 'rxjs';
import {NgOptimizedImage} from '@angular/common';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-singleproduct',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './singleproduct.component.html',
  styleUrl: './singleproduct.component.css'
})
export class SingleproductComponent implements OnInit{

  quantity:number = 1;
  product: Product = {id:1,name:"",image:"",price:0};

  constructor(private productService: ProductService,
            private cartService: CartService) {}

  ngOnInit(): void {
    this.product = this.productService.current;
  }
  addQuantity(){
    this.quantity++;
  }
  subQuantity(){
    if(this.quantity>1)
      this.quantity--;
  }

  addToCart(){
    for(let i=0;i<this.quantity;i++){
      this.cartService.addToCart(this.product);
    }
  }
}
