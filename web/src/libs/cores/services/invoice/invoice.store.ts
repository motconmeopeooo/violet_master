import { createStore, withProps } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { IInvoice } from '../../models/invoice.model';
const STORE_NAME = 'invoice';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<IInvoice>(),
  withActiveId()
);
