<template>
  <div class="mx-auto w-1/2 p-4 bg-secondary rounded-3xl text-white">
    <div class="text-center text-4xl font-medium p-10">Your Complaints</div>
    <div class="my-6 border border-filler py-4 rounded-xl">
      <div class="pl-4 pr-10 text-lg font-medium flex justify-between">
        <div>Sr.</div>
        <div>Title</div>
        <div>Description</div>
        <div>Type</div>
        <div>Status</div>
      </div>
      <div class="h-96 py-4 overflow-y-auto overflow-x-clip">
        <RouterLink
          :to="`/technician/complaints/${complaint.complaint_id}`"
          as="div"
          v-for="(complaint, index) in userComplaints"
          :class="index % 2 === 0 ? 'bg-secondary' : 'bg-secondary'"
          class="px-4 py-2 flex justify-between hover:bg-gray-500 hover:text-white"
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
          </div>
          <div>
            {{ complaint.status }}
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useGeneralStore } from "@/stores/useGeneral";
import { storeToRefs } from "pinia";
import { ref } from "vue";
await useGeneralStore().getTechnicianComplaints();
await useGeneralStore().getCategories();
const { user, userComplaints, categories } = storeToRefs(useGeneralStore());
// const complaints = ref([]);
// console.log(user);
// console.log(response);
// complaints.value = response.data;
const getCategory = (cat_id) => {
  return categories.value.find((cat) => cat.category_id == cat_id);
};
</script>
<style scoped>
::-webkit-scrollbar {
  width: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px black;  */
  @apply shadow-inner bg-filler rounded-xl;
}
/* Handle */
::-webkit-scrollbar-thumb {
  /* background: red;
    border-radius: 10px; */
  @apply bg-primary rounded-xl;
}
</style>
