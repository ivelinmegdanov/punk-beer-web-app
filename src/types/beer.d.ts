export interface Beer {
  id: number;
  name: string;
  image_url: string;
  brewery: string;
  alcoholPercentage: number;
  beerType: string;
  price: number;
  averageRating?: number;
}
