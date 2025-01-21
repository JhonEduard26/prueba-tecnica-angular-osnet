import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Product } from '../../../shared/types';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { CategoryDistributionComponent } from "../../components/category-distribution/category-distribution.component";
import { PriceByCategoryComponent } from "../../components/price-by-category/price-by-category.component";
import { RatingDistributionComponent } from "../../components/rating-distribution/rating-distribution.component";

@Component({
  selector: 'dashboard-charts-page',
  imports: [LoaderComponent, CategoryDistributionComponent, PriceByCategoryComponent, RatingDistributionComponent],
  templateUrl: './charts-page.component.html',
  styles: ``,
})
export class ChartsPageComponent implements OnInit {
  private apiService = inject(ApiService);
  public products = signal<Product[]>([]);

  ngOnInit(): void {
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
