import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesStateModule } from './favourites-state/favourites-state.module';
import { WarehouseStateModule } from './warehouse-state/warehouse-state.module';

@NgModule({
  imports: [
    CommonModule,
    FavouritesStateModule,
    WarehouseStateModule
  ]
})
export class StateModule {}
