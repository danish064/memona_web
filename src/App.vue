<template>
  <!-- <div class="p-14 bg-red-700 text-blue-700">tailwind working</div>
  <h1>dasd</h1>
  <div class="text-red-700 bg-slate-700">should be red</div> -->
  <Navbar />
  <div class="mt-16">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped></style>
