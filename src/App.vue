<script setup lang="ts">
import { RouterView } from "vue-router";
import Button from "primevue/button";
</script>

<template>
  <header>
    <div class="flex align-items-center justify-content-center">
      <img src="@/assets/img/logo.svg" alt="Mealio Logo" class="logo" />
      <span class="header-title m-2">Mealio</span>
    </div>
  </header>
  <RouterView />
  <footer class="footer flex justify-content-center">
    <a href="https://spoonacular.com/food-api" target="_blank" class="m-3"
      >Spoonacular API</a
    >
    <a
      href="https://github.com/szattila98/mealio"
      target="_blank"
      style="text-decoration: none"
      class="top-100"
    >
      <Button
        icon="pi pi-github"
        class="p-button-rounded p-button-text p-button-plain"
      />
    </a>
    <a
      href="https://www.linkedin.com/in/szokeattila98"
      target="_blank"
      class="m-3"
      >LinkedIn</a
    >
  </footer>
</template>

<style scoped>
html {
  font-size: 18px;
  background: var(--surface-ground);
}

.logo {
  height: 4em;
  width: 4em;
}

.header-title {
  font-size: 3.5em;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
