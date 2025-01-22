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
  selector: 'dashboard-create-product-form',
  imports: [],
  templateUrl: './create-product-form.component.html',
  styles: ``,
})
export class CreateProductFormComponent {
  @Input() categories: Category[] = [];
  @Output() createProduct = new EventEmitter<Omit<Product, 'id'>>();

  @ViewChild('crudModal') crudModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('createForm') createForm!: ElementRef<HTMLFormElement>;

  async onSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement | null;
    if (target) {
      console.log((target[0] as HTMLInputElement).value);

      const title = (target[0] as HTMLInputElement).value;
      const description = (target[1] as HTMLInputElement).value;
      const price = Number((target[2] as HTMLInputElement).value);
      const category = (target[3] as HTMLSelectElement).value as Category;
      const imageInput = target[4] as HTMLInputElement;
      const imageFile = imageInput && imageInput.files ? imageInput.files[0] : null;
      const image = imageFile ? await this.convertToBase64(imageFile): 'https://i.pravatar.cc/'

      this.createProduct.emit({
        title,
        description,
        price,
        category,
        rating: {
          rate: 0,
          count: 0,
        },
        image,
      });
      
      this.resetForm();
      this.closeModal();
    }
  }

  resetForm() {
    const form = this.createForm.nativeElement;
    form.reset();  
  }

  openModal() {
    const modal = this.crudModal.nativeElement;
    modal.showModal();
  }

  closeModal() {
    const modal = this.crudModal.nativeElement;
    modal.close();
  }

  convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
}
