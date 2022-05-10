import { createAction } from "@ngrx/store";
import { ShowcaseSortConfig } from "../interfaces/showcase-sort-config";
import { ShowcaseFiltersConfig } from "../interfaces/showcase-filters-config";

export namespace ShowcaseActions {

  export const loadMoreProducts = createAction("[Showcase] Load More Products");
  export const sortProducts = createAction("[Showcase] Sort Items", (sortConfig: ShowcaseSortConfig | null) => ({ payload: sortConfig }));
  export const filterProducts = createAction(
    "[Showcase] Filter Products",
    (filtersConfig: ShowcaseFiltersConfig | null) => ({ payload: filtersConfig })
  );

}
