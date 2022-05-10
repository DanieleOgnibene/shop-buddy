import { ShowcaseSelectors } from "./showcase.selectors";
import { generateInitialAppState, IMockAppState } from "../../../../../test-utils/initial-app-state";
import { WarehouseProduct } from "../../../../core/modules/state/warehouse-state/interfaces/warehouse-product";
import { showcaseInitialState } from "../reducer/showcase.reducer";
import { ShowcaseFiltersConfig } from "../interfaces/showcase-filters-config";
import { ShowcaseSortConfig } from "../interfaces/showcase-sort-config";
import { ShowcaseState } from "../interfaces/showcase-state";
import { ShowcaseProduct } from "../interfaces/showcase-product";

describe("ShowcaseSelectors", () => {
  let initialState: IMockAppState;
  let warehouseProducts: WarehouseProduct[];

  beforeEach(() => {
    initialState = generateInitialAppState();
    warehouseProducts = [
      {
        email: "Email 1",
        title: "Title 1",
        price: "10",
        image: "Image 1",
        description: "Description 1",
        id: 1
      },
      {
        email: "Email 0",
        title: "Title 0",
        price: "1",
        image: "Image 0",
        description: "Description 0",
        id: 0
      },
      {
        email: "Email 0",
        title: "Title 0",
        price: "1",
        image: "Image 0",
        description: "Description 0",
        id: 3
      },
      {
        email: "Email 2",
        title: "Title 2",
        price: "20",
        image: "Image 2",
        description: "Description 2",
        id: 2
      }
    ];
  });

  it("should select showcase feature state", () => {
    const result = ShowcaseSelectors.selectShowcaseFeature(initialState);
    expect(result).toEqual(initialState[ShowcaseSelectors.FEATURE_KEY]);
  });

  it("should select chunk size", () => {
    const result = ShowcaseSelectors.selectChunkSize(initialState);
    expect(result).toEqual(initialState[ShowcaseSelectors.FEATURE_KEY].chunkSize);
  });

  it("should select tot visible chunks", () => {
    const result = ShowcaseSelectors.selectTotVisibleChunks(initialState);
    expect(result).toEqual(initialState[ShowcaseSelectors.FEATURE_KEY].totVisibleChunks);
  });

  it("should select sort config", () => {
    const result = ShowcaseSelectors.selectSortConfig(initialState);
    expect(result).toEqual(initialState[ShowcaseSelectors.FEATURE_KEY].sortConfig);
  });

  it("should select filters config", () => {
    const result = ShowcaseSelectors.selectFiltersConfig(initialState);
    expect(result).toEqual(initialState[ShowcaseSelectors.FEATURE_KEY].filtersConfig);
  });

  describe("select filtered products", () => {

    it("should return all products if no filters are set", () => {
      const result = ShowcaseSelectors.selectFilteredProducts.projector(showcaseInitialState, warehouseProducts);
      expect(result).toEqual(warehouseProducts);
    });

    it("should return filtered products if filters are set", () => {
      const firstFiltersConfig: ShowcaseFiltersConfig = { title: "1" };
      const secondFiltersConfig: ShowcaseFiltersConfig = { price: { min: 10, max: 20 } };
      const thirdFiltersConfig: ShowcaseFiltersConfig = { price: { min: 10 } };
      const forthFiltersConfig: ShowcaseFiltersConfig = { price: { max: 1 } };

      const firstResult = ShowcaseSelectors.selectFilteredProducts.projector(
        { ...showcaseInitialState, filtersConfig: firstFiltersConfig },
        warehouseProducts
      );
      const secondResult = ShowcaseSelectors.selectFilteredProducts.projector(
        { ...showcaseInitialState, filtersConfig: secondFiltersConfig },
        warehouseProducts
      );
      const thirdResult = ShowcaseSelectors.selectFilteredProducts.projector(
        { ...showcaseInitialState, filtersConfig: thirdFiltersConfig },
        warehouseProducts
      );
      const forthResult = ShowcaseSelectors.selectFilteredProducts.projector(
        { ...showcaseInitialState, filtersConfig: forthFiltersConfig },
        warehouseProducts
      );

      expect(firstResult).toEqual([warehouseProducts[0]]);
      expect(secondResult).toEqual([warehouseProducts[0], warehouseProducts[3]]);
      expect(thirdResult).toEqual([warehouseProducts[0], warehouseProducts[3]]);
      expect(forthResult).toEqual([warehouseProducts[1], warehouseProducts[2]]);
    });

    it("should return ordered products if sort config is set", () => {
      const firstSortConfig: ShowcaseSortConfig = { field: "title", direction: "asc" };
      const secondSortConfig: ShowcaseSortConfig = { field: "title", direction: "desc" };
      const thirdSortConfig: ShowcaseSortConfig = { field: "price", direction: "desc" };

      const firstResult = ShowcaseSelectors.selectFilteredProducts.projector(
        { ...showcaseInitialState, sortConfig: firstSortConfig },
        warehouseProducts
      );
      const secondResult = ShowcaseSelectors.selectFilteredProducts.projector(
        { ...showcaseInitialState, sortConfig: secondSortConfig },
        warehouseProducts
      );
      const thirdResult = ShowcaseSelectors.selectFilteredProducts.projector(
        { ...showcaseInitialState, sortConfig: thirdSortConfig },
        warehouseProducts
      );

      expect(firstResult).toEqual([warehouseProducts[1], warehouseProducts[2], warehouseProducts[0], warehouseProducts[3]]);
      expect(secondResult).toEqual([warehouseProducts[3], warehouseProducts[0], warehouseProducts[1], warehouseProducts[2]]);
      expect(thirdResult).toEqual([warehouseProducts[3], warehouseProducts[0], warehouseProducts[1], warehouseProducts[2]]);
    });
  });

  it("should select tot products to show", () => {
    const result = ShowcaseSelectors.selectTotProductsToShow.projector(warehouseProducts);
    expect(result).toEqual(4);
  });

  it("should select products", () => {
    const showcaseState: ShowcaseState = { ...showcaseInitialState, totVisibleChunks: 2, chunkSize: 1 };

    const result = ShowcaseSelectors.selectProducts.projector(showcaseState, warehouseProducts, [warehouseProducts[1].id]);

    const expectedResult: ShowcaseProduct[] = [
      {
        ...warehouseProducts[0],
        isFavourite: false
      },
      {
        ...warehouseProducts[1],
        isFavourite: true
      }
    ];
    expect(result).toEqual(expectedResult);
  });

  it("should select product", () => {
    const showcaseProducts = warehouseProducts.map(product => ({ ...product, isFavourite: false }));

    const result = ShowcaseSelectors.selectProduct(showcaseProducts[3].id).projector(showcaseProducts);

    const expectedResult = showcaseProducts[3];
    expect(result).toEqual(expectedResult);
  });
});
