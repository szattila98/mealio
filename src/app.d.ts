export interface MealPlan {
  meals: PlannedMeal[];
  nutrients: Nutrients;
}

export interface Nutrients {
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
}

export interface PlannedMeal {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}
