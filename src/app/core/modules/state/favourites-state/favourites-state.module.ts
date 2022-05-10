import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { favouritesReducer } from "./reducer/favourites.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FavouritesSelectors } from "./selectors/favourites.selectors";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FavouritesSelectors.FEATURE_KEY, favouritesReducer),
    EffectsModule.forFeature([])
  ]
})
export class FavouritesStateModule {}
