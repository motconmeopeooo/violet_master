import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFacade } from 'src/libs/cores/services/invoice/invoice.facade';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from 'src/libs/cores/components';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  invoices$ = this.invoiceFacade.invoices$;
  isLoading = false;
  constructor(private invoiceFacade: InvoiceFacade) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.invoiceFacade.getAll().subscribe((data) => (this.isLoading = false));
  }
}
