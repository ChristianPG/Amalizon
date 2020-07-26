import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartProducts = [];
  public numberOfProductsInCart = 0;
  public total = 0;

  constructor() {}

  loadCartProducts() {
    if (localStorage.cartProducts) {
      this.cartProducts = Object.values(JSON.parse(localStorage.cartProducts));
      this.cartProducts.map((product) => {
        this.numberOfProductsInCart += product.quantity;
        this.total += product.quantity * product.price;
      });
    } else {
      this.cartProducts = [];
    }
  }

  addProductToCart(product: any, quantityToAdd: number) {
    let storageCartProducts = {};
    let productInCart = null;
    if (localStorage.cartProducts) {
      storageCartProducts = JSON.parse(localStorage.cartProducts);
      productInCart = storageCartProducts[product.id];
    }
    productInCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      picture: product.picture,
      seller: product.seller,
      quantity:
        productInCart && productInCart.id === product.id
          ? productInCart.quantity + quantityToAdd
          : quantityToAdd,
    };
    storageCartProducts = {
      ...storageCartProducts,
      [product.id]: productInCart,
    };
    this.cartProducts = Object.values(storageCartProducts);
    this.numberOfProductsInCart += quantityToAdd;
    this.total += productInCart.price * quantityToAdd;
    localStorage.cartProducts = JSON.stringify(storageCartProducts);
  }

  removeProductFromCart(productId: string) {
    let storageCartProducts = {};
    let numberOfProductsToRemove = 0;
    let toSubtractFromTotal = 0;
    if (localStorage.cartProducts) {
      storageCartProducts = JSON.parse(localStorage.cartProducts);
      const productInCart = storageCartProducts[productId];
      numberOfProductsToRemove =
        productInCart && productInCart.id === productId
          ? productInCart.quantity
          : numberOfProductsToRemove;
      toSubtractFromTotal =
        productInCart && productInCart.id === productId
          ? productInCart.price * numberOfProductsToRemove
          : toSubtractFromTotal;
      delete storageCartProducts[productId];
    }
    this.cartProducts = Object.values(storageCartProducts);
    this.numberOfProductsInCart -= numberOfProductsToRemove;
    this.total -= toSubtractFromTotal;
    localStorage.cartProducts = JSON.stringify(storageCartProducts);
  }
}
