import { TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { warehouseInitialState } from "../reducer/warehouse.reducer";
import { ProductsApiService } from "../../../api/products-api/services/products-api/products-api.service";
import { WarehouseEffects } from "./warehouse.effects";
import { cold, hot } from "jasmine-marbles";
import { WarehouseActions } from "../actions/warehouse.actions";

describe("WarehouseEffects", () => {
  let actions$ = new Observable<Action>();
  let effects: WarehouseEffects;
  let productsApiService: ProductsApiService;
  const products = [
    {
      title: "Product 1",
      description: "Product 1 description",
      price: "1",
      email: "Product 1 email",
      image: "Product 1 image"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductsApiService, useValue: { getProducts$: () => of([]) } },
        WarehouseEffects,
        provideMockStore({ initialState: warehouseInitialState }),
        provideMockActions(() => actions$)
      ]
    });
  });

  beforeEach(() => {
    effects = TestBed.inject(WarehouseEffects);
    productsApiService = TestBed.inject(ProductsApiService);
  });

  describe("loadProducts$", () => {

    beforeEach(() => {
      const action = WarehouseActions.loadProducts();
      actions$ = hot("-a", { a: action });
    });
    it("should return a loadProductsSuccess action", () => {
      const response = cold("-r", { r: products });
      spyOn(productsApiService, "getProducts$").and.returnValue(response);

      const expected = hot("--e", { e: WarehouseActions.loadProductsSuccess(products) });
      expect(effects.loadProducts$).toBeObservable(expected);
    });

    describe("when returns loadProductsFailure action", () => {

      it("should has as payload the error message if present", () => {
        const response = cold("-#", null, { message: "error" });
        spyOn(productsApiService, "getProducts$").and.returnValue(response);

        const expected = hot("--(e|)", { e: WarehouseActions.loadProductsFailure("error") });
        expect(effects.loadProducts$).toBeObservable(expected);
      });

      it("should has as payload 'Encountered error during products loading' if the error is not recognized", () => {
        const response = cold("-#", null, new Error());
        spyOn(productsApiService, "getProducts$").and.returnValue(response);

        const expected = hot("--(e|)", { e: WarehouseActions.loadProductsFailure("Encountered error during products loading") });
        expect(effects.loadProducts$).toBeObservable(expected);
      });

    });

  });

});
