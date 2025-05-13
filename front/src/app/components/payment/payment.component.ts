import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.clearCart();
  }
}
