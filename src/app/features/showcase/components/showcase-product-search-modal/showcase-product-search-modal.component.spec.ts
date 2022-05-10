import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShowcaseProductSearchModalComponent } from "./showcase-product-search-modal.component";
import { provideMockStore } from "@ngrx/store/testing";
import { ShowcaseSelectors } from "../../state/selectors/showcase.selectors";
import { SharedModule } from "../../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { queryByDataTest } from "../../../../../test-utils/query-functions";
import {
  ModalContentComponent
} from "../../../../shared/modules/modal/components/modal-content/modal-content.component";
import { ShowcaseActions } from "../../state/actions/showcase.actions";
import { CustomButtonComponent } from "../../../../shared/components/custom-button/custom-button.component";
import { isEqual } from "lodash";

describe("ShowcaseProductSearchModalComponent", () => {
  let component: ShowcaseProductSearchModalComponent;
  let fixture: ComponentFixture<ShowcaseProductSearchModalComponent>;
  const initialFiltersConfig = {
    email: "test email",
    title: "test title",
    description: "test description",
    price: {
      min: 10,
      max: 20
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowcaseProductSearchModalComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: ShowcaseSelectors.selectFiltersConfig, value: initialFiltersConfig }
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
    fixture = TestBed.createComponent(ShowcaseProductSearchModalComponent);
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

  it("should render 'Search' as modal title", () => {
    const appModalContentComponent: ModalContentComponent = queryByDataTest(fixture, "modal-container").componentInstance;

    expect(appModalContentComponent.modalTitle).toEqual("Search");
  });

  it("should have a title input", () => {
    const titleInput = queryByDataTest(fixture, "title-input");

    expect(titleInput).toBeTruthy();
  });

  it("should have an email input", () => {
    const emailInput = queryByDataTest(fixture, "email-input");

    expect(emailInput).toBeTruthy();
  });

  it("should have a min price input", () => {
    const minPriceInput = queryByDataTest(fixture, "min-price-input");

    expect(minPriceInput).toBeTruthy();
  });

  it("should have a max price input", () => {
    const maxPriceInput = queryByDataTest(fixture, "max-price-input");

    expect(maxPriceInput).toBeTruthy();
  });

  it("should have a description textarea", () => {
    const descriptionTextarea = queryByDataTest(fixture, "description-textarea");

    expect(descriptionTextarea).toBeTruthy();
  });

  it("should have a reset button", () => {
    const resetButton = queryByDataTest(fixture, "reset-button");

    expect(resetButton).toBeTruthy();
  });

  it("should have an apply search button", () => {
    const applySearchButton = queryByDataTest(fixture, "apply-button");

    expect(applySearchButton).toBeTruthy();
  });

  it("should init form group with current filters config", () => {
    expect(isEqual(component.searchFormGroup.getRawValue(), initialFiltersConfig)).toBeTruthy();
  });

  describe("when a key is pressed", () => {

    it("should emit close event if 'Enter' is pressed", () => {
      const closeEmitSpy = spyOn(component.close, "emit");

      component.handleKeyboardEvent(new KeyboardEvent("keypress", { key: "Enter" }));
      fixture.detectChanges();

      expect(closeEmitSpy).toHaveBeenCalled();
    });

    it("should apply filters if 'Enter' is pressed", () => {
      component.searchFormGroup.get("email")?.patchValue("email");
      const filtersToApply = component.searchFormGroup.getRawValue();
      const storeDispatchSpy = spyOn(component["store"], "dispatch");

      component.handleKeyboardEvent(new KeyboardEvent("keypress", { key: "Enter" }));
      fixture.detectChanges();

      expect(storeDispatchSpy).toHaveBeenCalledWith(ShowcaseActions.filterProducts(filtersToApply));
    });

    it("should not do anything if other key is pressed", () => {
      const storeDispatchSpy = spyOn(component["store"], "dispatch");
      const closeEmitSpy = spyOn(component.close, "emit");

      component.handleKeyboardEvent(new KeyboardEvent("keypress", { key: "ArrowDown" }));
      fixture.detectChanges();

      expect(storeDispatchSpy).not.toHaveBeenCalled();
      expect(closeEmitSpy).not.toHaveBeenCalled();
    });

  });

  describe("when price form is invalid", () => {

    beforeEach(() => {
      component.searchFormGroup.get("price")?.patchValue({ min: 10, max: 1 });
      fixture.detectChanges();
    });

    it("should the apply search button be disabled", () => {
      const applySearchButton: CustomButtonComponent = queryByDataTest(fixture, "apply-button")?.componentInstance;

      expect(applySearchButton.disabled).toBeTruthy();
    });

    it("should the price element has 'invalid' class", () => {
      const priceElement: HTMLElement = queryByDataTest(fixture, "price-form-group-element").nativeElement;

      expect(priceElement.classList.contains("invalid")).toBeTruthy();
    });

  });

  describe("when user inputs", () => {

    it("should update title form control on input", () => {
      const inputElement = queryByDataTest(fixture, "title-input");

      inputElement.triggerEventHandler("input", { target: { value: "test" } });

      expect(component.searchFormGroup.get("title")?.value).toEqual("test");
    });

    it("should update email form control on input", () => {
      const inputElement = queryByDataTest(fixture, "email-input");

      inputElement.triggerEventHandler("input", { target: { value: "test" } });

      expect(component.searchFormGroup.get("email")?.value).toEqual("test");
    });

    it("should update min price form control on input", () => {
      const inputElement = queryByDataTest(fixture, "min-price-input");

      inputElement.triggerEventHandler("input", { target: { value: 1 } });

      expect(component.searchFormGroup.get("price")?.get("min")?.value).toEqual(1);
    });

    it("should update max price form control on input", () => {
      const inputElement = queryByDataTest(fixture, "max-price-input");

      inputElement.triggerEventHandler("input", { target: { value: 1 } });

      expect(component.searchFormGroup.get("price")?.get("max")?.value).toEqual(1);
    });

    it("should update description form control on input", () => {
      const textareaElement = queryByDataTest(fixture, "description-textarea");

      textareaElement.triggerEventHandler("input", { target: { value: "test" } });

      expect(component.searchFormGroup.get("description")?.value).toEqual("test");
    });
  });

  describe("when reset button is clicked", () => {

    it("should reset filters", () => {
      const resetButton = queryByDataTest(fixture, "reset-button");
      const storeDispatchSpy = spyOn(component["store"], "dispatch");

      resetButton.triggerEventHandler("buttonClick", null);

      expect(storeDispatchSpy).toHaveBeenCalledWith(ShowcaseActions.filterProducts(null));
    });

    it("should emit close event", () => {
      const resetButton = queryByDataTest(fixture, "reset-button");
      const closeEmitSpy = spyOn(component.close, "emit");

      resetButton.triggerEventHandler("buttonClick", null);

      expect(closeEmitSpy).toHaveBeenCalled();
    });

  });

  describe("when apply search button is clicked", () => {

    it("should apply filters", () => {
      component.searchFormGroup.get("title")?.patchValue("title");
      const filtersToApply = component.searchFormGroup.getRawValue();
      const applySearchButton = queryByDataTest(fixture, "apply-button");
      const storeDispatchSpy = spyOn(component["store"], "dispatch");

      applySearchButton.triggerEventHandler("buttonClick", null);

      expect(storeDispatchSpy).toHaveBeenCalledWith(ShowcaseActions.filterProducts(filtersToApply));
    });

    it("should emit close event", () => {
      const applyButton = queryByDataTest(fixture, "apply-button");
      const closeEmitSpy = spyOn(component.close, "emit");

      applyButton.triggerEventHandler("buttonClick", null);

      expect(closeEmitSpy).toHaveBeenCalled();
    });

  });
});
