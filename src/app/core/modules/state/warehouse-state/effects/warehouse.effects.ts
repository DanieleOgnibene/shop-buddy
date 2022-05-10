import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { ProductsApiService } from "../../../api/products-api/services/products-api/products-api.service";
import { WarehouseActions } from "../actions/warehouse.actions";

@Injectable()
export class WarehouseEffects {

  loadProducts$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(WarehouseActions.loadProducts),
        switchMap(() => this.productsApiService.getProducts$()),
        map(products => WarehouseActions.loadProductsSuccess(products)),
        catchError((error) => of(WarehouseActions.loadProductsFailure(error.message || "Encountered error during products loading")))
      );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly productsApiService: ProductsApiService
  ) {}

}
