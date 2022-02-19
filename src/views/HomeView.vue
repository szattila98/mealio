<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import MealPlannerForm from "@/components/MealPlannerForm.vue";
import MealCard from "@/components/MealCard.vue";
import { useMeals } from "@/stores/mealStore";
import { getMealInfoBulk, getMealPlan } from "@/api/spoonacular";

const showForm = ref<boolean>(true);

const mealStore = useMeals();

function toggleShowForm() {
  showForm.value = !showForm.value;
}

function deleteMenu() {
  mealStore.$reset();
  showForm.value = true;
}

function fetch_meals(targetCalories: number, menuOption: string) {
  showForm.value = false;
  mealStore.$reset();
  getMealPlan(targetCalories, menuOption)
    .then((data) => {
      mealStore.plannedMeals = data;
    })
    .then(() => {
      if (mealStore.ids) {
        getMealInfoBulk(mealStore.ids).then((data) => {
          mealStore.detailedMeals = data;
        });
      }
    });
}
</script>

<template>
  <div
    class="flex flex-row flex-wrap xl:justify-content-start lg:justify-content-start justify-content-center"
  >
    <Button
      icon="pi pi-list"
      class="p-button-rounded p-button-success m-2"
      v-if="showForm && mealStore.detailedMeals"
      @click="toggleShowForm"
    />
    <Button
      icon="pi pi-arrow-left"
      class="p-button-rounded m-2"
      v-if="!showForm"
      @click="toggleShowForm"
    />
    <Button
      icon="pi pi-trash"
      class="p-button-rounded p-button-danger m-2"
      v-if="mealStore.detailedMeals"
      @click="deleteMenu"
    />
  </div>

  <div v-if="showForm">
    <MealPlannerForm
      @meal-plan="
        (mealPlanInfo) => {
          fetch_meals(mealPlanInfo.targetCalories, mealPlanInfo.menuOption);
        }
      "
    />
  </div>

  <div v-else>
    <div
      class="col-8 col-offset-2 flex justify-content-between flex-wrap"
      v-if="mealStore.plannedMeals?.nutrients"
    >
      <span
        ><b>Calories:</b>
        {{ mealStore.plannedMeals.nutrients.calories }} kcal</span
      >
      <span
        ><b>Carbohydrates:</b>
        {{ mealStore.plannedMeals.nutrients.carbohydrates }}g</span
      >
      <span><b>Fat:</b> {{ mealStore.plannedMeals.nutrients.fat }}g</span>
      <span
        ><b>Protein:</b> {{ mealStore.plannedMeals.nutrients.protein }}g</span
      >
    </div>

    <div
      class="col-10 col-offset-1 flex justify-content-center flex-wrap"
      v-if="mealStore.detailedMeals"
    >
      <MealCard
        class="m-3"
        v-for="(meal, index) in mealStore.detailedMeals"
        v-bind:key="index"
        :meal="meal"
      />
    </div>
  </div>
</template>
