import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InvoiceFacade } from 'src/libs/cores/services/invoice/invoice.facade';
import { IProductCart } from 'src/libs/cores/models/cart.model';
import { LoadingComponent } from 'src/libs/cores/components';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent {
  invoice$ = this.invoiceFacade.invoice$;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private invoiceFacade: InvoiceFacade
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // 'id' should match the parameter name in the route
      if (id) {
        this.isLoading = true;

        this.invoiceFacade
          .getById(id)
          .subscribe(() => (this.isLoading = false));
      }
    });
  }
  calcTotal(products: any[]) {
    const initialValue = 0;
    const sumWithInitial = products.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.quantity || 0) * (currentValue.price || 0),
      initialValue
    );
    return sumWithInitial;
  }
}
