import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Product } from '../../../shared/types';

@Component({
  selector: 'dashboard-table',
  imports: [],
  templateUrl: './table.component.html',
  styles: ``,
})
export class TableComponent {
  @Input() products: Product[] = [];
  @Input() categories: Category[] = [];
  @Output() deleteProduct = new EventEmitter<number>();

  onDeleteProduct(id: number) {
    this.deleteProduct.emit(id);
  }
}
