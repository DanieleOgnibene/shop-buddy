import { generateInitialAppState, IMockAppState } from "../../../../../../test-utils/initial-app-state";
import { WarehouseSelectors } from "./warehouse.selectors";
import FEATURE_KEY = WarehouseSelectors.FEATURE_KEY;

describe("WarehouseSelectors", () => {
  let initialState: IMockAppState;

  beforeEach(() => {
    initialState = generateInitialAppState();
  });

  it("should select warehouse feature state", () => {
    const result = WarehouseSelectors.selectWarehouseFeature(initialState);
    expect(result).toEqual(initialState[FEATURE_KEY]);
  });

  it("should select products", () => {
    const result = WarehouseSelectors.selectProducts.projector(initialState[FEATURE_KEY]);
    expect(result).toEqual(initialState[FEATURE_KEY].products);
  });

  it("should select products dictionary", () => {
    const result = WarehouseSelectors.selectProductsDictionary.projector(initialState[FEATURE_KEY]);
    expect(result).toEqual(initialState[FEATURE_KEY].productsDictionary);
  });

  it("should select isLoading", () => {
    const result = WarehouseSelectors.selectIsLoading.projector(initialState[FEATURE_KEY]);
    expect(result).toEqual(initialState[FEATURE_KEY].isLoading);
  });

  it("should select isError", () => {
    const result = WarehouseSelectors.selectIsError.projector(initialState[FEATURE_KEY]);
    expect(result).toEqual(initialState[FEATURE_KEY].isError);
  });

  it("should select error message", () => {
    const result = WarehouseSelectors.selectErrorMessage.projector(initialState[FEATURE_KEY]);
    expect(result).toEqual(initialState[FEATURE_KEY].errorMessage);
  });
});
