import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalBase } from "../../../../shared/modules/modal/models/modal-base";
import { ShowcaseProduct } from "../../state/interfaces/showcase-product";
import { Store } from "@ngrx/store";
import { ShowcaseState } from "../../state/interfaces/showcase-state";
import { FavouritesActions } from "../../../../core/modules/state/favourites-state/actions/favourites.actions";
import { Observable } from "rxjs";
import { ShowcaseSelectors } from "../../state/selectors/showcase.selectors";

@Component({
  selector: "app-showcase-product-details-modal",
  templateUrl: "./showcase-product-details-modal.component.html",
  styleUrls: ["./showcase-product-details-modal.component.scss"]
})
export class ShowcaseProductDetailsModalComponent extends ModalBase {

  @Input()
  set productId(newProductId: number) {
    this.product$ = this.store.select(ShowcaseSelectors.selectProduct(newProductId));
  }

  @Output() close = new EventEmitter<void>();

  product$!: Observable<ShowcaseProduct | undefined>;

  constructor(
    private readonly store: Store<ShowcaseState>
  ) {
    super();
  }

  onToggleFavouritesClick(product: ShowcaseProduct): void {
    if (product.isFavourite) {
      this.store.dispatch(FavouritesActions.removeProduct(product));
      return;
    }
    this.store.dispatch(FavouritesActions.addProduct(product));
  }

}
