import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Category, Product } from '../../../shared/types';

@Component({
  selector: 'dashboard-update-product-form',
  imports: [],
  templateUrl: './update-product-form.component.html',
  styles: ``,
})
export class UpdateProductFormComponent {
  @Input() product!: Product;
  @Input() categories: Category[] = [];
  @Output() updateProduct = new EventEmitter<Product>();

  @ViewChild('updateDialog') updateDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('updateForm') updateForm!: ElementRef<HTMLFormElement>;

  onSubmit(event: Event) {
    event.preventDefault();

    const target = event.target as HTMLFormElement | null;
    if (target) {
      const title = (
        this.updateForm.nativeElement.elements.namedItem(
          'title'
        ) as HTMLInputElement
      ).value;
      const description = (
        this.updateForm.nativeElement.elements.namedItem(
          'description'
        ) as HTMLInputElement
      ).value;
      const price = (
        this.updateForm.nativeElement.elements.namedItem(
          'price'
        ) as HTMLInputElement
      ).value;
      const category = (
        this.updateForm.nativeElement.elements.namedItem(
          'category'
        ) as HTMLSelectElement
      ).value as Category;

      this.updateProduct.emit({
        ...this.product,
        title,
        description,
        price: Number(price),
        category,
      });

      this.updateForm.nativeElement.reset();
      this.onCloseDialog();
    }
  }

  onCloseDialog() {
    this.updateDialog.nativeElement.close();
  }

  openDialog() {
    this.updateDialog.nativeElement.showModal();
  }
}
