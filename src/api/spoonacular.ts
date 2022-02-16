import type { MealPlan } from "@/app";

import axios from "@/config/axios.config";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

export const getMealPlan = async (
  targetCalories: number,
  diet = ""
): Promise<MealPlan> => {
  let url = "";
  if (diet) {
    url = `/mealplanner/generate?apiKey=${apiKey}&targetCalories=${targetCalories}&diet=${diet}&timeFrame=day}`;
  } else {
    url = `/mealplanner/generate?apiKey=${apiKey}&targetCalories=${targetCalories}&timeFrame=day}`;
  }
  const res = await axios.get<MealPlan>(url);
  return res.data;
};
