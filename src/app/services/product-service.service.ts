import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getTopRated() {
         return this.http.get<Product[]>(`${this.baseUrl}/toprated`);

  }

  private baseUrl = 'http://localhost:8080/api/products'; 

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }

  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }
  getAverageReview(productId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average/${productId}`)
  }
}
