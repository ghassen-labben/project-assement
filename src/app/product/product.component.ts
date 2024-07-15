// Import necessary Angular modules and services
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { ProductService } from '../services/product-service.service';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';

// Define the component
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // Declare component properties
  product!: Product;
  reviewForm: FormGroup;
  editReviewForm: FormGroup;
  isEditModalOpen: boolean = false;
  currentEditingReview: Review | null = null;

  // Inject dependencies in the constructor
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService,
    private fb: FormBuilder
  ) {
    // Initialize review forms
    this.reviewForm = this.createReviewForm();
    this.editReviewForm = this.createReviewForm();
  }

  // Angular lifecycle hook - called after component initialization
  ngOnInit(): void {
    // Subscribe to route parameters to get the product ID
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getProduct(id);
    });
  }

  // Fetch product details by ID
  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      product => {
        this.product = product;
      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }

  // Handle review submission
  onSubmitReview(): void {
    if (this.reviewForm.valid && this.product) {
      // Create a new Review object from form values
      const review = new Review(
        this.reviewForm.get('rating')!.value,
        this.reviewForm.get('reviewSnippet')!.value,
      );

      // Add the review using the review service
      this.reviewService.addReview(this.product.id, review).subscribe(
        addedReview => {
          // Update the product's reviews array
          if (this.product.reviews) {
            this.product.reviews.push(addedReview);
          } else {
            this.product.reviews = [addedReview];
          }
          this.reviewForm.reset();
        },
        error => {
          console.error('Error adding review:', error);
        }
      );
    }
  }

  // Open edit modal for a review
  editReview(review: Review): void {
    this.currentEditingReview = review;
    this.editReviewForm.patchValue({
      rating: review.rating,
      reviewSnippet: review.reviewSnippet
    });
    this.isEditModalOpen = true;
  }

  // Close edit modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.currentEditingReview = null;
    this.editReviewForm.reset();
  }

  // Handle edit review submission
  onSubmitEditReview(): void {
    if (this.editReviewForm.valid && this.currentEditingReview && this.product) {
      // Create updated review object
      const updatedReview = {
        ...this.currentEditingReview,
        ...this.editReviewForm.value,
        updatedate: new Date()
      };

      // Update the review using the review service
      this.reviewService.updateReview(updatedReview.id, updatedReview).subscribe(
        () => {
          // Update the review in the product's reviews array
          const index = this.product.reviews?.findIndex(r => r.id === updatedReview.id);
          if (this.product.reviews && index !== undefined && index !== -1) {
            this.product.reviews[index] = updatedReview;
          }
          this.closeEditModal();
        },
        error => {
          console.error('Error updating review:', error);
        }
      );
    }
  }

  // Delete a review
  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(reviewId).subscribe(
        () => {
          // Remove the deleted review from the product's reviews array
          this.product.reviews = this.product.reviews?.filter(r => r.id !== reviewId);
        },
        error => {
          console.error('Error deleting review:', error);
        }
      );
    }
  }

  // Calculate average rating for a product
  getAverageRating(product: Product): number {
    if (!product.reviews || product.reviews.length === 0) {
      return 0;
    }

    const total = product.reviews
      .map(review => review.rating)
      .reduce((acc, rating) => acc + rating, 0);

    return total / product.reviews.length;
  }

  // Create a FormGroup for reviews
  private createReviewForm(): FormGroup {
    return this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      reviewSnippet: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
}