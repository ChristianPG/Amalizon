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
  visiblePages = [];
  numberOfPages = 1;
  page = 1;
  pageSize = 8;
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
          return this.productService.numberOfPagesByCondition(
            this.pageSize,
            this.keyword,
            this.category
          );
        }),
        switchMap((result) => {
          this.numberOfPages =
            result.data && result.data.numberOfPagesByCondition;
          this.page =
            this.page >= this.numberOfPages ? this.numberOfPages : this.page;

          return this.page
            ? this.productService.searchProducts(
                this.pageSize,
                this.page,
                this.keyword,
                this.category
              )
            : of({
                data: { searchProducts: [] },
                loading: false,
                errors: null,
              });
        })
      )
      .subscribe(
        (result) => {
          if (result) {
            this.products = result.data && result.data.searchProducts;
            this.loading = result.loading;
            this.errors = result.errors;
            this.getVisiblePages();
          }
        },
        (error) => {
          this.loading = false;
          this.errors = error;
        }
      );
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  getVisiblePages() {
    this.visiblePages = [];
    let lowerLimit = this.page - 3;
    let upperLimit = this.page + 3;
    if (lowerLimit < 1) {
      const excess = 1 - lowerLimit;
      lowerLimit = 1;
      upperLimit += excess;
    }
    if (upperLimit > this.numberOfPages) {
      const excess = upperLimit - this.numberOfPages;
      upperLimit = this.numberOfPages;
      lowerLimit -= excess;
    }
    for (let index = lowerLimit; index <= upperLimit; index++) {
      if (index >= 1 && index <= this.numberOfPages) {
        this.visiblePages.push(index);
      }
    }
  }

  previousPage() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.page - 1 },
      queryParamsHandling: 'merge',
    });
  }

  setPage(page: Number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  nextPage() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.page + 1 },
      queryParamsHandling: 'merge',
    });
  }
}
