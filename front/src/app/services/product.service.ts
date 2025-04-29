import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  current: Product = {id:1,name:"",image:"",price:0};
  constructor(private http: HttpClient) {}
  getProducts(){
    return this.http.get("http://localhost:8080/api/products");
  }
  setProduct(product: Product){
    this.current = product;
  }
}
