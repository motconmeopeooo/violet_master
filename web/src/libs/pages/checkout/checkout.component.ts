import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartFacade } from 'src/libs/cores/services/cart/cart.facade';
import { IProductCart } from 'src/libs/cores/models/cart.model';
import { InvoiceFacade } from 'src/libs/cores/services/invoice/invoice.facade';
import { IInvoiceDto } from 'src/libs/cores/models/invoice.model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  product$ = this.cartFacade.product$;
  address = '';
  phone = '';
  constructor(
    private cartFacade: CartFacade,
    private invoiceFacade: InvoiceFacade,
    private router: Router
  ) {}

  calcTotal(products: IProductCart[]) {
    const initialValue = 0;
    const sumWithInitial = products.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.quantity || 0) * (currentValue.price || 0),
      initialValue
    );
    return sumWithInitial;
  }

  onSubmit(products: IProductCart[]) {
    if (!products.length || !this.address || !this.phone) {
      return;
    }
    const payload: IInvoiceDto = {
      address: this.address,
      products,
      phone: this.phone,
      total: this.calcTotal(products),
    };
    this.invoiceFacade
      .create(payload)
      .pipe(
        tap((res: any) => {
          if (res.success) {
            this.router.navigate(['/home']);
            this.cartFacade.clearCart();
          }
        })
      )
      .subscribe();
  }

  setAddress(e: any) {
    this.address = e.target.value;
  }
  setPhone(e: any) {
    this.phone = e.target.value;
  }
}
