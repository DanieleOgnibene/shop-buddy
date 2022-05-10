import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShowcaseRoutingModule } from "./showcase-routing.module";
import { ShowcaseContainerComponent } from "./components/showcase-container/showcase-container.component";
import { StoreModule } from "@ngrx/store";
import { ShowcaseSelectors } from "./state/selectors/showcase.selectors";
import { showcaseReducer } from "./state/reducer/showcase.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ShowcaseProductComponent } from "./components/showcase-product/showcase-product.component";
import { SharedModule } from "../../shared/shared.module";
import {
  ShowcaseProductDetailsModalComponent
} from "./components/showcase-product-details-modal/showcase-product-details-modal.component";
import {
  ShowcaseProductsFiltersComponent
} from "./components/showcase-products-filters/showcase-products-filters.component";
import {
  ShowcaseProductSearchModalComponent
} from "./components/showcase-product-search-modal/showcase-product-search-modal.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ShowcaseContainerComponent,
    ShowcaseProductComponent,
    ShowcaseProductDetailsModalComponent,
    ShowcaseProductsFiltersComponent,
    ShowcaseProductSearchModalComponent
  ],
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    StoreModule.forFeature(ShowcaseSelectors.FEATURE_KEY, showcaseReducer),
    EffectsModule.forFeature([]),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ShowcaseModule {}
