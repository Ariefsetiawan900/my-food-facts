export interface IProduct {
  _id: number;
  image_url: string;
  allergens_from_ingredients: string;
  product_name: string;
}

export interface ApiResponse {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: IProduct[];
}
