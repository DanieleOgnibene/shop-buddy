import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { ModalBase } from "../../../shared/modules/modal/models/modal-base";
import { Store } from "@ngrx/store";
import { FavouritesState } from "../../modules/state/favourites-state/interfaces/favourites-state";
import { Observable, Subject } from "rxjs";
import { WarehouseProduct } from "../../modules/state/warehouse-state/interfaces/warehouse-product";
import { FavouritesSelectors } from "../../modules/state/favourites-state/selectors/favourites.selectors";
import { FavouritesActions } from "../../modules/state/favourites-state/actions/favourites.actions";
import { FormControl } from "@angular/forms";
import { debounceTime, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-favourites-modal",
  templateUrl: "./favourites-modal.component.html",
  styleUrls: ["./favourites-modal.component.scss"]
})
export class FavouritesModalComponent extends ModalBase implements OnInit, OnDestroy {

  @Output() close = new EventEmitter<void>();

  searchFormControl = new FormControl("");
  favourites$: Observable<WarehouseProduct[]>;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly store: Store<FavouritesState>
  ) {
    super();
    this.favourites$ = this.store.select(FavouritesSelectors.selectProductsToShow);
  }

  ngOnInit() {
    this.observeTitleSearch();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onRemoveFavourite(product: WarehouseProduct): void {
    this.store.dispatch(FavouritesActions.removeProduct(product));
  }

  trackByFn(index: number, item: WarehouseProduct): number {
    return item.id;
  }

  private observeTitleSearch(): void {
    this.searchFormControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(300)
      )
      .subscribe(title => {
        this.store.dispatch(FavouritesActions.filterProducts({ title }));
      });
  }

}
