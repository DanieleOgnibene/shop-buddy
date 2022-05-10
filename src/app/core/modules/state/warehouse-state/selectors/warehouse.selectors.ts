import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WarehouseState } from '../interfaces/warehouse-state';

export namespace WarehouseSelectors {

  export const FEATURE_KEY = 'warehouse';

  export const selectWarehouseFeature = createFeatureSelector<WarehouseState>(FEATURE_KEY);

  export const selectProducts = createSelector(selectWarehouseFeature, (state: WarehouseState) => state.products);
  export const selectProductsDictionary = createSelector(selectWarehouseFeature, (state: WarehouseState) => state.productsDictionary);

  export const selectIsLoading = createSelector(selectWarehouseFeature, (state: WarehouseState) => state.isLoading);
  export const selectIsError = createSelector(selectWarehouseFeature, (state: WarehouseState) => state.isError);
  export const selectErrorMessage = createSelector(selectWarehouseFeature, (state: WarehouseState) => state.errorMessage);

}
