import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductDTO} from '../models/ProductDTO';
import {RequestDTO} from '../models/RequestDTO';
import {catchError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient) { }

  check(products: ProductDTO[]) {
    let req:RequestDTO = {products:products, currency: "RON"};
    return this.http.post("http://localhost:8080/api/checkout",req);
  }
}
