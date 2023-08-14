<template>
  <div class="h-screen" :style="bg_img_style">
    <Navbar />
    <div class="h-[calc(100%_-_80px)]">
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </div>
</template>
<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterLink, RouterView } from "vue-router";

const bg_img = new URL("./assets/images/login_bg.gif", import.meta.url).href;
const bg_img_style = `background-image: url('${bg_img}');background-size: cover;background-position: center;background-repeat: repeat;`;
</script>

<style scoped></style>
