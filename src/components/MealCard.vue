<script setup lang="ts">
import { ref, onMounted } from "vue";

import type { Meal } from "@/app";

import { getMealInfo } from "@/api/spoonacular";

import Card from "primevue/card";

const props = defineProps<{
  mealId: number;
}>();

const meal = ref<Meal | null>(null);

onMounted(() => {
  getMealInfo(props.mealId).then((data) => {
    meal.value = data;
  });
});
</script>

<template>
  <Card style="width: 25em">
    <template #header>
      <img :src="meal?.image" style="height: 15rem" />
    </template>
    <template #title> {{ meal?.title }} </template>
    <template #subtitle> Credits: {{ meal?.creditsText }} </template>
    <template #content>
      <p>Ready in {{ meal?.readyInMinutes }} minutes</p>
      <p v-html="meal?.summary"></p>
    </template>
    <template #footer>
      {{ meal?.dishTypes.join(", ") }}
    </template>
  </Card>
</template>

<style></style>
