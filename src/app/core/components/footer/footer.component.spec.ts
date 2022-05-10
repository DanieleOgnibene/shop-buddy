import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FooterComponent } from "./footer.component";
import { queryByDataTest } from "../../../../test-utils/query-functions";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display copyright", () => {
    const copyright = queryByDataTest(fixture, "copyright");

    expect(copyright).toBeTruthy();
    expect(copyright.nativeElement.textContent).toBe("© ShopBuddy. All Rights Reserved");
  });
});
