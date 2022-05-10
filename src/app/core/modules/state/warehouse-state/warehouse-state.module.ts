import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { WarehouseSelectors } from './selectors/warehouse.selectors';
import { warehouseReducer } from './reducer/warehouse.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WarehouseEffects } from './effects/warehouse.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(WarehouseSelectors.FEATURE_KEY, warehouseReducer),
    EffectsModule.forFeature([WarehouseEffects])
  ]
})
export class WarehouseStateModule {}
