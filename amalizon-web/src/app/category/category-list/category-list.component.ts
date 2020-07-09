import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy  {
  categories: any[];
  loading = true;
  errors: any;

  private querySubscription: Subscription;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.querySubscription  = this.categoryService.getCategories().subscribe((result) => {
      this.categories = result.data && result.data.categories;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
