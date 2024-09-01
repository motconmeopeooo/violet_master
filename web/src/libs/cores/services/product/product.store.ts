import { createStore, withProps } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { IProduct } from '../../models/product.model';
const STORE_NAME = 'product';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<IProduct>(),
  withActiveId()
);
