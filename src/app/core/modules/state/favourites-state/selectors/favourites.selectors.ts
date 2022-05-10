import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FavouritesState } from "../interfaces/favourites-state";
import { WarehouseSelectors } from "../../warehouse-state/selectors/warehouse.selectors";
import { WarehouseProductsDictionary } from "../../warehouse-state/interfaces/warehouse-products-dictionary";

export namespace FavouritesSelectors {

  export const FEATURE_KEY = "favourites";

  export const selectFavouritesFeature = createFeatureSelector<FavouritesState>(FEATURE_KEY);

  export const selectProductsIds = createSelector(selectFavouritesFeature, (state: FavouritesState) => state.productsIds);
  export const selectFiltersConfig = createSelector(selectFavouritesFeature, (state: FavouritesState) => state.filtersConfig);

  export const selectProductsToShow = createSelector(
    selectFavouritesFeature,
    WarehouseSelectors.selectProductsDictionary,
    ({ productsIds, filtersConfig }: FavouritesState, productsDictionary: WarehouseProductsDictionary) => {
      let products = productsIds.map(id => productsDictionary[id]);
      const titleFilter = filtersConfig?.title;
      if (!!titleFilter) {
        products = products.filter(product => product.title.toLowerCase().includes(titleFilter.toLowerCase()));
      }
      return products;
    }
  );

}
