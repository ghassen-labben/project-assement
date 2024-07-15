import { Product } from "./product";

export class Review {
  id!: number;
  rating: number;
  reviewSnippet: string;
  regdate?:Date;
  updatedate?:Date;

  product?: Product; 
  constructor(rating: number, reviewSnippet: string) {
    this.rating = rating;
    this.reviewSnippet = reviewSnippet;
  }
}
