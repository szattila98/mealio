<script setup lang="ts">
import { ref } from "vue";

import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";

enum MenuOption {
  Standard = "",
  Vegetarian = "vegetarian",
  Vegan = "vegan",
  Ketogenic = "ketogenic",
  GlutenFree = "gluten-free",
}

interface MealPlanInfo {
  targetCalories: number;
  menuOption: MenuOption;
}

const mealPlanInfo = ref<MealPlanInfo>({
  targetCalories: 2000,
  menuOption: MenuOption.Standard,
});

defineEmits<{
  (e: "meal-plan", info: MealPlanInfo): void;
}>();
</script>

<template>
  <div>
    <div class="grid p-fluid">
      <div class="col-6 col-offset-3 p-fluid grid formgrid">
        <div class="field col-12">
          <span class="p-float-label">
            <InputNumber
              id="targetCalories"
              v-model="mealPlanInfo.targetCalories"
              mode="decimal"
            />
            <label for="targetCalories"><b>Target Calories</b></label>
          </span>
        </div>
      </div>

      <div class="col-6 col-offset-3 flex justify-content-evenly flex-wrap">
        <div class="field-radiobutton">
          <RadioButton
            id="standard"
            :value="MenuOption.Standard"
            v-model="mealPlanInfo.menuOption"
          />
          <label for="standard">Standard</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            id="vegetarian"
            :value="MenuOption.Vegetarian"
            v-model="mealPlanInfo.menuOption"
          />
          <label for="vegetarian">Vegetarian</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            id="vegan"
            :value="MenuOption.Vegan"
            v-model="mealPlanInfo.menuOption"
          />
          <label for="vegan">Vegan</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            id="ketogenic"
            :value="MenuOption.Ketogenic"
            v-model="mealPlanInfo.menuOption"
          />
          <label for="ketogenic">Keto</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            id="gluten-free"
            :value="MenuOption.GlutenFree"
            v-model="mealPlanInfo.menuOption"
          />
          <label for="gluten-free">Gluten Free</label>
        </div>
      </div>

      <div class="col-6 col-offset-3">
        <Button label="Get meals" @click="$emit('meal-plan', mealPlanInfo)" />
      </div>
    </div>
  </div>
</template>

<style></style>
