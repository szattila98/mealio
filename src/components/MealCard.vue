<script setup lang="ts">
import type { DetailedMeal } from "@/app";
import { ref } from "vue";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Skeleton from "primevue/skeleton";

defineProps<{
  meal: DetailedMeal;
  isSelected: boolean;
}>();

defineEmits<{
  (e: "card-click", meal: DetailedMeal): void;
}>();

const imgLoaded = ref<boolean>(false);

function onImgLoad() {
  imgLoaded.value = true;
}
</script>

<template>
  <div
    @click="$emit('card-click', meal)"
    v-tooltip.bottom="{ value: 'Click for details!', disabled: isSelected }"
  >
    <Card
      class="border-1 shadow-3"
      :class="{ card: !isSelected, cardSelected: isSelected }"
    >
      <template #header>
        <img
          :src="meal.image"
          style="height: 15em"
          @load="onImgLoad()"
          v-show="imgLoaded"
        />
        <Skeleton height="15em" v-show="!imgLoaded" />
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
.card {
  width: 25em;
  height: 36em;
  cursor: pointer;
}

.card:hover {
  background-color: var(--surface-hover);
}

.cardSelected {
  width: 25em;
  height: 36em;
  background-color: var(--surface-hover);
  cursor: pointer;
}
</style>
