<template>
  <div class="py-10 flex flex-col items-center">
    <div class="text-4xl font-medium">Technician</div>
    <div v-if="!user.has_category">
      <SelectCategory />
    </div>
    <div v-else>assigned</div>
  </div>
</template>
<script setup>
import SelectCategory from "../components/technician/SelectCategory.vue";
import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/useGeneral";
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
const router = useRouter();
const userTitle = ref("");
const responsejson = ref([]);
const { user } = storeToRefs(useGeneralStore());
</script>
<style scoped></style>
