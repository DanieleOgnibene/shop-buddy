import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModalComponent } from "./modal.component";
import { ModalInsertDirective } from "../../directives/modal-insert.directive";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalBase } from "../../models/modal-base";
import { ModalConfig } from "../../models/modal-config";
import { queryByDataTest } from "../../../../../../test-utils/query-functions";
import { By } from "@angular/platform-browser";

@Component({
  selector: "app-mock-modal-content-component",
  template: "<div></div>"
})
class MockModalContentComponent extends ModalBase {
  @Input() testProperty: string | null = null;

  @Output() close = new EventEmitter<void>();
}

describe("ModalComponent", () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  const childComponentInput: ModalConfig<MockModalContentComponent>["input"] = {
    testProperty: "test"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ModalComponent,
        ModalInsertDirective
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.childComponentType = MockModalContentComponent;
    component.childComponentInput = childComponentInput;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a modal bg", () => {
    const modalBg = queryByDataTest(fixture, "modal-bg");

    expect(modalBg).toBeTruthy();
  });

  it("should emit close event when modal bg is clicked", () => {
    const modalBg = queryByDataTest(fixture, "modal-bg");
    const closeEmitSpy = spyOn(component.close, "emit");

    modalBg.triggerEventHandler("click", null);

    expect(closeEmitSpy).toHaveBeenCalled();
  });

  it("should render correct child component type", () => {
    const mockModalComponent = fixture.debugElement.query(By.directive(MockModalContentComponent));

    expect(mockModalComponent).toBeTruthy();
  });

  it("should initialize child component with correct input", () => {
    const mockModalComponent = fixture.debugElement.query(By.directive(MockModalContentComponent));
    const mockModalComponentInstance: MockModalContentComponent = mockModalComponent.componentInstance;

    expect(mockModalComponentInstance.testProperty).toBe(childComponentInput.testProperty as string);
  });

  it("should remove child component when child component emit close event", () => {
    const mockModalComponent = fixture.debugElement.query(By.directive(MockModalContentComponent));
    const mockModalComponentInstance: MockModalContentComponent = mockModalComponent.componentInstance;

    mockModalComponentInstance.close.emit();
    fixture.detectChanges();

    const mockModalComponentAfter = fixture.debugElement.query(By.directive(MockModalContentComponent));
    expect(mockModalComponentAfter).toBeFalsy();
  });

  describe("when a key is pressed", () => {

    it("should emit close event if 'Enter' is pressed", () => {
      const closeEmitSpy = spyOn(component.close, "emit");

      component.handleKeyboardEvent(new KeyboardEvent("keypress", { key: "Escape" }));
      fixture.detectChanges();

      expect(closeEmitSpy).toHaveBeenCalled();
    });

    it("should remove child component if 'Enter' is pressed", () => {
      const mockModalComponent = fixture.debugElement.query(By.directive(MockModalContentComponent));
      expect(mockModalComponent).toBeTruthy();

      component.handleKeyboardEvent(new KeyboardEvent("keypress", { key: "Escape" }));
      fixture.detectChanges();

      const mockModalComponentAfter = fixture.debugElement.query(By.directive(MockModalContentComponent));
      expect(mockModalComponentAfter).toBeFalsy();
    });

    it("should not do anything if other key is pressed", () => {
      const closeEmitSpy = spyOn(component.close, "emit");

      const mockModalComponentBefore = fixture.debugElement.query(By.directive(MockModalContentComponent));
      expect(mockModalComponentBefore).toBeTruthy();

      component.handleKeyboardEvent(new KeyboardEvent("keypress", { key: "ArrowDown" }));
      fixture.detectChanges();

      const mockModalComponentAfter = fixture.debugElement.query(By.directive(MockModalContentComponent));
      expect(mockModalComponentAfter).toBeTruthy();
      expect(closeEmitSpy).not.toHaveBeenCalled();
    });

  });
});
