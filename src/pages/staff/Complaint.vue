<template>
  <div class="mx-auto w-1/2 p-4">
    <div v-if="complaint" class="text-center">
      <div class="flex items-center justify-center">
        <div class="uppercase text-4xl font-medium p-10">
          {{ complaint.title }}
        </div>
        <div class="p-2 border flex flex-col justify-between">
          <div class="text-slate-700 font-bold">Status</div>
          <div>{{ complaint.status }}</div>
        </div>
      </div>
      <div>{{ complaint.description }}</div>
    </div>
    <div v-else>Complaint page</div>
  </div>
</template>
<script setup>
import { useGeneralStore } from "@/stores/useGeneral";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();
const { user, userComplaints } = storeToRefs(useGeneralStore());
await useGeneralStore().getUserComplaints();
const complaint = ref(null);
complaint.value = userComplaints.value.find((complaint) => {
  return complaint.complaint_id === Number($route.params.id);
});
</script>
