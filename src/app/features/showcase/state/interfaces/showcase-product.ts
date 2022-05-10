import { WarehouseProduct } from '../../../../core/modules/state/warehouse-state/interfaces/warehouse-product';

export interface ShowcaseProduct extends WarehouseProduct {
  isFavourite: boolean;
}
