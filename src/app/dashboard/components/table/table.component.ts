import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Product } from '../../../shared/types';
import { UpdateProductFormComponent } from "../update-product-form/update-product-form.component";
import { ConfirmAlertComponent } from "../confirm-alert/confirm-alert.component";

@Component({
  selector: 'dashboard-table',
  imports: [UpdateProductFormComponent, ConfirmAlertComponent],
  templateUrl: './table.component.html',
  styles: ``,
})
export class TableComponent {
  @Input() products: Product[] = [];
  @Input() categories: Category[] = [];
  @Output() deleteProduct = new EventEmitter<number>();
  @Output() updateProduct = new EventEmitter<Product>();

  onDeleteProduct(id: number) {
    this.deleteProduct.emit(id);
  }

  onUpdateProduct(product: Product) {
    this.updateProduct.emit(product);
  }
}
