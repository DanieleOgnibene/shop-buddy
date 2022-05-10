import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShowcaseContainerComponent } from "./showcase-container.component";
import { provideMockStore } from "@ngrx/store/testing";
import { ShowcaseSelectors } from "../../state/selectors/showcase.selectors";
import { ShowcaseProductsFiltersComponent } from "../showcase-products-filters/showcase-products-filters.component";
import { ShowcaseProductComponent } from "../showcase-product/showcase-product.component";
import { SharedModule } from "../../../../shared/shared.module";
import { queryAllByDataTest, queryByDataTest } from "../../../../../test-utils/query-functions";
import { of } from "rxjs";
import { ShowcaseProduct } from "../../state/interfaces/showcase-product";
import { FavouritesActions } from "../../../../core/modules/state/favourites-state/actions/favourites.actions";
import { ShowcaseActions } from "../../state/actions/showcase.actions";

describe("ShowcaseContainerComponent", () => {
  const showcaseProducts: ShowcaseProduct[] = new Array(5)
    .fill(null)
    .map((_, index) => {
      return {
        id: index,
        title: `Product ${index}`,
        description: `Product ${index} description`,
        price: index.toString(),
        image: `Product ${index} image`,
        isFavourite: [false, true][Math.floor(Math.random() * 2)],
        email: `Product ${index} email`
      };
    });
  let component: ShowcaseContainerComponent;
  let fixture: ComponentFixture<ShowcaseContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ShowcaseContainerComponent,
        ShowcaseProductsFiltersComponent,
        ShowcaseProductComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: ShowcaseSelectors.selectProducts, value: showcaseProducts },
            { selector: ShowcaseSelectors.selectTotProductsToShow, value: showcaseProducts.length * 10 },
            { selector: ShowcaseSelectors.selectSortConfig, value: null }
          ]
        })
      ],
      imports: [
        SharedModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render products-filters", () => {
    const productsFilters = queryByDataTest(fixture, "products-filters");

    expect(productsFilters).toBeTruthy();
  });

  describe("when there are no products", () => {
    beforeEach(() => {
      component.products$ = of([]);
      fixture.detectChanges();
    });

    it("should render no-products-message", () => {
      const noProducts = queryByDataTest(fixture, "no-products-message");

      expect(noProducts).toBeTruthy();
    });

    it("should not render any products", () => {
      const products = queryAllByDataTest(fixture, "product");

      expect(products.length).toBe(0);
    });
  });

  describe("when there are products", () => {

    it("should render products", () => {
      const products = queryAllByDataTest(fixture, "product");

      expect(products.length).toBe(showcaseProducts.length);
    });

    it("should render products with correct data", () => {
      const products = queryAllByDataTest(fixture, "product");

      showcaseProducts.forEach((showcaseProduct, index) => {
        const productComponent: ShowcaseProductComponent = products[index].componentInstance;
        const providedProduct: ShowcaseProduct = productComponent.product;

        expect(providedProduct.price).toBe(showcaseProduct.price);
        expect(providedProduct.title).toBe(showcaseProduct.title);
        expect(providedProduct.image).toBe(showcaseProduct.image);
        expect(providedProduct.email).toBe(showcaseProduct.email);
        expect(providedProduct.id).toBe(showcaseProduct.id);
        expect(providedProduct.isFavourite).toBe(showcaseProduct.isFavourite);
        expect(providedProduct.description).toBe(showcaseProduct.description);
      });
    });

    it("should not render no-products-message", () => {
      const noProducts = queryByDataTest(fixture, "no-products-message");

      expect(noProducts).toBeFalsy();
    });

    it("should remove/add product from favourites after heart click", () => {
      const products = queryAllByDataTest(fixture, "product");
      const storeDispatchSpy = spyOn(component["store"], "dispatch");


      products.forEach(product => {
        const providedProduct = (product.componentInstance as ShowcaseProductComponent).product;
        product.triggerEventHandler("heartClick", null);

        if (providedProduct.isFavourite) {
          expect(storeDispatchSpy).toHaveBeenCalledWith(FavouritesActions.removeProduct(providedProduct));
          return;
        }
        expect(storeDispatchSpy).toHaveBeenCalledWith(FavouritesActions.addProduct(providedProduct));
      });
    });
  });
});
