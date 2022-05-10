import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { FavouritesModalComponent } from "./favourites-modal.component";
import { provideMockStore } from "@ngrx/store/testing";
import { FavouritesSelectors } from "../../modules/state/favourites-state/selectors/favourites.selectors";
import { ModalContentComponent } from "../../../shared/modules/modal/components/modal-content/modal-content.component";
import { SharedModule } from "../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";
import { queryAllByDataTest, queryByDataTest } from "../../../../test-utils/query-functions";
import { FavouritesActions } from "../../modules/state/favourites-state/actions/favourites.actions";

describe("FavouritesModalComponent", () => {
  let component: FavouritesModalComponent;
  let fixture: ComponentFixture<FavouritesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FavouritesModalComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: FavouritesSelectors.selectProductsToShow, value: [] }
          ]
        })
      ],
      imports: [
        SharedModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should close modal on close button click", () => {
    const closeEmitSpy = spyOn(component.close, "emit");

    queryByDataTest(fixture, "modal-container").triggerEventHandler("close", null);

    expect(closeEmitSpy).toHaveBeenCalled();
  });

  it("should render 'My Favourites' as modal title", () => {
    const appModalContentComponent: ModalContentComponent = queryByDataTest(fixture, "modal-container").componentInstance;

    expect(appModalContentComponent.modalTitle).toEqual("My Favourites");
  });

  describe("search favourites", () => {
    it("should have a search input", () => {
      const searchInput = queryByDataTest(fixture, "search-input");

      expect(searchInput).toBeTruthy();
    });

    it("should update search form control on input", () => {
      const searchInputElement = queryByDataTest(fixture, "search-input");

      searchInputElement.triggerEventHandler("input", { target: { value: "test" } });

      expect(component.searchFormControl.value).toEqual("test");
    });

    it("should filter favourites on search input change", fakeAsync(() => {
      const searchInputElement = queryByDataTest(fixture, "search-input");
      const storeDispatchSpy = spyOn(component["store"], "dispatch");

      searchInputElement.triggerEventHandler("input", { target: { value: "test" } });
      tick(300);

      expect(storeDispatchSpy).toHaveBeenCalledWith(FavouritesActions.filterProducts({ title: "test" }));
    }));
  });

  describe("visibility of no-favourites message", () => {
    it("should be visible when there are no favourites", () => {
      fixture.componentInstance.favourites$ = of([]);

      fixture.detectChanges();

      const message = queryByDataTest(fixture, "no-favourites-message");
      expect(message).toBeTruthy();
    });

    it("should be hidden when there are favourites", () => {
      fixture.componentInstance.favourites$ = of([
        {
          price: "0.00",
          title: "test",
          image: "test",
          email: "test",
          id: 0,
          description: "test"
        }
      ]);

      fixture.detectChanges();

      const message = queryByDataTest(fixture, "no-favourites-message");
      expect(message).toBeFalsy();
    });
  });

  describe("visibility and interactions with favourites", () => {
    const favourites = [
      {
        price: "0.00",
        title: "test title",
        image: "test image",
        email: "test email",
        id: 0,
        description: "test description"
      }
    ];

    beforeEach(() => {
      fixture.componentInstance.favourites$ = of(favourites);
      fixture.detectChanges();
    });

    it("should be visible when there are favourites", () => {
      const elements = queryAllByDataTest(fixture, "favourite");

      expect(elements.length).toBe(1);
    });

    it("should have favourite-title", () => {
      const title: HTMLElement = queryByDataTest(fixture, "favourite-title").nativeElement;

      expect(title.innerHTML).toEqual("test title");
      expect(title).toBeTruthy();
    });

    it("should have favourite-image", () => {
      const element = queryByDataTest(fixture, "favourite-image");

      expect(element).toBeTruthy();
    });

    it("should have a remove favourite button", () => {
      const removeFavouriteButton = queryByDataTest(fixture, "remove-favourite-button");

      expect(removeFavouriteButton).toBeTruthy();
    });

    it("should remove favourite on remove favourite button click", () => {
      const removeFavouriteButton = queryAllByDataTest(fixture, "remove-favourite-button")[0];
      const storeDispatchSpy = spyOn(component["store"], "dispatch");

      removeFavouriteButton.triggerEventHandler("buttonClick", null);

      expect(storeDispatchSpy).toHaveBeenCalledWith(FavouritesActions.removeProduct(favourites[0]));
    });
  });
});
