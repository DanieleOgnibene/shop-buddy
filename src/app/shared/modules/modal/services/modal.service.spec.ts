import { TestBed } from "@angular/core/testing";
import { ModalService } from "./modal.service";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalBase } from "../models/modal-base";
import { ModalModule } from "../modal.module";

@Component({
  selector: "app-mock-modal-content-component",
  template: "<div></div>"
})
class MockModalContentComponent extends ModalBase {
  @Input() testProperty: string | null = null;

  @Output() close = new EventEmitter<void>();
}

describe("ModalService", () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockModalContentComponent
      ],
      imports: [
        ModalModule
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ModalService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it("should create modal", () => {
    const modalComponentBefore = document.querySelector("app-modal");
    expect(modalComponentBefore).toBeFalsy();

    service.createModal({ componentType: MockModalContentComponent });

    const modalComponentAfter = document.querySelector("app-modal");
    expect(modalComponentAfter).toBeTruthy();
  });

  it("should close all modal on destroy", () => {
    service.createModal({ componentType: MockModalContentComponent });

    const modalComponentBefore = document.querySelector("app-modal");
    expect(modalComponentBefore).toBeTruthy();

    service.ngOnDestroy();

    const modalComponentAfter = document.querySelector("app-modal");
    expect(modalComponentAfter).toBeFalsy();
  });

  describe("when using close", () => {

    it("should close modal and return 'true' if correct modalId", () => {
      const { modalId } = service.createModal({ componentType: MockModalContentComponent });

      const modalComponentBefore = document.querySelector("app-modal");
      expect(modalComponentBefore).toBeTruthy();

      const isClosed = service.closeModal(modalId);

      expect(isClosed).toBeTruthy();
      const modalComponentAfter = document.querySelector("app-modal");
      expect(modalComponentAfter).toBeFalsy();
    });

    it("should return 'false' if no modals are opened", () => {
      const isClosed = service.closeModal(1);
      expect(isClosed).toBeFalsy();
    });

    it("should return 'false' if unrecognized modalId", () => {
      const { modalId } = service.createModal({ componentType: MockModalContentComponent });

      const modalComponentBefore = document.querySelector("app-modal");
      expect(modalComponentBefore).toBeTruthy();

      const isClosed = service.closeModal(modalId + 1);

      expect(isClosed).toBeFalsy();
    });

  });
});
