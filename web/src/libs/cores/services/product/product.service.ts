import { Injectable } from '@angular/core';
import { HttpService } from '../http';
import { IBaseParams, IProduct } from '../../models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export const API_PRODUCT = `${environment.apiUrl}/api/product`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpService) {}

  getAll(params?: IBaseParams): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${API_PRODUCT}`, { params });
  }

  getRandom(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${API_PRODUCT}/random`);
  }

  getById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${API_PRODUCT}/${id}`);
  }
}
