import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService) {}

  // Array to store all products
  allProducts: Product[] = []

  // Flag to indicate if top-rated filter is active
  topRated: boolean = false;

  // Object to store product ratings
  productRatings: { [key: number]: number } = {};

  // Flag to control mobile menu state
  isMobileMenuOpen: boolean = false;

  ngOnInit(): void {
    // Fetch all products when component initializes
    this.getAll()
  }

  // Fetch all products from the service
  getAll() {
    this.productService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
    });
  }

  // Filter products based on top-rated status
  filterTopRated() {
    if (this.topRated) {
      this.productService.getTopRated().subscribe((data) => {
        this.allProducts = data
      })
    } else {
      this.getAll()
    }
  }

  // Generate an array of strings representing star ratings
  getStarArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return [
      ...Array(fullStars).fill('full'),
      ...Array(halfStar).fill('half'),
      ...Array(emptyStars).fill('empty')
    ];
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

  // Toggle mobile menu visibility
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Close mobile menu
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}