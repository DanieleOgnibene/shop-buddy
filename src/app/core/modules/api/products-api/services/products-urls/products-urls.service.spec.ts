import { TestBed } from "@angular/core/testing";

import { ProductsUrlsService } from "./products-urls.service";

describe('ProductsUrlsService', () => {
  let service: ProductsUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsUrlsService]
    });
    service = TestBed.inject(ProductsUrlsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should provide 'productsUrl'", () => {
    const productsUrl = service.productsUrl;
    expect(productsUrl).toBeDefined();
  });
});
