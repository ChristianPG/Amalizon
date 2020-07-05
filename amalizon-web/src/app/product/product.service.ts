import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  searchProducts(
    pageSize: Number,
    page: Number,
    keyword: String,
    categoryId: String
  ) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query searchProducts($input: searchProductsInput!) {
          searchProducts(input: $input) {
            id
            name
            description
            picture
            price
            categories {
              id
              name
            }
          }
        }
      `,
      variables: {
        input: { pageSize, page, keyword, categoryId },
      },
    }).valueChanges;
  }
}
