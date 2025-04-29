import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CartService} from '../../services/cart.service';
import {Product} from '../../models/Product';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Projects} from '@angular/cli/lib/config/workspace-schema';

@Component({
  selector: 'app-productspage',
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterLinkActive],
  templateUrl: './productspage.component.html',
  styleUrl: './productspage.component.css'
})
export class ProductspageComponent implements OnInit{
  products: any = [];
  constructor(private productService: ProductService,
              private cartService: CartService) {}

  getProducts(){
    this.productService.getProducts()
      .subscribe(data => this.products = data);
  }


  ngOnInit(): void {
    this.getProducts();
  }

  setProduct(product: Product){
    this.productService.setProduct(product);
  }
}
