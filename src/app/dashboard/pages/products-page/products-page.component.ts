import { Component, inject, OnInit, signal } from '@angular/core';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { TableComponent } from '../../components/table/table.component';
import { ApiService } from '../../../shared/services/api.service';
import { Category, Product } from '../../../shared/types';
import { CreateProductFormComponent } from '../../components/create-product-form/create-product-form.component';

@Component({
  selector: 'dashboard-products-page',
  imports: [LoaderComponent, TableComponent, CreateProductFormComponent],
  templateUrl: './products-page.component.html',
  styles: ``,
})
export class ProductsPageComponent implements OnInit {
  private apiService = inject(ApiService);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  private getProducts() {
    this.apiService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (err) => console.error(err),
    });
  }

  private getCategories() {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (err) => console.error(err),
    });
  }

  handleCreateProduct(product: Omit<Product, 'id'>) {
    const newProduct = {
      ...product,
      id: this.products().length + 1,
    };

    this.apiService.createProduct(newProduct).subscribe({
      next: () => {
        this.products.update((products) => [...products, newProduct]);
      },
      error: (err) => console.error(err),
    });
  }

  handleUpdateProduct(product: Product) {
    this.apiService.updateProduct(product).subscribe({
      next: () => {
        this.products.update((products) => {
          const index = products.findIndex((p) => p.id === product.id);
          products[index] = product;
          return products;
        });
      },
      error: (err) => console.error(err),
    });
  }

  handleDeleteProduct(id: number) {
    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        this.products.update((products) => products.filter((p) => p.id !== id));
      },
      error: (err) => console.error(err),
    });
  }
}
