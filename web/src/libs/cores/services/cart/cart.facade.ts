import { Injectable } from '@angular/core';
import { store } from './cart.store';
import { IProductCart } from '../../models/cart.model';
import { select } from '@ngneat/elf';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  product$ = store.pipe(select((state) => state.product));
  addToCart(product: IProductCart) {
    store.update((state) => {
      if (!state.product.length) {
        return {
          ...state,
          product: [product],
        };
      }
      const productExisted = state.product.find(
        (prd) => prd.id === product.id && prd.size == product.size
      );
      if (productExisted) {
        return {
          ...state,
          product: state.product.map((prd) => {
            if (prd.id === product.id && prd.size === product.size) {
              return {
                ...prd,
                quantity: (prd.quantity || 0) + (product.quantity || 0),
              };
            }
            return prd;
          }),
        };
      } else {
        return {
          ...state,
          product: [...state.product, product],
        };
      }
    });
  }

  removeFromCart(product: IProductCart) {
    store.update((state) => {
      return {
        ...state,
        product: state.product.filter(
          (prd) => prd.id !== product.id || product.size !== prd.size
        ),
      };
    });
  }

  clearCart() {
    store.destroy();
  }
}
