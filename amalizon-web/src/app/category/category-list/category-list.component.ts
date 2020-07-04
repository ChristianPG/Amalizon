import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';

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
      console.log(result);
    });

    // this.categoryService.createCategory('Technology').subscribe(result => {
    //   this.categories = result.data && result.data.createCategory;
    //   this.errors = result.errors;
    //   console.log(result);
    // }, (error) => {
    //   console.log('there was an error sending the mutation', error);
    // });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
