import { createAction } from '@ngrx/store';
import { WarehouseProduct } from '../../warehouse-state/interfaces/warehouse-product';
import { FavouritesFiltersConfig } from '../interfaces/favourites-filters-config';

export namespace FavouritesActions {

  export const addProduct = createAction('[Favourites] Add Product', (product: WarehouseProduct) => ({ payload: product }));
  export const removeProduct = createAction('[Favourites] Remove Product', (product: WarehouseProduct) => ({ payload: product }));
  export const filterProducts = createAction(
    '[Favourites] Filter Products',
    (filtersConfig: FavouritesFiltersConfig | null) => ({ payload: filtersConfig })
  );

}
