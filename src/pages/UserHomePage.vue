<template>
  <div class="flex flex-col items-center">
    <div class="text-white text-4xl p-10 hover:italic cursor-pointer">
      Hello {{ user.username }}
    </div>
    <ComplaintStatusTable />
  </div>
</template>
<script setup>
import ComplaintStatusTable from "@/components/ComplaintStatusTable.vue";
import { ref, onMounted } from "vue";
import { useGeneralStore } from "@/stores/useGeneral";
import { storeToRefs } from "pinia";
const { user, userComplaints } = storeToRefs(useGeneralStore());
</script>
<style lang="postcss" scoped></style>
