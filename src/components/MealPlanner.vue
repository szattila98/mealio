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
    <h2>Target Calories</h2>
    <div class="grid p-fluid">
      <div class="col-12">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-hashtag"></i>
          </span>
          <InputNumber
            placeholder="Calorie target"
            mode="decimal"
            v-model="targetCalories"
          />
        </div>
      </div>

      <h2>Menu Options</h2>
      <div class="col-12 grid p-fluid">
        <div class="field-radiobutton col">
          <RadioButton
            id="standard"
            name="standard"
            value=""
            v-model="menuOption"
          />
          <label for="standard">Standard</label>
        </div>
        <div class="field-radiobutton col">
          <RadioButton
            id="vegetarian"
            name="vegetarian"
            value="vegetarian"
            v-model="menuOption"
          />
          <label for="vegetarian">Vegetarian</label>
        </div>
        <div class="field-radiobutton col">
          <RadioButton
            id="vegan"
            name="vegan"
            value="vegan"
            v-model="menuOption"
          />
          <label for="vegan">Vegan</label>
        </div>
        <div class="field-radiobutton col">
          <RadioButton
            id="keto"
            name="keto"
            value="keto"
            v-model="menuOption"
          />
          <label for="ketogenic">Keto</label>
        </div>
        <div class="field-radiobutton col">
          <RadioButton
            id="gluten-free"
            name="gluten-free"
            value="gluten-free"
            v-model="menuOption"
          />
          <label for="gluten-free">Gluten Free</label>
        </div>
      </div>

      <div class="col-12">
        <Button label="Get meals" @click="fetch_meals" />
      </div>
    </div>

    <MealCard
      v-for="(meal, index) in plannedMeals?.meals"
      v-bind:key="index"
      :mealId="meal.id"
    />
  </div>
</template>

<style></style>
