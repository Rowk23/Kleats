import {ProductDTO} from './ProductDTO';

export interface RequestDTO{
  products: ProductDTO[],
  currency: string
}
