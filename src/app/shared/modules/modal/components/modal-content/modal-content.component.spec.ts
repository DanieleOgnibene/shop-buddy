import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalContentComponent } from "./modal-content.component";
import { queryByDataTest } from "../../../../../../test-utils/query-functions";

describe("ModalContentComponent", () => {
  let component: ModalContentComponent;
  let fixture: ComponentFixture<ModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalContentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render modal title", () => {
    const modalTitle = queryByDataTest(fixture, "modal-title");
    const modalTitleElement: HTMLElement = modalTitle?.nativeElement;

    component.modalTitle = "Modal title";
    fixture.detectChanges();

    expect(modalTitle).toBeTruthy();
    expect(modalTitleElement.textContent).toBe("Modal title");
  });

  it("should render close button", () => {
    const closeButton = queryByDataTest(fixture, "close-button");

    expect(closeButton).toBeTruthy();
  });

  it("should emit close event when close button is clicked", () => {
    const closeButton = queryByDataTest(fixture, "close-button");
    const closeButtonElement: HTMLElement = closeButton?.nativeElement;
    const closeEventSpy = spyOn(component.close, "emit");

    closeButtonElement.click();
    fixture.detectChanges();

    expect(closeEventSpy).toHaveBeenCalled();
  });
});
