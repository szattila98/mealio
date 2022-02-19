<script setup lang="ts">
import type { DetailedMeal } from "@/app";
import Card from "primevue/card";
import Tag from "primevue/tag";

defineProps<{
  meal: DetailedMeal;
}>();

defineEmits<{
  (e: "card-click", meal: DetailedMeal): void;
}>();
</script>

<template>
  <div @click="$emit('card-click', meal)">
    <Card style="width: 25em" class="border-1">
      <template #header>
        <img :src="meal.image" style="height: 15rem" />
      </template>
      <template #title> {{ meal.title }} </template>
      <template #subtitle>
        <a :href="meal.sourceUrl" target="_blank">{{ meal.creditsText }}</a>
      </template>
      <template #content>
        Ready in <b>{{ meal.readyInMinutes }}</b> minutes -
        <b>{{ meal.servings }}</b> servings
      </template>
      <template #footer>
        <div class="flex align-content-between flex-wrap">
          <Tag
            v-for="(dishType, index) in meal.dishTypes"
            :value="dishType"
            v-bind:key="index"
            class="flex align-items-center justify-content-center bottom-0 m-1"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style>
.p-card-footer {
  line-height: 10%;
}
</style>
