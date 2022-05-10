import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsApiService } from './services/products-api/products-api.service';
import { ProductsUrlsService } from './services/products-urls/products-urls.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ProductsApiService,
    ProductsUrlsService
  ]
})
export class ProductsApiModule {}
