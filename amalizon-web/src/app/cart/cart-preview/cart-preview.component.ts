import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements OnInit {
  cartLength = 2;

  constructor() { }

  ngOnInit(): void {
  }

}
