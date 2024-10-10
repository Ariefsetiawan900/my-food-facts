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

export interface INutriments {
  bicarbonate: number;
  bicarbonate_100g: number;
  bicarbonate_label: string;
  bicarbonate_serving: number;
  bicarbonate_unit: string;
  bicarbonate_value: number;
  calcium: number;
  calcium_100g: number;
  calcium_label: string;
  calcium_serving: number;
  calcium_unit: string;
  calcium_value: number;
  carbohydrates: number;
  carbohydrates_100g: number;
  carbohydrates_serving: number;
  carbohydrates_unit: string;
  carbohydrates_value: number;
  'carbon-footprint-from-known-ingredients_product': number;
  chloride: number;
  chloride_100g: number;
  chloride_label: string;
  chloride_serving: number;
  chloride_unit: string;
  chloride_value: number;
  energy: number;
  'energy-kcal': number;
  'energy-kcal_100g': number;
  'energy-kcal_serving': number;
  'energy-kcal_unit': string;
  'energy-kcal_value': number;
  'energy-kcal_value_computed': number;
  'energy-kj': number;
  'energy-kj_100g': number;
  'energy-kj_serving': number;
  'energy-kj_unit': string;
  'energy-kj_value': number;
  'energy-kj_value_computed': number;
  energy_100g: number;
  energy_serving: number;
  energy_unit: string;
  energy_value: number;
  fat: number;
  fat_100g: number;
  fat_serving: number;
  fat_unit: string;
  fat_value: number;
  fiber: number;
  fiber_100g: number;
  fiber_serving: number;
  fiber_unit: string;
  fiber_value: number;
  fluoride: number;
  fluoride_100g: string;
  fluoride_label: string;
  fluoride_serving: number;
  fluoride_unit: string;
  fluoride_value: number;
  'fruits-vegetables-legumes-estimate-from-ingredients_100g': number;
  'fruits-vegetables-legumes-estimate-from-ingredients_serving': number;
  'fruits-vegetables-nuts-estimate-from-ingredients_100g': number;
  'fruits-vegetables-nuts-estimate-from-ingredients_serving': number;
  magnesium: number;
  magnesium_100g: number;
  magnesium_label: string;
  magnesium_serving: number;
  magnesium_unit: string;
  magnesium_value: number;
  nitrate: string;
  nitrate_100g: number;
  nitrate_label: string;
  nitrate_modifier: string;
  nitrate_serving: number;
  nitrate_unit: string;
  nitrate_value: number;
  'nova-group': number;
  'nova-group_100g': number;
  'nova-group_serving': number;
  'nutrition-score-fr': number;
  'nutrition-score-fr_100g': number;
  potassium: number;
  potassium_100g: number;
  potassium_label: string;
  potassium_serving: number;
  potassium_unit: string;
  potassium_value: number;
  proteins: number;
  proteins_100g: number;
  proteins_serving: number;
  proteins_unit: string;
  proteins_value: number;
  salt: number;
  salt_100g: number;
  salt_serving: number;
  salt_unit: string;
  salt_value: number;
  'saturated-fat': number;
  'saturated-fat_100g': number;
  'saturated-fat_serving': number;
  'saturated-fat_unit': string;
  'saturated-fat_value': number;
  silica: number;
  silica_100g: number;
  silica_label: string;
  silica_serving: number;
  silica_unit: string;
  silica_value: number;
  sodium: number;
  sodium_100g: number;
  sodium_serving: number;
  sodium_unit: string;
  sodium_value: number;
  sugars: number;
  sugars_100g: number;
  sugars_serving: number;
  sugars_unit: string;
  sugars_value: number;
  sulphate: number;
  sulphate_100g: number;
  sulphate_label: string;
  sulphate_serving: number;
  sulphate_unit: string;
  sulphate_value: number;
}

export interface INutriscoreData {
  energy: number;
  energy_points: number;
  energy_value: number;
  fiber: number;
  fiber_points: number;
  fiber_value: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils_points: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils_value: number;
  grade: string;
  is_beverage: number;
  is_cheese: number;
  is_fat: number;
  is_water: number;
  negative_points: number;
  positive_points: number;
  proteins: number;
  proteins_points: number;
  proteins_value: number;
  saturated_fat: number;
  saturated_fat_points: number;
  saturated_fat_value: number;
  score: number;
  sodium: number;
  sodium_points: number;
  sodium_value: number;
  sugars: number;
  sugars_points: number;
  sugars_value: number;
}
export interface IProductDetail {
  product_name: string;
  image_url: string;
  ingredients_text_with_allergens_en: string;
  nova_groups_tags: string[];
  nutrient_levels: {
    fat: string;
    salt: string;
    'saturated-fat': string;
    sugars: string;
  };
  nutriments: INutriments;
  nutriscore: {
    '2021': {
      grade: string;
      score: number;
    };
    '2023': {
      grade: string;
      score: number;
    };
  };
  nutriscore_data: INutriscoreData;
}
export interface ApiResponseDetail {
  code: string;
  product: IProductDetail;
}
