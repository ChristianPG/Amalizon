import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product = null;
  loading = true;
  errors: any;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          // console.log(params.get('productId'));
          return this.productService.getProductById(params.get('productId'));
        })
      )
      .subscribe((result) => {
        // console.log(result);
        this.product = result.data && result.data.productById;
        this.loading = result.loading;
        this.errors = result.errors;
        // console.log(this.product);
      });
  }

  addToCart() {
    this.cartService.addProductToCart(this.product, 1);
  }
}
