import { createStore, withProps } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { IProduct } from '../../models/product.model';
import { ICart } from '../../models/cart.model';
const STORE_NAME = 'cart';

export const store = createStore(
  { name: STORE_NAME },
  withProps<ICart>({
    product: [],
  }),
  withActiveId()
);
