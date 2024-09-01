import { Routes } from '@angular/router';
import { AuthGuard } from 'src/libs/cores/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    loadComponent: () =>
      import('../libs/pages/home').then((page) => page.HomeComponent),
  },
  {
    path: 'category',
    // canActivate: [AuthGuard],
    loadComponent: () =>
      import('../libs/pages/category').then((page) => page.CategoryComponent),
  },
  {
    path: 'product-page/:id',
    // canActivate: [AuthGuard],
    loadComponent: () =>
      import('../libs/pages/product-page').then(
        (page) => page.ProductPageComponent
      ),
  },
  {
    path: 'cart',
    // canActivate: [AuthGuard],
    loadComponent: () =>
      import('../libs/pages/cart').then((page) => page.CartComponent),
  },
  {
    path: 'checkout',
    // canActivate: [AuthGuard],
    loadComponent: () =>
      import('../libs/pages/checkout').then((page) => page.CheckoutComponent),
  },
  {
    path: 'contact',
    // canActivate: [AuthGuard],
    loadComponent: () =>
      import('../libs/pages/contact').then((page) => page.ContactComponent),
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('../libs/pages/register').then((page) => page.RegisterComponent),
  },
  {
    path: 'sign-in',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('../libs/pages/sign-in').then((page) => page.SignInComponent),
  },
  {
    path: 'invoice',
    loadComponent: () =>
      import('../libs/pages/invoice').then((page) => page.InvoiceComponent),
  },
  {
    path: 'invoice/:id',
    loadComponent: () =>
      import('../libs/pages/invoice-detail').then(
        (page) => page.InvoiceDetailComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('../libs/pages/about').then((page) => page.AboutComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('../libs/pages/blog').then((page) => page.BlogComponent),
  },
];
