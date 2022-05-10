import { warehouseInitialState, warehouseReducer } from "./warehouse.reducer";
import { Action } from "@ngrx/store";
import { WarehouseActions } from "../actions/warehouse.actions";
import { WarehouseProduct } from "../interfaces/warehouse-product";
import { WarehouseProductsDictionary } from "../interfaces/warehouse-products-dictionary";

describe("WarehouseReducer", () => {
  const initialState = warehouseInitialState;

  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action: Action = { type: "Unknown" };

      const result = warehouseReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("loadProducts action", () => {
    const action = WarehouseActions.loadProducts();

    it("should set loading to true", () => {
      const result = warehouseReducer(initialState, action);

      expect(result.isLoading).toBeTrue();
    });

    it("should reset isError and errorMessage", () => {
      const modifiedState = { ...initialState, isError: true, errorMessage: "error" };

      const result = warehouseReducer(modifiedState, action);

      expect(result.isError).toBeFalse();
      expect(result.errorMessage).toBeNull();
    });
  });

  describe("loadProductsSuccess action", () => {
    const newProducts: WarehouseProduct[] = [
      {
        email: "First email",
        title: "First title",
        price: "1",
        image: "First image",
        description: "First description",
        id: 0
      }
    ];
    const action = WarehouseActions.loadProductsSuccess(newProducts);

    it("should set loading to false", () => {
      const modifiedState = { ...initialState, isLoading: true };

      const result = warehouseReducer(modifiedState, action);

      expect(result.isLoading).toBeFalse();
    });

    it("should set products", () => {
      const result = warehouseReducer(initialState, action);

      expect(result.products).toEqual(newProducts);
    });

    it("should set productsDictionary", () => {
      const result = warehouseReducer(initialState, action);

      const expectedDictionary: WarehouseProductsDictionary = { 0: newProducts[0] };
      expect(result.productsDictionary).toEqual(expectedDictionary);
    });

  });

  describe("loadProductsFailure action", () => {
    const action = WarehouseActions.loadProductsFailure("error");

    it("should set loading to false", () => {
      const modifiedState = { ...initialState, isLoading: true };

      const result = warehouseReducer(modifiedState, action);

      expect(result.isLoading).toBeFalse();
    });

    it("should set isError to true", () => {
      const result = warehouseReducer(initialState, action);

      expect(result.isError).toBeTrue();
    });

    it("should set errorMessage", () => {
      const result = warehouseReducer(initialState, action);

      expect(result.errorMessage).toBe("error");
    });
  });

});
