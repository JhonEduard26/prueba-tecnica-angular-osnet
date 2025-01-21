import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category, Product } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://fakestoreapi.com';
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/products/categories`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
}
