import { FavouritesSelectors } from "./favourites.selectors";
import { generateInitialAppState, IMockAppState } from "../../../../../../test-utils/initial-app-state";
import { WarehouseSelectors } from "../../warehouse-state/selectors/warehouse.selectors";
import { WarehouseProduct } from "../../warehouse-state/interfaces/warehouse-product";
import { WarehouseProductsDictionary } from "../../warehouse-state/interfaces/warehouse-products-dictionary";

describe("FavouritesSelectors", () => {
  let initialState: IMockAppState;

  beforeEach(() => {
    initialState = generateInitialAppState();
  });

  it("should select favourites state feature", () => {
    const result = FavouritesSelectors.selectFavouritesFeature(initialState);
    expect(result).toEqual(initialState[FavouritesSelectors.FEATURE_KEY]);
  });

  it("should select products ids", () => {
    const result = FavouritesSelectors.selectProductsIds(initialState);
    expect(result).toEqual(initialState[FavouritesSelectors.FEATURE_KEY].productsIds);
  });

  it("should select filters config", () => {
    const result = FavouritesSelectors.selectFiltersConfig(initialState);
    expect(result).toEqual(initialState[FavouritesSelectors.FEATURE_KEY].filtersConfig);
  });

  describe("products to show", () => {
    let products: WarehouseProduct[];
    let state: IMockAppState;

    beforeEach(() => {
      products = [
        {
          email: "First email",
          title: "First title",
          price: "1",
          image: "First image",
          description: "First description",
          id: 0
        },
        {
          email: "Second email",
          title: "Second title",
          price: "10",
          image: "Second image",
          description: "Second description",
          id: 1
        },
        {
          email: "Third email",
          title: "Third title",
          price: "20",
          image: "Third image",
          description: "Third description",
          id: 2
        }
      ];
      state = { ...initialState };
      state[WarehouseSelectors.FEATURE_KEY].products = products;
      state[WarehouseSelectors.FEATURE_KEY].productsDictionary = products
        .reduce((dict, product) => {
          dict[product.id] = product;
          return dict;
        }, {} as WarehouseProductsDictionary);
      state[FavouritesSelectors.FEATURE_KEY].productsIds = [0, 2];
    });

    it("should select all products if not filters are applied", () => {
      const result = FavouritesSelectors.selectProductsToShow.projector(
        state[FavouritesSelectors.FEATURE_KEY],
        state[WarehouseSelectors.FEATURE_KEY].productsDictionary
      );
      expect(result).toEqual([products[0], products[2]]);
    });

    it("should select products filtered by title", () => {
      state[FavouritesSelectors.FEATURE_KEY].filtersConfig = { title: "third" };
      const result = FavouritesSelectors.selectProductsToShow.projector(
        state[FavouritesSelectors.FEATURE_KEY],
        state[WarehouseSelectors.FEATURE_KEY].productsDictionary
      );
      expect(result).toEqual([products[2]]);
    });

  });
});
