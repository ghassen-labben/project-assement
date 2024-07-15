import { Review } from "./review";


export class Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  reviews?: Review[];
  constructor(id: number, name: string, imageUrl: string, price: number, reviews?: Review[]) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
    this.reviews = reviews;
  }
}
