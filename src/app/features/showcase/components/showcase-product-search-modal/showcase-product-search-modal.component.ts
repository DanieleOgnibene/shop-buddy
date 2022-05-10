import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from "@angular/core";
import { ModalBase } from "../../../../shared/modules/modal/models/modal-base";
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ShowcaseState } from "../../state/interfaces/showcase-state";
import { ShowcaseActions } from "../../state/actions/showcase.actions";
import { Subject } from "rxjs";
import { ShowcaseSelectors } from "../../state/selectors/showcase.selectors";
import { takeUntil } from "rxjs/operators";
import { ShowcaseFiltersConfig } from "../../state/interfaces/showcase-filters-config";

@Component({
  selector: "app-showcase-product-search-modal",
  templateUrl: "./showcase-product-search-modal.component.html",
  styleUrls: ["./showcase-product-search-modal.component.scss"]
})
export class ShowcaseProductSearchModalComponent extends ModalBase implements OnInit, OnDestroy {

  @Output() close = new EventEmitter<void>();

  get isPriceFormGroupInvalid(): boolean {
    return this.searchFormGroup.controls.price.invalid;
  }

  searchFormGroup!: FormGroup;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly store: Store<ShowcaseState>
  ) {
    super();
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.applyFiltersConfig();
    }
  }

  ngOnInit() {
    this.observerFiltersConfigAndInitFormGroup();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onApplyClick(): void {
    this.applyFiltersConfig();
  }

  onResetClick(): void {
    this.store.dispatch(ShowcaseActions.filterProducts(null));
    this.close.emit();
  }

  private observerFiltersConfigAndInitFormGroup(): void {
    this.store.select(ShowcaseSelectors.selectFiltersConfig)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(filtersConfig => this.initSearchFormGroup(filtersConfig));
  }

  private initSearchFormGroup(filtersConfig: ShowcaseFiltersConfig | null): void {
    this.searchFormGroup = new FormGroup({
      title: new FormControl(filtersConfig?.title || ""),
      description: new FormControl(filtersConfig?.description || ""),
      price: new FormGroup({
        min: new FormControl(filtersConfig?.price?.min || null),
        max: new FormControl(filtersConfig?.price?.max || null)
      }, this.validatePriceFormGroup()),
      email: new FormControl(filtersConfig?.email || "")
    });
  }

  private validatePriceFormGroup(): ValidatorFn {
    return (formGroup): ValidationErrors | null => {
      const { min, max } = formGroup.value;
      return min && max && min > max ? { "min-max": true } : null;
    };
  }

  private applyFiltersConfig(): void {
    this.store.dispatch(ShowcaseActions.filterProducts(this.searchFormGroup.getRawValue()));
    this.close.emit();
  }

}
