import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InteractiveHeartComponent } from "./interactive-heart.component";
import { queryByDataTest } from "../../../../test-utils/query-functions";

describe("InteractiveHeartComponent", () => {
  let component: InteractiveHeartComponent;
  let fixture: ComponentFixture<InteractiveHeartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InteractiveHeartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render heart container", () => {
    const heartContainer = queryByDataTest(fixture, "heart-container");

    expect(heartContainer).toBeTruthy();
  });

  describe("when isFull is true", () => {
    beforeEach(() => {
      component.isFull = true;
      fixture.detectChanges();
    });

    it("should render full heart", () => {
      const fullHeart = queryByDataTest(fixture, "full-heart");

      expect(fullHeart).toBeTruthy();
    });

    it("should render full heart with correct title", () => {
      component.tooltipFull = "Full heart";
      fixture.detectChanges();

      const fullHeartElement: HTMLElement = queryByDataTest(fixture, "full-heart")?.nativeElement;
      expect(fullHeartElement.title).toBe("Full heart");
    });
  });

  describe("when isFull is false", () => {
    beforeEach(() => {
      component.isFull = false;
      fixture.detectChanges();
    });

    it("should render empty heart", () => {
      const emptyHeart = queryByDataTest(fixture, "empty-heart");

      expect(emptyHeart).toBeTruthy();
    });

    it("should render empty heart with correct title", () => {
      component.tooltipEmpty = "Empty heart";
      fixture.detectChanges();

      const emptyHeartElement: HTMLElement = queryByDataTest(fixture, "empty-heart")?.nativeElement;
      expect(emptyHeartElement.title).toBe("Empty heart");
    });
  });
});
