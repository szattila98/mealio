<script setup lang="ts">
import { ref } from "vue";

import type { MealPlan } from "@/app";

import { getMealPlan } from "@/api/spoonacular";

import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";

import MealCard from "@/components/MealCard.vue";

const targetCalories = ref<number>(2000);
const menuOption = ref<string>("");
const plannedMeals = ref<MealPlan | null>(null);

function fetch_meals() {
  plannedMeals.value = null;
  getMealPlan(targetCalories.value, menuOption.value).then((data) => {
    plannedMeals.value = data;
  });
}
</script>

<template>
  <div>
    <div class="grid p-fluid">
      <div class="col-6 col-offset-3 p-fluid grid formgrid">
        <div class="field col-12">
          <label for="targetCalories">Target Calories</label>
          <InputNumber
            id="targetCalories"
            v-model="targetCalories"
            mode="decimal"
          />
        </div>
      </div>

      <div class="col-6 col-offset-3 flex justify-content-evenly flex-wrap">
        <div class="field-radiobutton">
          <RadioButton
            id="standard"
            name="standard"
            value=""
            v-model="menuOption"
          />
          <label for="standard">Standard</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            id="vegetarian"
            name="vegetarian"
            value="vegetarian"
            v-model="menuOption"
          />
          <label for="vegetarian">Vegetarian</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            id="vegan"
            name="vegan"
            value="vegan"
            v-model="menuOption"
          />
          <label for="vegan">Vegan</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            id="keto"
            name="keto"
            value="keto"
            v-model="menuOption"
          />
          <label for="ketogenic">Keto</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            id="gluten-free"
            name="gluten-free"
            value="gluten-free"
            v-model="menuOption"
          />
          <label for="gluten-free">Gluten Free</label>
        </div>
      </div>

      <div class="col-6 col-offset-3">
        <Button label="Get meals" @click="fetch_meals" />
      </div>
    </div>

    <div class="col-10 col-offset-1 flex justify-content-center flex-wrap">
      <MealCard
        class="m-3"
        v-for="(meal, index) in plannedMeals?.meals"
        v-bind:key="index"
        :mealId="meal.id"
      />
    </div>
  </div>
</template>

<style></style>
