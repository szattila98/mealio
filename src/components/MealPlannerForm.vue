<script setup lang="ts">
import { ref } from "vue";

import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

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

const emit = defineEmits<{
  (e: "meal-plan", info: MealPlanInfo): void;
}>();

const toast = useToast();

function emitMealPlan() {
  let errMsg = "";
  if (
    mealPlanInfo.value.targetCalories < 1200 ||
    mealPlanInfo.value.targetCalories > 12000
  ) {
    errMsg = "Target calories must be between 1200 and 12000!";
  }
  if (!errMsg) {
    emit("meal-plan", mealPlanInfo.value);
  } else {
    toast.add({
      severity: "error",
      summary: "Invalid target calories!",
      detail: errMsg,
      life: 5000,
    });
  }
}
</script>

<template>
  <Toast position="bottom-right" />
  <div>
    <div class="grid p-fluid">
      <div class="col-6 col-offset-3 p-fluid grid formgrid">
        <div class="field col-12">
          <span class="p-float-label">
            <InputNumber
              id="targetCalories"
              v-model="mealPlanInfo.targetCalories"
              mode="decimal"
              v-tooltip.left.focus="'Should be between 1200 and 12000'"
            />
            <label for="targetCalories" class="text-lg"
              ><b>Target Calories</b></label
            >
          </span>
        </div>
      </div>

      <div
        class="col-6 col-offset-3 flex xl:justify-content-evenly xl:flex-row lg:justify-content-evenly lg:flex-row flex-column align-items-center flex-wrap"
      >
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

      <div class="col-6 col-offset-3 flex justify-content-center">
        <Button
          label="Generate plan"
          icon="pi pi-search"
          @click="emitMealPlan"
          class="p-button-outlined w-max"
        />
      </div>
    </div>
  </div>
</template>

<style>
.p-tooltip-text {
  text-align: center;
}
</style>
