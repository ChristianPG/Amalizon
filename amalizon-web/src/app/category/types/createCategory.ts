/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createCategoryInput } from "./../../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createCategory
// ====================================================

export interface createCategory_createCategory {
  __typename: "Category";
  id: string;
  name: string;
}

export interface createCategory {
  createCategory: createCategory_createCategory;
}

export interface createCategoryVariables {
  input: createCategoryInput;
}
