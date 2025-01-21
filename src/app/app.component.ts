import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { initFlowbite } from 'flowbite';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ApiService } from './shared/services/api.service';
import { Product } from './shared/types';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    ProductCardComponent,
    PaginatorComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private apiService = inject(ApiService);
  products = signal<Product[]>([]);
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
    initFlowbite();
    this.getProducts();
  }

  private getProducts() {
    this.apiService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
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
