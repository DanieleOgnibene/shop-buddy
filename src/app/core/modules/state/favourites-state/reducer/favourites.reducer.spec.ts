import { Action } from "@ngrx/store";
import { favouritesInitialState, favouritesReducer } from "./favourites.reducer";
import { FavouritesActions } from "../actions/favourites.actions";
import { WarehouseProduct } from "../../warehouse-state/interfaces/warehouse-product";
import { FavouritesFiltersConfig } from "../interfaces/favourites-filters-config";

describe("FavouritesReducer", () => {
  const initialState = favouritesInitialState;
  const newProduct: WarehouseProduct = {
    email: "email",
    title: "title",
    description: "description",
    price: "1",
    image: "image",
    id: 1
  };

  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action: Action = { type: "Unknown" };

      const newState = favouritesReducer(initialState, action);

      expect(newState).toBe(initialState);
    });
  });

  describe("addProduct action", () => {
    const action = FavouritesActions.addProduct(newProduct);

    it("should add product to favourites", () => {
      const newState = favouritesReducer(initialState, action);

      expect(newState.productsIds.includes(newProduct.id)).toBeTrue();
    });

    it("should not add product to favourites if it already exists", () => {
      const newState = favouritesReducer(initialState, action);
      const newState2 = favouritesReducer(newState, action);

      expect(newState).toEqual(newState2);
    });
  });

  describe("removeProduct action", () => {

    it("should remove product from favourites", () => {
      const addProductAction = FavouritesActions.addProduct(newProduct);
      const removeProductAction = FavouritesActions.removeProduct(newProduct);

      const newStateWithAddedProduct = favouritesReducer(initialState, addProductAction);
      const newStateWithRemovedProduct = favouritesReducer(newStateWithAddedProduct, removeProductAction);

      expect(newStateWithAddedProduct.productsIds.includes(newProduct.id)).toBeTrue();
      expect(newStateWithRemovedProduct.productsIds.includes(newProduct.id)).toBeFalse();
    });

    it("should not remove product from favourites if it doesn't exist", () => {
      const removeProductAction = FavouritesActions.removeProduct(newProduct);

      const newState = favouritesReducer(initialState, removeProductAction);

      expect(newState).toEqual(initialState);
    });

  });

  describe("filterProducts action", () => {

    it("should update filter config", () => {
      const filterConfig: FavouritesFiltersConfig = { title: "test" };
      const action = FavouritesActions.filterProducts(filterConfig);

      const newState = favouritesReducer(initialState, action);

      expect(newState.filtersConfig).toEqual(filterConfig);
    });
  });

});
