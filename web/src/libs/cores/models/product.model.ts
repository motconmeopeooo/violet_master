export interface IProduct {
  id: string;
  _id: string;
  name: string;
  status: string;
  description: string;
  price: number;
  category: string;
  image: string;
  size: string[];
  color: string[];
}
export interface IBaseParams {
  search?: string;
  sort?: number;
  sortBy?: string;
  filter?: any;
}
