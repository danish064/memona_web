<template>
  <div class="mx-auto w-1/2 p-4">
    <div class="text-center text-4xl font-medium p-10">Your Complaints</div>
    <div class="my-6">
      <div class="pl-4 pr-10 text-lg font-medium flex justify-between">
        <div>Sr.</div>
        <div>Title</div>
        <div>Description</div>
        <div>Type</div>
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
            {{ getCategory(complaint.category_id).category_name }}
            <!-- {{ categories.find((cat) => cat.id == complaint.category_id) }} -->
            <!-- {{ complaint.complaint_id }} -->
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
useGeneralStore().getCategories();
const { user, userComplaints, categories } = storeToRefs(useGeneralStore());
// const complaints = ref([]);
// console.log(user);
// console.log(response);
// complaints.value = response.data;
const getCategory = (cat_id) => {
  return categories.value.find((cat) => cat.category_id == cat_id);
};
</script>
