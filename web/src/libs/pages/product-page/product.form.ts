import { FormControl } from '@angular/forms';

export interface IProductForm {
  name: FormControl<string>;
  id: FormControl<string>;
  size: FormControl<string>;
  quantity: FormControl<number>;
  price: FormControl<number>;
  image: FormControl<string>;
}
