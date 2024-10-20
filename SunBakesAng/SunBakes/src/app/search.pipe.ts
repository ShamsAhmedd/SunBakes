import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[], term:string): Product[] {

      if (!products || !term) {
        return products;
      }
      return products.filter(product =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
    }
  }
