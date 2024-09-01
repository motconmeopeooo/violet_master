import { Injectable } from '@angular/core';
import { HttpService } from '../http';
import { IInvoice, IInvoiceDto } from '../../models/invoice.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export const API_INVOICE = `${environment.apiUrl}/api/invoice`;

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpService) {}

  getAll(): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(`${API_INVOICE}`);
  }

  getById(id: string): Observable<IInvoice> {
    return this.http.get<IInvoice>(`${API_INVOICE}/${id}`);
  }

  create(payload: IInvoiceDto) {
    return this.http.post(`${API_INVOICE}`, payload);
  }
}
