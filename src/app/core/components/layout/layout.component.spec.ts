import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LayoutComponent } from "./layout.component";
import { queryByDataTest } from "../../../../test-utils/query-functions";
import { SharedModule } from "../../../shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FavouritesButtonComponent } from "../../../shared/components/favourites-button/favourites-button.component";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        FooterComponent,
        HeaderComponent,
        FavouritesButtonComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have an header", () => {
    const header = queryByDataTest(fixture, "header");

    expect(header).toBeTruthy();
  });

  it("should have a footer", () => {
    const footer = queryByDataTest(fixture, "footer");

    expect(footer).toBeTruthy();
  });

  it("should have a router-outlet", () => {
    const routerOutlet = queryByDataTest(fixture, "router-outlet");

    expect(routerOutlet).toBeTruthy();
  });
});
