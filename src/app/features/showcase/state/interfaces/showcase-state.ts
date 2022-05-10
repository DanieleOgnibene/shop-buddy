import { ShowcaseSortConfig } from './showcase-sort-config';
import { ShowcaseFiltersConfig } from './showcase-filters-config';

export interface ShowcaseState {
  chunkSize: number;
  totVisibleChunks: number;
  sortConfig: ShowcaseSortConfig | null;
  filtersConfig: ShowcaseFiltersConfig | null;
}
