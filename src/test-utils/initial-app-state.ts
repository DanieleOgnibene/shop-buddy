import { WarehouseSelectors } from "../app/core/modules/state/warehouse-state/selectors/warehouse.selectors";
import { WarehouseState } from "../app/core/modules/state/warehouse-state/interfaces/warehouse-state";
import { FavouritesSelectors } from "../app/core/modules/state/favourites-state/selectors/favourites.selectors";
import { FavouritesState } from "../app/core/modules/state/favourites-state/interfaces/favourites-state";
import { ShowcaseSelectors } from "../app/features/showcase/state/selectors/showcase.selectors";
import { ShowcaseState } from "../app/features/showcase/state/interfaces/showcase-state";

export interface IMockAppState {
  [WarehouseSelectors.FEATURE_KEY]: WarehouseState;
  [FavouritesSelectors.FEATURE_KEY]: FavouritesState;
  [ShowcaseSelectors.FEATURE_KEY]: ShowcaseState;
}

export const generateInitialAppState: () => IMockAppState = () => ({
  [WarehouseSelectors.FEATURE_KEY]: {
    products: [],
    productsDictionary: {},
    isLoading: false,
    isError: false,
    errorMessage: null
  },
  [FavouritesSelectors.FEATURE_KEY]: {
    productsIds: [],
    filtersConfig: null
  },
  [ShowcaseSelectors.FEATURE_KEY]: {
    chunkSize: 5,
    totVisibleChunks: 1,
    sortConfig: null,
    filtersConfig: null
  }
});
