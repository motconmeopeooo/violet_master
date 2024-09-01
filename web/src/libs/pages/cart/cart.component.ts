import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartFacade } from 'src/libs/cores/services/cart/cart.facade';
import { IProductCart } from 'src/libs/cores/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  product$ = this.cartFacade.product$;
  constructor(private cartFacade: CartFacade) {}
  ngOnInit(): void {}

  calcTotal(products: IProductCart[]) {
    const initialValue = 0;
    const sumWithInitial = products.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.quantity || 0) * (currentValue.price || 0),
      initialValue
    );
    return sumWithInitial;
  }

  removeFromCart(product: IProductCart) {
    this.cartFacade.removeFromCart(product);
  }
}
