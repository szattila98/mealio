<script setup lang="ts">
import type { DetailedMeal } from "@/app";

import Card from "primevue/card";

defineProps<{
  meal: DetailedMeal;
}>();
</script>

<template>
  <Card style="width: 25em">
    <template #header>
      <img :src="meal.image" style="height: 15rem" />
    </template>
    <template #title> {{ meal.title }} </template>
    <template #subtitle> Credits: {{ meal.creditsText }} </template>
    <template #content>
      <p>Ready in {{ meal.readyInMinutes }} minutes</p>
      <p v-html="meal.summary"></p>
    </template>
    <template #footer>
      {{ meal.dishTypes.join(", ") }}
    </template>
  </Card>
</template>

<style></style>
