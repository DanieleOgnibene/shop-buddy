import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { queryByDataTest } from "../../../../test-utils/query-functions";
import { FavouritesModalComponent } from "../favourites-modal/favourites-modal.component";
import { SharedModule } from "../../../shared/shared.module";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        SharedModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a logo", () => {
    const logo = queryByDataTest(fixture, "logo");

    expect(logo).toBeTruthy();
  });

  it("should have a favourites button", () => {
    const favouritesButton = queryByDataTest(fixture, "favourites-button");

    expect(favouritesButton).toBeTruthy();
  });

  it("should open favourites modal on favourites button click", () => {
    const favouritesButton = queryByDataTest(fixture, "favourites-button");
    const spyOnCreateModal = spyOn(component["modalService"], "createModal");

    favouritesButton.triggerEventHandler("buttonClick", null);

    expect(spyOnCreateModal).toHaveBeenCalledWith({ componentType: FavouritesModalComponent });
  });
});
