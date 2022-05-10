import { APP_INITIALIZER, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { environment } from "../../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";
import { ApiModule } from "./modules/api/api.module";
import { StateModule } from "./modules/state/state.module";
import { WarehouseState } from "./modules/state/warehouse-state/interfaces/warehouse-state";
import { WarehouseActions } from "./modules/state/warehouse-state/actions/warehouse.actions";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { FavouritesModalComponent } from "./components/favourites-modal/favourites-modal.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    FavouritesModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    ApiModule,
    StateModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<WarehouseState>) => {
        return () => {
          store.dispatch(WarehouseActions.loadProducts());
        };
      },
      multi: true,
      deps: [Store]
    }
  ]
})
export class CoreModule {}
