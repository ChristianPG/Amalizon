import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { first, map, switchMap, share, catchError, take } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: any[];
  loading = true;
  errors: any;
  page = 1;
  pageSize = 2;
  category = '';
  keyword = '';

  private querySubscription: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.querySubscription = this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          const pageNumber = parseInt(params['page']);
          this.page = pageNumber ? (pageNumber > 1 ? pageNumber : 1) : 1;
          this.category = params['category'] || 'all';
          this.keyword = params['keyword'] || '';
          return this.productService.searchProducts(
            this.pageSize,
            this.page,
            this.keyword,
            this.category
          );
        })
      )
      .subscribe((result) => {
        this.products = result.data && result.data.searchProducts;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  nextPage() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.page + 1 },
      queryParamsHandling: 'merge',
    });
  }

  previousPage() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.page - 1 },
      queryParamsHandling: 'merge',
    });
  }
}
