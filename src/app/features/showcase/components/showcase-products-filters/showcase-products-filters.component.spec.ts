import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShowcaseProductsFiltersComponent } from "./showcase-products-filters.component";
import { provideMockStore } from "@ngrx/store/testing";
import { ShowcaseSelectors } from "../../state/selectors/showcase.selectors";
import { SharedModule } from "../../../../shared/shared.module";
import { queryByDataTest } from "../../../../../test-utils/query-functions";
import {
  ShowcaseProductSearchModalComponent
} from "../showcase-product-search-modal/showcase-product-search-modal.component";
import { of } from "rxjs";
import { ShowcaseSortConfig } from "../../state/interfaces/showcase-sort-config";
import { ShowcaseActions } from "../../state/actions/showcase.actions";

describe("ShowcaseProductsFiltersComponent", () => {
  let component: ShowcaseProductsFiltersComponent;
  let fixture: ComponentFixture<ShowcaseProductsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowcaseProductsFiltersComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: ShowcaseSelectors.selectSortConfig, value: null }
          ]
        })
      ],
      imports: [
        SharedModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseProductsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a search button", () => {
    const searchButton = queryByDataTest(fixture, "search-button");

    expect(searchButton).toBeTruthy();
  });

  it("should open search modal on search button click", () => {
    const searchButton = queryByDataTest(fixture, "search-button");
    const modalServiceCreateModalSpy = spyOn(component["modalService"], "createModal");

    searchButton.triggerEventHandler("buttonClick", null);

    expect(modalServiceCreateModalSpy).toHaveBeenCalledWith({ componentType: ShowcaseProductSearchModalComponent });
  });

  describe("sort by select", () => {
    it("should render a select", () => {
      const sortBySelect = queryByDataTest(fixture, "sort-by-select");

      expect(sortBySelect).toBeTruthy();
    });

    it("should render a select with all options", () => {
      const titleOption = queryByDataTest(fixture, "title-option");
      const descriptionOption = queryByDataTest(fixture, "description-option");
      const emailOption = queryByDataTest(fixture, "email-option");
      const priceOption = queryByDataTest(fixture, "price-option");

      expect(titleOption).toBeTruthy();
      expect(descriptionOption).toBeTruthy();
      expect(emailOption).toBeTruthy();
      expect(priceOption).toBeTruthy();
    });

    it("should init select with current sort config", () => {
      const initialSortConfig: ShowcaseSortConfig = { field: "title", direction: "asc" };
      const sortBySelect: HTMLSelectElement = queryByDataTest(fixture, "sort-by-select")?.nativeElement;

      component.sortConfig$ = of(initialSortConfig);
      fixture.detectChanges();

      expect(sortBySelect.value).toBe(initialSortConfig.field);
    });

    it("should update sort config on select change", () => {
      const sortBySelect: HTMLSelectElement = queryByDataTest(fixture, "sort-by-select")?.nativeElement;
      const sortConfigUpdateSpy = spyOn(component["store"], "dispatch");

      sortBySelect.value = "description";
      sortBySelect.dispatchEvent(new Event("change"));

      expect(sortConfigUpdateSpy).toHaveBeenCalledWith(ShowcaseActions.sortProducts({
        field: "description",
        direction: "asc"
      }));
    });
  });
});
