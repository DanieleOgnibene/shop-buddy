import { createReducer, on } from '@ngrx/store';
import { FavouritesState } from '../interfaces/favourites-state';
import { FavouritesActions } from '../actions/favourites.actions';

export const favouritesInitialState: FavouritesState = {
  productsIds: [],
  filtersConfig: null
};

export const favouritesReducer = createReducer(
  favouritesInitialState,
  on(FavouritesActions.addProduct, (state, { payload }) => {
    const newProductsIds = [...state.productsIds];
    if (!state.productsIds.includes(payload.id)) {
      newProductsIds.push(payload.id);
    }
    return { ...state, productsIds: newProductsIds };
  }),
  on(FavouritesActions.removeProduct, (state, { payload }) => {
    const newProductsIds = [...state.productsIds];
    const removeAtIndex = state.productsIds.indexOf(payload.id);
    if (removeAtIndex > -1) {
      newProductsIds.splice(removeAtIndex, 1);
    }
    return { ...state, productsIds: newProductsIds };
  }),
  on(FavouritesActions.filterProducts, (state, { payload }) => ({ ...state, filtersConfig: payload }))
);
