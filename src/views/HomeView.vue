<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Dialog from "primevue/dialog";
import ScrollTop from "primevue/scrolltop";
import Skeleton from "primevue/skeleton";
import MealPlannerForm from "@/components/MealPlannerForm.vue";
import MealCard from "@/components/MealCard.vue";
import MealDetails from "../components/MealDetails.vue";
import { useMeals } from "@/stores/mealStore";
import {
  getMealPlan,
  getMealInfoBulk,
  getNutritionWidgetHtml,
} from "@/api/spoonacular";
import type { DetailedMeal } from "@/app";
import { useErrors } from "@/stores/errorStore";

const showForm = ref<boolean>(true);
const mealDetailToShow = ref<DetailedMeal | null>(null);

const errorStore = useErrors();
const mealStore = useMeals();

function toggleShowForm() {
  showForm.value = !showForm.value;
}

function deleteMenu() {
  mealStore.$reset();
  showForm.value = true;
  mealDetailToShow.value = null;
}

function fetch_meals(targetCalories: number, menuOption: string) {
  mealDetailToShow.value = null;
  showForm.value = false;
  mealStore.$reset();
  getMealPlan(targetCalories, menuOption)
    .then((data) => {
      mealStore.plannedMeals = data;
    })
    .then(() => {
      if (mealStore.ids) {
        getMealInfoBulk(mealStore.ids)
          .then((data) => {
            mealStore.detailedMeals = data;
          })
          .catch((err) => {
            if (err.response.status === 402) {
              errorStore.quotaExceededApiError = true;
            }
          });
      }
    })
    .catch((err) => {
      if (err.response.status === 402) {
        errorStore.quotaExceededApiError = true;
      }
    });
}

function showDetails(meal: DetailedMeal) {
  if (mealDetailToShow.value === meal) {
    mealDetailToShow.value = null;
  } else {
    if (!meal.nutritionWidgetHtml) {
      getNutritionWidgetHtml(meal.id)
        .then((data) => (meal.nutritionWidgetHtml = data))
        .catch((err) => {
          if (err.response.status === 402) {
            errorStore.quotaExceededApiError = true;
          }
        });
    }
    mealDetailToShow.value = meal;
    setTimeout(() => scrollDown(), 50);
  }
}

function scrollDown() {
  window.scroll({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <ScrollTop icon="pi pi-arrow-up" />
  <div
    class="flex flex-row flex-wrap xl:justify-content-start lg:justify-content-start justify-content-center ml-3 fadein"
  >
    <Button
      icon="pi pi-list"
      class="p-button-rounded p-button-success m-2"
      v-if="showForm && mealStore.detailedMeals"
      @click="toggleShowForm"
      v-tooltip.top="'To meals'"
    />
    <Button
      icon="pi pi-arrow-left"
      class="p-button-rounded m-2"
      v-if="!showForm"
      @click="toggleShowForm"
      v-tooltip.top="'To planning'"
    />
    <Button
      icon="pi pi-trash"
      class="p-button-rounded p-button-danger m-2"
      v-if="mealStore.detailedMeals"
      @click="deleteMenu"
      v-tooltip.top="'Delete plan'"
    />
  </div>

  <div v-if="showForm" class="mt-6 fadein">
    <MealPlannerForm
      @meal-plan="
        (mealPlanInfo) => {
          fetch_meals(mealPlanInfo.targetCalories, mealPlanInfo.menuOption);
        }
      "
    />
  </div>

  <div v-else class="fadein">
    <div>
      <div
        class="col-8 col-offset-2 flex justify-content-between flex-wrap nutrients"
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
      <div v-else class="col-8 col-offset-2">
        <Skeleton />
      </div>
    </div>

    <div>
      <div
        v-if="mealStore.detailedMeals"
        class="col-10 col-offset-1 flex justify-content-center flex-wrap"
      >
        <MealCard
          class="m-3"
          v-for="(meal, index) in mealStore.detailedMeals"
          v-bind:key="index"
          :meal="meal"
          :is-selected="meal.id === mealDetailToShow?.id"
          @card-click="showDetails"
        />
      </div>
      <div
        v-else
        class="col-10 col-offset-1 flex justify-content-center flex-wrap"
      >
        <Skeleton width="25em" height="36em" class="m-3" />
        <Skeleton width="25em" height="36em" class="m-3" />
        <Skeleton width="25em" height="36em" class="m-3" />
      </div>
    </div>

    <div v-if="mealDetailToShow">
      <Divider align="center" layout="horizontal">
        <b>Details</b>
      </Divider>
      <MealDetails :meal="mealDetailToShow" />
    </div>
  </div>

  <Dialog
    header="Fatal Error!"
    v-model:visible="errorStore.quotaExceededApiError"
    :modal="true"
    :draggable="false"
  >
    <div class="flex align-items-center justify-content-center">
      <i class="pi pi-clock mr-3" style="font-size: 2rem" />
      <span
        >Spoonacular free API quota exceeded, sorry for the inconvenience! Check
        back tomorrow!</span
      >
    </div>
  </Dialog>
</template>

<style>
.nutrients {
  font-size: 1.3rem;
}
</style>
