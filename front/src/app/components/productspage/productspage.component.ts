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
  lsearch:string[] = [];
  constructor(private productService: ProductService,
              private cartService: CartService) {}

  getProducts(arr: string[]){
    this.productService.getCat(arr)
      .subscribe(data => this.products = data);
  }

  ngOnInit(): void {
    this.getProducts(this.lsearch);
  }

  search(event: any){
    if(event.target.checked){
      this.lsearch.push(event.target.id);
    }
    else {
      let index = this.lsearch.indexOf(event.target.id);
      this.lsearch.splice(index,1);
    }
  }
  apply(){
    this.getProducts(this.lsearch)
  }
}
