import { createReducer, on } from "@ngrx/store";

import { ShowcaseState } from "../interfaces/showcase-state";
import { ShowcaseActions } from "../actions/showcase.actions";

export const showcaseInitialState: ShowcaseState = {
  chunkSize: 5,
  totVisibleChunks: 1,
  sortConfig: null,
  filtersConfig: null
};

export const showcaseReducer = createReducer(
  showcaseInitialState,
  on(ShowcaseActions.loadMoreProducts, state => ({ ...state, totVisibleChunks: state.totVisibleChunks + 1 })),
  on(ShowcaseActions.filterProducts, ShowcaseActions.sortProducts, state => ({ ...state, totVisibleChunks: 1 })),
  on(ShowcaseActions.filterProducts, (state, { payload }) => ({ ...state, filtersConfig: payload })),
  on(ShowcaseActions.sortProducts, (state, { payload }) => ({ ...state, sortConfig: payload }))
);
