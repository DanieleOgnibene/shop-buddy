import { FavouritesFiltersConfig } from './favourites-filters-config';

export interface FavouritesState {
  productsIds: number[];
  filtersConfig: FavouritesFiltersConfig | null;
}
