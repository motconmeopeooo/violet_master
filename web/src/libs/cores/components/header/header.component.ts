import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthFacade } from '../../services/auth';
import { CartFacade } from '../../services/cart/cart.facade';
import { IProductCart } from '../../models/cart.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authFacade.user$;
  isAuthorized = false;
  product$ = this.cartFacade.product$;
  constructor(
    private authFacade: AuthFacade,
    private router: Router,
    private cartFacade: CartFacade
  ) {}

  ngOnInit() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    return this.authFacade.isAuthenticated().subscribe((isAuth) => {
      this.isAuthorized = isAuth;
    });
  }
  logout() {
    this.authFacade.logOut();
  }

  calcProduct(product: IProductCart[]) {
    const initialValue = 0;
    const sumWithInitial = product.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.quantity || 0),
      initialValue
    );
    return sumWithInitial;
  }
}
