import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';

import { categories } from './types/categories';
import { createCategory } from './types/createCategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apollo: Apollo) {}

  createCategory(name: String) {
    return this.apollo.mutate<createCategory>({
      mutation: gql`
        mutation createCategory($input: createCategoryInput!) {
          createCategory(input: $input) {
            id
            name
          }
        }
      `,
      variables: {
        input: { name },
      },
    });
  }

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
