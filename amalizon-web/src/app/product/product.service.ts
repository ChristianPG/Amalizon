import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  numberOfPagesByCondition(
    pageSize: Number,
    keyword: string,
    categoryId: string
  ) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query numberOfPagesByCondition($input: numberOfPagesByConditionInput!) {
          numberOfPagesByCondition(input: $input)
        }
      `,
      variables: {
        input: { pageSize, keyword, categoryId },
      },
    }).valueChanges;
  }

  searchProducts(
    pageSize: Number,
    page: Number,
    keyword: string,
    categoryId: string
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

  getProductById(id: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query productById($id: ID!) {
          productById(id: $id) {
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
        id,
      },
    }).valueChanges;
  }
}
