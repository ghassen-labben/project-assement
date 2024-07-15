
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  getLatest() {
    return this.http.get<Review[]>(`${this.baseUrl}/latest`);
  }

  private baseUrl = 'http://localhost:8080/api/reviews'; 

  constructor(private http: HttpClient) { }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}`);
  }

  getReviewById(reviewId: number): Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}/${reviewId}`);
  }

  addReview(productId: number, review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/${productId}`, review);
  }

  updateReview(reviewId: number, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.baseUrl}/${reviewId}`, review);
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${reviewId}`);
  }
}
