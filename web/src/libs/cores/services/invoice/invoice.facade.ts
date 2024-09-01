import { Observable, filter, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IBaseParams, IProduct } from '../../models/product.model';
import {
  selectActiveEntity,
  selectAllEntities,
  setActiveId,
  setEntities,
} from '@ngneat/elf-entities';
import { store } from './invoice.store';
import { InvoiceService } from './invoice.service';
import { IInvoice, IInvoiceDto } from '../../models/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoiceFacade {
  invoices$ = store.pipe(selectAllEntities());
  invoice$ = store.pipe(
    selectActiveEntity(),
    filter((product) => !!product)
  );
  constructor(private invoiceService: InvoiceService) {}
  getAll(): Observable<IInvoice[]> {
    return this.invoiceService.getAll().pipe(
      tap((products) => {
        const productMappingId = products.map((product) => ({
          ...product,
          id: product._id,
        }));
        store.update(setEntities(productMappingId));
      })
    );
  }

  getById(id: string): Observable<IInvoice> {
    return this.invoiceService.getById(id).pipe(
      tap((post) => {
        store.update(setEntities([post]));
        store.update(setActiveId(post.id));
      })
    );
  }

  create(payload: IInvoiceDto) {
    return this.invoiceService.create(payload);
  }
}
