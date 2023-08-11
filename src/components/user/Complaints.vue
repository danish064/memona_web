<template>
  <div class="w-1/2 p-4">
    <div>Your Complaints</div>
    <div class="my-6">
      <div class="pl-4 pr-10 text-lg font-medium flex justify-between">
        <div>Sr.</div>
        <div>Title</div>
        <div>Description</div>
        <div>Status</div>
      </div>
      <div class="h-96 overflow-y-scroll">
        <div
          v-for="(complaint, index) in userComplaints"
          class="px-4 py-2 flex justify-between"
        >
          <div>{{ index + 1 }}</div>
          <div>
            {{ complaint.title }}
          </div>
          <div>
            {{ complaint.description }}
          </div>
          <div>
            {{ complaint.status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useGeneralStore } from "@/stores/useGeneral";
import { storeToRefs } from "pinia";
import { ref } from "vue";
useGeneralStore().getUserComplaints();
const { user, userComplaints } = storeToRefs(useGeneralStore());
// const complaints = ref([]);
// console.log(user);
// console.log(response);
// complaints.value = response.data;
</script>
