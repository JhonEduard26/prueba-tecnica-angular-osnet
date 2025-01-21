import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { initFlowbite } from 'flowbite';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ApiService } from './shared/services/api.service';
import { Product } from './shared/types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ProductCardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private apiService = inject(ApiService);
  products = signal<Product[]>([]);

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
}
