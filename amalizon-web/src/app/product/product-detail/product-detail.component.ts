import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product = null;
  loading = true;
  errors: any;
  subscription: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.productService.getProductById(params.get('productId'));
        })
      )
      .subscribe((result) => {
        this.product = result.data && result.data.productById;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToCart() {
    this.cartService.addProductToCart(this.product, 1);
  }
}
