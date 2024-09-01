import { Observable, filter, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './product.store';
import { ProductService } from './product.service';
import { IBaseParams, IProduct } from '../../models/product.model';
import {
  selectActiveEntity,
  selectAllEntities,
  setActiveId,
  setEntities,
} from '@ngneat/elf-entities';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  products$ = store.pipe(selectAllEntities());
  product$ = store.pipe(
    selectActiveEntity(),
    filter((product) => !!product)
  );
  constructor(private productService: ProductService) {}
  getAll(params?: IBaseParams): Observable<IProduct[]> {
    return this.productService.getAll(params).pipe(
      tap((products) => {
        const productMappingId = products.map((product) => ({
          ...product,
          id: product._id,
        }));
        store.update(setEntities(productMappingId));
      })
    );
  }

  getRandom(): Observable<IProduct[]> {
    return this.productService.getRandom().pipe(
      tap((products) => {
        const productMappingId = products.map((product) => ({
          ...product,
          id: product._id,
        }));
        store.update(setEntities(productMappingId));
      })
    );
  }

  getById(id: string): Observable<IProduct> {
    return this.productService.getById(id).pipe(
      tap((post) => {
        store.update(setEntities([post]));
        store.update(setActiveId(post.id));
      })
    );
  }
}
