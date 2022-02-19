import type { MealPlan, Nutrients, DetailedMeal } from "@/app";
import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useMeals = defineStore("mealStore", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      plannedMeals: undefined as MealPlan | undefined,
      detailedMeals: undefined as DetailedMeal[] | undefined,
    };
  },
  getters: {
    nutrients: (state): Nutrients | undefined => state.plannedMeals?.nutrients,
    ids: (state): number[] | undefined =>
      state.plannedMeals?.meals.map((meal) => meal.id),
  },
});
