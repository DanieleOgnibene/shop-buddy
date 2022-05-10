import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';

@Injectable()
export class ProductsUrlsService {

  get productsUrl(): string {
    return environment.apiUrl + '/items.json';
  }

}
