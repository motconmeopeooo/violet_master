export interface ICart {
  product: IProductCart[];
}
export interface IProductCart {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  image: string | undefined;
  size: string | undefined;
  quantity: number | undefined;
}
