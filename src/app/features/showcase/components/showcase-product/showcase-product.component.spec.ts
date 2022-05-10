import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShowcaseProductComponent } from "./showcase-product.component";
import { SharedModule } from "../../../../shared/shared.module";
import { ShowcaseProduct } from "../../state/interfaces/showcase-product";
import { queryByDataTest } from "../../../../../test-utils/query-functions";
import {
  ShowcaseProductDetailsModalComponent
} from "../showcase-product-details-modal/showcase-product-details-modal.component";
import { FavouritesButtonComponent } from "../../../../shared/components/favourites-button/favourites-button.component";

describe("ShowcaseProductComponent", () => {
  let component: ShowcaseProductComponent;
  let fixture: ComponentFixture<ShowcaseProductComponent>;
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
      declarations: [ShowcaseProductComponent],
      imports: [
        SharedModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseProductComponent);
    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render product title", () => {
    const title: HTMLElement = queryByDataTest(fixture, "product-title")?.nativeElement;

    expect(title.textContent).toBe(product.title);
  });

  it("should render product email", () => {
    const email: HTMLElement = queryByDataTest(fixture, "product-email")?.nativeElement;

    expect(email.textContent).toBe(product.email);
  });

  it("should render product price", () => {
    const price: HTMLElement = queryByDataTest(fixture, "product-price")?.nativeElement;

    expect(price.textContent).toBe((+product.price).toFixed(2) + " €");
  });

  it("should render product image", () => {
    const image = queryByDataTest(fixture, "product-image");

    expect(image).toBeTruthy();
  });

  it("should render favourite button", () => {
    const button = queryByDataTest(fixture, "favourite-button");

    expect(button).toBeTruthy();
  });

  it("should render view product details button", () => {
    const button = queryByDataTest(fixture, "view-product-details-button");

    expect(button).toBeTruthy();
  });

  it("should correctly bind isFavourite favourite button property", () => {
    const favouriteButtonComponent: FavouritesButtonComponent = queryByDataTest(fixture, "favourite-button").componentInstance;

    expect(favouriteButtonComponent.isFavourite).toBe(product.isFavourite);
  });

  it("should emit heartClick event when favourite button is clicked", () => {
    const favouriteButton = queryByDataTest(fixture, "favourite-button");
    spyOn(component.heartClick, "emit");

    favouriteButton.triggerEventHandler("buttonClick", null);

    expect(component.heartClick.emit).toHaveBeenCalled();
  });

  it("should open product details on view product details button click", () => {
    const button = queryByDataTest(fixture, "view-product-details-button");
    const modalServiceCreateModalSpy = spyOn(component["modalService"], "createModal");

    button?.triggerEventHandler("buttonClick", null);

    expect(modalServiceCreateModalSpy).toHaveBeenCalledWith({
      componentType: ShowcaseProductDetailsModalComponent,
      input: { productId: product.id } as any
    });
  });

});
