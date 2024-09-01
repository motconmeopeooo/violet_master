import { IProductCart } from './cart.model';

export interface IInvoice {
  id: string;
  _id: string;
  total: number;
  products: IProductCart[];
  createAt: string;
  status: string;
  address: string;
  phone: string;
}

export interface IInvoiceDto {
  total: number;
  phone: string;
  products: IProductCart[];
  address: string;
}
