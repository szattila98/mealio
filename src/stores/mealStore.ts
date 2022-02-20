import type { MealPlan, Nutrients, DetailedMeal } from "@/app";
import { defineStore } from "pinia";

export const useMeals = defineStore("mealStore", {
  state: () => {
    return {
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
