<template>
  <div class="flex flex-col items-center">
    <div class="text-4xl p-10 hover:italic cursor-pointer">Hello {{ user.username }}</div>
    <!-- <div>{{ user.role }}</div> -->
    <!-- <UserComplaints /> -->
  </div>
</template>
<script setup>
import UserComplaints from "@/components/user/Complaints.vue";
import { ref, onMounted } from "vue";
import { useGeneralStore } from "@/stores/useGeneral";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useGeneralStore());
</script>
<style scoped></style>
