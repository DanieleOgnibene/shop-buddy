import { createReducer, on } from '@ngrx/store';
import { WarehouseState } from '../interfaces/warehouse-state';
import { WarehouseActions } from '../actions/warehouse.actions';
import { WarehouseProduct } from '../interfaces/warehouse-product';
import { WarehouseProductsDictionary } from '../interfaces/warehouse-products-dictionary';

export const warehouseInitialState: WarehouseState = {
  products: [],
  productsDictionary: {},
  isLoading: false,
  isError: false,
  errorMessage: null
};

export const warehouseReducer = createReducer(
  warehouseInitialState,
  on(WarehouseActions.loadProducts, (state) => ({ ...state, isLoading: true, isError: false, errorMessage: null })),
  on(
    WarehouseActions.loadProductsSuccess,
    WarehouseActions.loadProductsFailure,
    (state) => ({ ...state, isLoading: false })
  ),
  on(
    WarehouseActions.loadProductsSuccess,
    (state, { payload }) => {
      const products: WarehouseProduct[] = [];
      const productsDictionary: WarehouseProductsDictionary = {};
      payload.forEach((product, index) => {
        const warehouseProduct: WarehouseProduct = { ...product, id: index };
        products.push(warehouseProduct);
        productsDictionary[warehouseProduct.id] = warehouseProduct;
      });
      return { ...state, products, productsDictionary };
    }
  ),
  on(WarehouseActions.loadProductsFailure, (state, { payload }) => ({ ...state, isError: true, errorMessage: payload }))
);
