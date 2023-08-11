<template>
  <Navbar />
  <!-- <div> -->
    <Suspense>
      <RouterView />
    </Suspense>
  <!-- </div> -->
</template>
<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped></style>
