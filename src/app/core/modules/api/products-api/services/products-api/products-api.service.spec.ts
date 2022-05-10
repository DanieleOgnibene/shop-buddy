import { TestBed } from "@angular/core/testing";
import { ProductsApiService } from "./products-api.service";
import { ProductsUrlsService } from "../products-urls/products-urls.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Product } from "../../interfaces/product";
import { isEqual } from "lodash";

describe("ProductsApiService", () => {
  let service: ProductsApiService;
  let httpController: HttpTestingController;
  let productsUrlsService: ProductsUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsApiService,
        ProductsUrlsService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductsApiService);
    httpController = TestBed.inject(HttpTestingController);
    productsUrlsService = TestBed.inject(ProductsUrlsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get products", () => {
    const products: Product[] = [
      {
        email: "email",
        title: "name",
        price: "1",
        description: "description",
        image: "image"
      }
    ];
    service.getProducts$().subscribe(data => {
      expect(isEqual(data, products)).toBeTrue();
    });

    const request = httpController.expectOne(
      {
        url: productsUrlsService.productsUrl,
        method: "GET"
      },
      "GET products"
    );

    request.flush({ items: products });
  });
});
