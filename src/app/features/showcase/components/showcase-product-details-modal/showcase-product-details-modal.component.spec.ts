import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShowcaseProductDetailsModalComponent } from "./showcase-product-details-modal.component";
import { provideMockStore } from "@ngrx/store/testing";
import { ShowcaseSelectors } from "../../state/selectors/showcase.selectors";
import { ShowcaseProduct } from "../../state/interfaces/showcase-product";
import { SharedModule } from "../../../../shared/shared.module";
import { queryByDataTest } from "../../../../../test-utils/query-functions";
import {
  ModalContentComponent
} from "../../../../shared/modules/modal/components/modal-content/modal-content.component";
import { FavouritesButtonComponent } from "../../../../shared/components/favourites-button/favourites-button.component";
import { FavouritesActions } from "../../../../core/modules/state/favourites-state/actions/favourites.actions";
import { of } from "rxjs";

describe("ShowcaseProductDetailsModalComponent", () => {
  let component: ShowcaseProductDetailsModalComponent;
  let fixture: ComponentFixture<ShowcaseProductDetailsModalComponent>;
  const product: ShowcaseProduct = {
    description: "description",
    email: "email",
    id: 0,
    image: "image",
    isFavourite: false,
    price: "1",
    title: "title"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowcaseProductDetailsModalComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: ShowcaseSelectors.selectProduct(product.id), value: product }
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
    fixture = TestBed.createComponent(ShowcaseProductDetailsModalComponent);
    component = fixture.componentInstance;
    component.productId = product.id;
    component.product$ = of(product);
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

  it("should render product title", () => {
    const appModalContentComponent: ModalContentComponent = queryByDataTest(fixture, "modal-container").componentInstance;

    expect(appModalContentComponent.modalTitle).toEqual(product.title);
  });

  it("should render product image", () => {
    const image = queryByDataTest(fixture, "product-image");

    expect(image).toBeTruthy();
  });

  it("should render product description", () => {
    const description = queryByDataTest(fixture, "product-description")?.nativeElement;

    expect(description.textContent).toBe(product.description);
  });

  it("should render product email", () => {
    const email = queryByDataTest(fixture, "product-email")?.nativeElement;

    expect(email.textContent).toBe(product.email);
  });

  it("should render favourite button", () => {
    const favouriteButton = queryByDataTest(fixture, "favourite-button");

    expect(favouriteButton).toBeTruthy();
  });

  it("should correctly bind isFavourite favourite button property", () => {
    const favouriteButtonComponent: FavouritesButtonComponent = queryByDataTest(fixture, "favourite-button").componentInstance;

    expect(favouriteButtonComponent.isFavourite).toBe(product.isFavourite);
  });

  it("should add product from favourites after favourite button click", () => {
    const favouriteButton = queryByDataTest(fixture, "favourite-button");
    const storeDispatchSpy = spyOn(component["store"], "dispatch");

    product.isFavourite = false;
    fixture.detectChanges();
    favouriteButton.triggerEventHandler("buttonClick", null);

    expect(storeDispatchSpy).toHaveBeenCalledWith(FavouritesActions.addProduct(product));
  });

  it("should remove product from favourites after favourite button click", () => {
    const favouriteButton = queryByDataTest(fixture, "favourite-button");
    const storeDispatchSpy = spyOn(component["store"], "dispatch");

    product.isFavourite = true;
    fixture.detectChanges();
    favouriteButton.triggerEventHandler("buttonClick", null);

    expect(storeDispatchSpy).toHaveBeenCalledWith(FavouritesActions.removeProduct(product));
  });
});
