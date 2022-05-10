import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomButtonComponent } from "./custom-button.component";
import { queryByDataTest } from "../../../../test-utils/query-functions";

describe("CustomButtonComponent", () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render the button", () => {
    const buttonContainer = queryByDataTest(fixture, "button");

    expect(buttonContainer).toBeTruthy();
  });

  it("should render the button text", () => {
    component.text = "Test";
    fixture.detectChanges();
    const buttonText = queryByDataTest(fixture, "button-text");

    expect(buttonText).toBeTruthy();
    expect(buttonText.nativeElement.textContent).toBe("Test");
  });

  it("should not render the button text if no text is provided", () => {
    const buttonText = queryByDataTest(fixture, "button-text");

    component.text = "";
    fixture.detectChanges();

    expect(buttonText).toBeFalsy();
  });

  it("should have the 'disabled' class if the button is disabled", () => {
    const buttonContainerElement = queryByDataTest(fixture, "button")?.nativeElement;

    component.disabled = true;
    fixture.detectChanges();

    expect(buttonContainerElement.classList.contains("disabled")).toBeTruthy();
  });

  describe("when the button is clicked", () => {
    it("should emit the click event", () => {
      const button = queryByDataTest(fixture, "button");
      const buttonClickEmitSpy = spyOn(component.buttonClick, "emit");

      button.triggerEventHandler("click", null);

      expect(buttonClickEmitSpy).toHaveBeenCalled();
    });

    it("should not emit the click event if the button is disabled", () => {
      const button = queryByDataTest(fixture, "button");
      const buttonClickEmitSpy = spyOn(component.buttonClick, "emit");

      component.disabled = true;
      fixture.detectChanges();
      button.triggerEventHandler("click", null);

      expect(buttonClickEmitSpy).not.toHaveBeenCalled();
    });
  });
});
