import { Component } from "@angular/core";
import {
  ShowcaseProductSearchModalComponent
} from "../showcase-product-search-modal/showcase-product-search-modal.component";
import { ModalService } from "../../../../shared/modules/modal/services/modal.service";
import { Store } from "@ngrx/store";
import { ShowcaseState } from "../../state/interfaces/showcase-state";
import { ShowcaseSortConfig } from "../../state/interfaces/showcase-sort-config";
import { Observable } from "rxjs";
import { ShowcaseSelectors } from "../../state/selectors/showcase.selectors";
import { ShowcaseActions } from "../../state/actions/showcase.actions";

@Component({
  selector: "app-showcase-products-filters",
  templateUrl: "./showcase-products-filters.component.html",
  styleUrls: ["./showcase-products-filters.component.scss"],
  providers: [ModalService]
})
export class ShowcaseProductsFiltersComponent {

  sortConfig$: Observable<ShowcaseSortConfig | null>;

  constructor(
    private readonly modalService: ModalService,
    private readonly store: Store<ShowcaseState>
  ) {
    this.sortConfig$ = this.store.select(ShowcaseSelectors.selectSortConfig);
  }

  onSearchClick(): void {
    this.modalService.createModal({ componentType: ShowcaseProductSearchModalComponent });
  }

  onSortChange(sortField: string): void {
    this.store.dispatch(ShowcaseActions.sortProducts({
      field: sortField as ShowcaseSortConfig["field"],
      direction: "asc"
    }));
  }
}
