import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss'],
})
export class CartPreviewComponent implements OnInit {
  cartLength = 2;

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.loadCartProducts();
  }

  goToCartDetail(): void {
    this.router.navigate(['cart']);
  }
}
