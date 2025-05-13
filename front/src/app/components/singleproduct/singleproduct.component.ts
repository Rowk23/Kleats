import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';
import {Observable, range} from 'rxjs';
import {NgOptimizedImage} from '@angular/common';
import {CartService} from '../../services/cart.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {routes} from '../../app.routes';

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
  product: any;
  a: string = " ";
  size:string="";

  constructor(private productService: ProductService,
            private cartService: CartService,
              private router: Router) {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd)
        this.product = this.productService.getProduct(parseInt(this.router.url.replace('/product/','')))
          .subscribe(data => this.product = data);
    });
  }

  ngOnInit(): void {
  }
  addQuantity(){
    this.quantity++;
  }
  subQuantity(){
    if(this.quantity>1)
      this.quantity--;
  }

  addToCart(){
    if(this.size==""){
      window.alert("Please select a size!")
    }
    else{
      for(let i=0;i<this.quantity;i++){
        this.cartService.addToCart(this.product,this.size);
      }
      window.alert("Item added to cart!");
    }
  }

  changeSize(event: any){
      this.size = event.target.id;
      console.log(this.size);
  }
}
