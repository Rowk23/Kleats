import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../models/Product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  constructor(private http: HttpClient) {}
  getProducts(){
    return this.http.get("http://localhost:8080/api/products");
  }
  getProduct(id: number){
    return this.http.get("http://localhost:8080/api/products/"+id);
  }
  getSearch(search: string){
    return this.http.get("http://localhost:8080/api/products/search/"+search);
  }
  getCat(filters: string[]){
    let str: string = "";
    for(let f of filters){
      str = str.concat(f+",");
    }
    str = str.substring(0, str.length - 1);
    return this.http.get("http://localhost:8080/api/products?list="+str);
  }
}
