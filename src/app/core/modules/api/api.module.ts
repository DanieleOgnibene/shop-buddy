import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsApiModule } from './products-api/products-api.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsApiModule
  ]
})
export class ApiModule {}
