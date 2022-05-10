import { WarehouseProduct } from './warehouse-product';
import { WarehouseProductsDictionary } from './warehouse-products-dictionary';

export interface WarehouseState {
  products: WarehouseProduct[];
  productsDictionary: WarehouseProductsDictionary;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}
