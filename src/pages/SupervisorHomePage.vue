<template>
  <div class="py-10 flex flex-col items-center">
    <div
      class="mb-10 p-10 rounded-3xl text-4xl font-medium bg-secondary text-white"
    >
      Hello {{ user.username }}
    </div>
    <ComplaintStatusTable />
  </div>
</template>
<script setup>
import ComplaintStatusTable from "@/components/ComplaintStatusTable.vue";
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
