<template>
  <div class="pt-20">
    <div class="mx-auto w-1/2 p-4 bg-secondary rounded-3xl text-white">
      <div v-if="complaint" class="text-center">
        <div class="flex items-center justify-center">
          <button
            @click="$router.push('/staff/complaints')"
            class="px-2 py-1 rounded-lg border border-white hover:font-medium hover:border-2"
          >
            back
          </button>
          <div class="uppercase text-4xl font-medium p-10">
            {{ complaint.title }}
          </div>
          <div
            class="p-2 rounded-lg border border-slate-600 flex flex-col justify-between"
          >
            <div class="font-bold">Status</div>
            <div>{{ complaint.status }}</div>
          </div>
        </div>
        <div class="border border-filler rounded-full p-6">
          {{ complaint.description }}
        </div>
      </div>
      <div v-else>Complaint page</div>
    </div>
  </div>
</template>
<script setup>
import { useGeneralStore } from "@/stores/useGeneral";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const $route = useRoute();
const $router = useRouter();
const { user, userComplaints } = storeToRefs(useGeneralStore());
await useGeneralStore().getUserComplaints();
const complaint = ref(null);
complaint.value = userComplaints.value.find((complaint) => {
  return complaint.complaint_id === Number($route.params.id);
});
</script>
