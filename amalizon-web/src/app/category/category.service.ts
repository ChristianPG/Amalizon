import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { categories } from './types/categories';
import { createCategory } from './types/createCategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apollo: Apollo) {}

  getCategories() {
    return this.apollo.watchQuery<categories>({
      query: gql`
        query categories {
          categories {
            id
            name
          }
        }
      `,
    }).valueChanges;
  }
}
