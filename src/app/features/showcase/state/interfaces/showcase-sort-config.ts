import { Product } from '../../../../core/modules/api/products-api/interfaces/product';

export interface ShowcaseSortConfig {
  field: keyof Omit<Product, 'image'>;
  direction: 'asc' | 'desc';
}
