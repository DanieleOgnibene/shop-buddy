import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Store } from "@ngrx/store";
import { ShowcaseState } from "../../state/interfaces/showcase-state";
import { Observable, Subject } from "rxjs";
import { FavouritesActions } from "../../../../core/modules/state/favourites-state/actions/favourites.actions";
import { ShowcaseProduct } from "../../state/interfaces/showcase-product";
import { ShowcaseSelectors } from "../../state/selectors/showcase.selectors";
import { ShowcaseActions } from "../../state/actions/showcase.actions";
import { concatLatestFrom } from "@ngrx/effects";

@Component({
  selector: "app-showcase-container",
  templateUrl: "./showcase-container.component.html",
  styleUrls: ["./showcase-container.component.scss"]
})
export class ShowcaseContainerComponent implements OnInit, OnDestroy {

  @ViewChildren("showcaseProducts")
  set showcaseProductsElements(elements: QueryList<ElementRef<HTMLDivElement>>) {
    this.productsElementsChange$.next(elements);
  }

  products$: Observable<ShowcaseProduct[]>;

  private productsIntersectionObserver!: IntersectionObserver | null;
  private unsubscribe$ = new Subject<void>();
  private productsElementsChange$ = new Subject<QueryList<ElementRef<HTMLDivElement>>>();

  constructor(
    private readonly store: Store<ShowcaseState>
  ) {
    this.products$ = this.store.select(ShowcaseSelectors.selectProducts);
  }

  ngOnInit(): void {
    this.observeProductsElementsChange();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.removeProductsIntersectionObserver();
  }

  onToggleFavourite(product: ShowcaseProduct): void {
    if (product.isFavourite) {
      this.store.dispatch(FavouritesActions.removeProduct(product));
      return;
    }
    this.store.dispatch(FavouritesActions.addProduct(product));
  }

  trackByFn(index: number, product: ShowcaseProduct): number {
    return product.id;
  }

  private observeProductsElementsChange(): void {
    this.productsElementsChange$
      .pipe(
        concatLatestFrom(() => this.store.select(ShowcaseSelectors.selectTotProductsToShow))
      )
      .subscribe(([productsElements, totProductsToShow]) => {
        this.removeProductsIntersectionObserver();
        if (productsElements.length < totProductsToShow) {
          this.createProductsIntersectionObserver(productsElements);
        }
      });
  }

  private createProductsIntersectionObserver(productsElements: QueryList<ElementRef<HTMLDivElement>>): void {
    const lastProductComponent = productsElements.last;
    if (!lastProductComponent) {
      return;
    }
    const intersectionObserverInit: IntersectionObserverInit = { threshold: 0.1 };
    const intersectionCallback: IntersectionObserverCallback = entries => {
      if (entries[0].isIntersecting) {
        this.store.dispatch(ShowcaseActions.loadMoreProducts());
        this.removeProductsIntersectionObserver();
      }
    };
    const newObserver = new IntersectionObserver(intersectionCallback, intersectionObserverInit);
    newObserver.observe(lastProductComponent.nativeElement);
    this.productsIntersectionObserver = newObserver;
  }

  private removeProductsIntersectionObserver(): void {
    if (this.productsIntersectionObserver) {
      this.productsIntersectionObserver.disconnect();
      this.productsIntersectionObserver = null;
    }
  }
}
