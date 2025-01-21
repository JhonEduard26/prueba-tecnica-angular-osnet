import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CategoryDistributionComponent } from '../../components/category-distribution/category-distribution.component';
import { ApiService } from '../../../shared/services/api.service';
import { Product } from '../../../shared/types';
import { PriceByCategoryComponent } from '../../components/price-by-category/price-by-category.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { RatingDistributionComponent } from "../../components/rating-distribution/rating-distribution.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [
    NavbarComponent,
    SidebarComponent,
    CategoryDistributionComponent,
    PriceByCategoryComponent,
    LoaderComponent,
    RatingDistributionComponent
],
  templateUrl: './dashboard-page.component.html',
  styles: ``,
})
export class DashboardPageComponent implements OnInit {
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
