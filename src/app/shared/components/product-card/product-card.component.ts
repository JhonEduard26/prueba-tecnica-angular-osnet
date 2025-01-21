import { Component, Input } from '@angular/core';
import { Product } from '../../types';

@Component({
  selector: 'shared-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {
  @Input() product: Product | undefined;
}
