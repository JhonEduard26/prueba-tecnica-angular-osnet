import { Component, computed, inject, signal } from '@angular/core';
import { Category, Product } from '../../types';
import { ApiService } from '../../services/api.service';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'shared-home-page',
  imports: [HeaderComponent, ProductCardComponent, PaginatorComponent, LoaderComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
})
export class HomePageComponent {
  private apiService = inject(ApiService);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  currentPage = signal<number>(1);
  pageSize = 5;
  totalPages = computed(() =>
    Math.ceil(this.products().length / this.pageSize)
  );
  currentProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products().slice(startIndex, endIndex);
  });

  ngOnInit(): void {
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

  handlePreviousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  handleNextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }
}
