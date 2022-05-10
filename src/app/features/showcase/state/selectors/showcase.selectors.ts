import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ShowcaseState } from "../interfaces/showcase-state";
import { WarehouseSelectors } from "../../../../core/modules/state/warehouse-state/selectors/warehouse.selectors";
import { WarehouseProduct } from "../../../../core/modules/state/warehouse-state/interfaces/warehouse-product";
import { ShowcaseSortConfig } from "../interfaces/showcase-sort-config";
import { ShowcaseFiltersConfig } from "../interfaces/showcase-filters-config";
import { PriceRange } from "../../../../core/interfaces/price-range";
import { FavouritesSelectors } from "../../../../core/modules/state/favourites-state/selectors/favourites.selectors";
import { ShowcaseProduct } from "../interfaces/showcase-product";

export namespace ShowcaseSelectors {

  export const FEATURE_KEY = "showcase";

  export const selectShowcaseFeature = createFeatureSelector<ShowcaseState>(FEATURE_KEY);

  export const selectChunkSize = createSelector(selectShowcaseFeature, (state: ShowcaseState) => state.chunkSize);
  export const selectTotVisibleChunks = createSelector(selectShowcaseFeature, (state: ShowcaseState) => state.totVisibleChunks);
  export const selectSortConfig = createSelector(selectShowcaseFeature, (state: ShowcaseState) => state.sortConfig);
  export const selectFiltersConfig = createSelector(selectShowcaseFeature, (state: ShowcaseState) => state.filtersConfig);

  export const selectFilteredProducts = createSelector(
    selectShowcaseFeature,
    WarehouseSelectors.selectProducts,
    (state: ShowcaseState, warehouseProducts: WarehouseProduct[]) => {
      const { sortConfig, filtersConfig } = state;
      let products = [...warehouseProducts];
      if (!!filtersConfig) {
        products = getProductsFiltered(products, filtersConfig);
      }
      if (!!sortConfig) {
        products = getProductsSorted(products, sortConfig);
      }
      return products;
    });

  export const selectTotProductsToShow = createSelector(
    selectFilteredProducts,
    (filteredProducts: WarehouseProduct[]) => filteredProducts.length
  );

  export const selectProducts = createSelector(
    selectShowcaseFeature,
    selectFilteredProducts,
    FavouritesSelectors.selectProductsIds,
    (state: ShowcaseState, filteredProducts: WarehouseProduct[], favouritesProductsIds) => {
      const { chunkSize, totVisibleChunks } = state;
      const products = filteredProducts.slice(0, chunkSize * totVisibleChunks);
      return products.map(product => {
        const isFavourite = favouritesProductsIds.includes(product.id);
        return { ...product, isFavourite };
      });
    });

  export const selectProduct = (productId: number) => createSelector(
    selectProducts,
    (products: ShowcaseProduct[]) => products.find(product => product.id === productId)
  );

  const getProductsSorted = (products: WarehouseProduct[], sortConfig: ShowcaseSortConfig) => {
    products.sort((a, b) => {
      const isAsc = sortConfig.direction === "asc";
      const field = sortConfig.field;
      let aVal: string | number = a[field];
      let bVal: string | number = b[field];
      if (field === "price") {
        aVal = +aVal;
        bVal = +bVal;
      }
      if (aVal > bVal) {
        return isAsc ? 1 : -1;
      }
      if (aVal < bVal) {
        return isAsc ? -1 : 1;
      }
      return 0;
    });
    return products;
  };

  const getProductsFiltered = (products: WarehouseProduct[], filtersConfig: ShowcaseFiltersConfig) => {
    return products
      .filter(product => {
        return (Object.keys(filtersConfig) as (keyof ShowcaseFiltersConfig)[])
          .every((key) => {
            if (key === "price") {
              const priceRange = filtersConfig[key] as PriceRange;
              let result = true;
              if (priceRange.min != null) {
                result = result && +product.price >= priceRange.min;
              }
              if (priceRange.max != null) {
                result = result && +product.price <= priceRange.max;
              }
              return result;
            }
            const filterValue = filtersConfig[key] as string;
            return product[key].toLowerCase().includes(filterValue.toLowerCase());
          });
      });
  };

}
