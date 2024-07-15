import { Component, OnInit } from '@angular/core';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-latest-ratings',
  templateUrl: './latest-ratings.component.html',
  styleUrls: ['./latest-ratings.component.scss']
})
export class LatestRatingsComponent implements OnInit {
reviews: Review[]=[];
constructor(private ratingService:ReviewService,private productService:ProductService){}
  ngOnInit(): void {
    this.getLatestReviews()
  }
getLatestReviews()
{
  this.ratingService.getLatest().subscribe((data)=>{
    this.reviews=data
  })
}
}
