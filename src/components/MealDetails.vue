<script setup lang="ts">
import type { DetailedMeal } from "@/app";
import Panel from "primevue/panel";
import Skeleton from "primevue/skeleton";

defineProps<{ meal: DetailedMeal }>();
</script>

<template>
  <div class="grid p-fluid">
    <div
      class="xl:col-8 xl:col-offset-2 lg:col-8 lg:col-offset-2 col-10 col-offset-1 flex justify-content-around align-items-start flex-wrap"
    >
      <div class="flex align-content-around flex-wrap m-2 xl:w-8 lg:w-8 w-full">
        <Panel header="Food info" toggleable class="panel">
          <div class="grid p-fluid">
            <div class="col-6">
              <p v-if="meal.creditsText">
                Source:
                <a :href="meal.sourceUrl" target="_blank">{{
                  meal.creditsText
                }}</a>
              </p>
              <p>
                Servings: <b>{{ meal.servings }}</b>
              </p>
              <p>
                Ready in: <b>{{ meal.readyInMinutes }} minutes</b>
              </p>
              <p>
                Dairy-free: <b>{{ meal.dairyFree ? "Yes" : "No " }}</b>
              </p>
            </div>
            <div class="col-6">
              <p>
                Diets:
                <b>{{
                  meal.diets.length ? meal.diets.join(", ") : "No info found!"
                }}</b>
              </p>
              <p>
                Occasions:
                <b>{{
                  meal.occasions.length
                    ? meal.occasions.join(", ")
                    : "No info found!"
                }}</b>
              </p>
              <p>
                Cuisines:
                <b>{{
                  meal.cuisines.length
                    ? meal.cuisines.join(", ")
                    : "No info found!"
                }}</b>
              </p>
            </div>
          </div>
        </Panel>
        <Panel header="Ingredients" toggleable collapsed class="panel mt-3">
          <p
            v-for="(ingredient, index) in meal.extendedIngredients"
            v-bind:key="index"
          >
            {{ ingredient.original.replace("•", "").trim() }}
          </p>
        </Panel>
        <Panel header="Instructions" toggleable collapsed class="panel mt-3">
          <p v-html="meal.instructions"></p>
        </Panel>
      </div>
      <div class="flex align-items-center justify-content-center mt-2 mb-2">
        <div
          v-if="meal.nutritionWidgetHtml"
          v-html="meal.nutritionWidgetHtml"
        />
        <Skeleton v-else height="700px" width="300px" />
      </div>
    </div>
  </div>
</template>

<style>
.panel {
  width: 100%;
}

.flex-column {
  display: flex;
  flex-wrap: wrap;
}

.flex-column .column-item {
  flex-basis: 100%;
}
.flex-column .column-item:nth-of-type(4),
.flex-column .column-item:nth-of-type(5) {
  flex-basis: 50%;
}
</style>
