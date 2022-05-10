import { showcaseInitialState, showcaseReducer } from "./showcase.reducer";
import { Action } from "@ngrx/store";
import { ShowcaseActions } from "../actions/showcase.actions";

describe("ShowcaseReducer", () => {
  const initialState = showcaseInitialState;

  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action: Action = { type: "Unknown" };

      const result = showcaseReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("loadMoreProducts action", () => {
    it("should add 1 to tot visible chunks", () => {
      const actions = ShowcaseActions.loadMoreProducts();

      const result = showcaseReducer(initialState, actions);

      expect(result.totVisibleChunks).toBe(initialState.totVisibleChunks + 1);
    });
  });

  describe("filterProducts action", () => {
    const actions = ShowcaseActions.filterProducts({ title: "test" });

    it("should reset tot visible chunks", () => {
      const result = showcaseReducer(initialState, actions);

      expect(result.totVisibleChunks).toBe(1);
    });

    it("should set the filtersConfig", () => {
      const result = showcaseReducer(initialState, actions);

      expect(result.filtersConfig).toEqual({ title: "test" });
    });
  });

  describe("sortProducts action", () => {
    const actions = ShowcaseActions.sortProducts({ field: "title", direction: "asc" });

    it("should reset tot visible chunks", () => {
      const result = showcaseReducer(initialState, actions);

      expect(result.totVisibleChunks).toBe(1);
    });

    it("should set the sortConfig", () => {
      const result = showcaseReducer(initialState, actions);

      expect(result.sortConfig).toEqual({ field: "title", direction: "asc" });
    });
  });
});
