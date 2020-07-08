import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  removeProduct(productId: string) {
    this.cartService.removeProductFromCart(productId);
  }

}
