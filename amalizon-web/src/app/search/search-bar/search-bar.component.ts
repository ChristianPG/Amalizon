import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category/category.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  categories: any[];
  loading = true;
  errors: any;

  searchForm = new FormGroup({
    selectedCategoryId: new FormControl('all', [Validators.required]),
    keyword: new FormControl('', [
      Validators.required,
      Validators.pattern('(?!^ +$)^.+'),
    ]),
  });

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchForm.controls['selectedCategoryId'].setValue(
        params['category'] || 'all'
      );
      this.searchForm.controls['keyword'].setValue(params['keyword'] || '');
    });
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result.data && result.data.categories;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  search() {
    this.router.navigate(['product-list'], {
      queryParams: {
        keyword: this.searchForm.value.keyword,
        category: this.searchForm.value.selectedCategoryId,
        page: 1,
      },
    });
  }
}
