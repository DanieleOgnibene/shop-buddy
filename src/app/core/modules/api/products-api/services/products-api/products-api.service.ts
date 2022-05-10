import { Injectable } from '@angular/core';
import { ProductsUrlsService } from '../products-urls/products-urls.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../interfaces/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductsApiService {

  constructor(
    private readonly productsUrlsService: ProductsUrlsService,
    private readonly httpClient: HttpClient
  ) {}

  getProducts$(): Observable<Product[]> {
    return this.httpClient
      .get<{ items: Product[] }>(this.productsUrlsService.productsUrl)
      .pipe(map(({ items }) => items));
  }

}
