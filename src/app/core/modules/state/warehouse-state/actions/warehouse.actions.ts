import { createAction } from '@ngrx/store';
import { Product } from '../../../api/products-api/interfaces/product';

export namespace WarehouseActions {

  export const loadProducts = createAction('[Warehouse] Load Products');
  export const loadProductsSuccess = createAction('[Warehouse] Load Products Success', (products: Product[]) => ({ payload: products }));
  export const loadProductsFailure = createAction('[Warehouse] Load Products Failure', (error: string) => ({ payload: error }));

}
