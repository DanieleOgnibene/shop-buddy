import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FavouritesButtonComponent } from "./favourites-button.component";
import { CustomButtonComponent } from "../custom-button/custom-button.component";
import { InteractiveHeartComponent } from "../interactive-heart/interactive-heart.component";
import { queryByDataTest } from "../../../../test-utils/query-functions";

describe("FavouritesButtonComponent", () => {
  let component: FavouritesButtonComponent;
  let fixture: ComponentFixture<FavouritesButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FavouritesButtonComponent,
        CustomButtonComponent,
        InteractiveHeartComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a custom button", () => {
    const customButton = queryByDataTest(fixture, "custom-button");

    expect(customButton).toBeTruthy();
  });

  it("should render an interactive heart", () => {
    const interactiveHeart = queryByDataTest(fixture, "interactive-heart");

    expect(interactiveHeart).toBeTruthy();
  });

  it("should render a custom button with the correct text", () => {
    component.text = "Test";
    const customButtonElement = queryByDataTest(fixture, "custom-button")?.nativeElement;
    fixture.detectChanges();

    expect(customButtonElement.textContent).toBe("Test");
  });

  it("should emit button click event when button is clicked", () => {
    const customButton = queryByDataTest(fixture, "custom-button");
    const buttonClickEmitSpy = spyOn(component.buttonClick, "emit");

    customButton.triggerEventHandler("buttonClick", null);
    fixture.detectChanges();

    expect(buttonClickEmitSpy).toHaveBeenCalled();
  });

  it("should render an interactive heart with the correct state", () => {
    const isFavourite = true;
    const tooltipFull = "Test full";
    const tooltipEmpty = "Test empty";
    component.isFavourite = isFavourite;
    component.tooltipFull = tooltipFull;
    component.tooltipEmpty = tooltipEmpty;
    fixture.detectChanges();

    const interactiveHeart: InteractiveHeartComponent = queryByDataTest(fixture, "interactive-heart")?.componentInstance;

    expect(interactiveHeart.isFull).toBe(isFavourite);
    expect(interactiveHeart.tooltipFull).toBe(tooltipFull);
    expect(interactiveHeart.tooltipEmpty).toBe(tooltipEmpty);
  });
});
