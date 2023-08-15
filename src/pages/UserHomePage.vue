<template>
  <div class="flex flex-col items-center">
    <div class="text-white text-4xl p-10 hover:italic cursor-pointer">
      Hello {{ user.username }}
    </div>
    <!-- <div>{{ user.role }}</div> -->
    <!-- <UserComplaints /> -->
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useGeneralStore } from "@/stores/useGeneral";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useGeneralStore());
</script>
<style scoped></style>
