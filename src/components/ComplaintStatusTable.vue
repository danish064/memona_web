<template>
  <div
    class="flex flex-col text-white text-lg bg-filler p-4 w-1/3 rounded-md"
    id="comp_table"
  >
    <!-- <div>You have {{ userComplaints.length }}</div> -->
    <div>
      <div>Total Complaints:</div>
      <div>{{ userComplaints.length }}</div>
    </div>
    <div>
      <div>Pending:</div>
      <div>
        {{
          userComplaints.filter((complaint) => {
            complaint.status === "pending";
          }).length
        }}
      </div>
    </div>

    <div>
      <div>In Progress:</div>
      <div>
        {{
          userComplaints.filter((complaint) => {
            complaint.status === "assigned";
          }).length
        }}
      </div>
    </div>
    <div>
      <div>Resolved:</div>
      <div>
        {{
          userComplaints.filter((complaint) => {
            complaint.status === "completed";
          }).length
        }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useGeneralStore } from "@/stores/useGeneral";
import { storeToRefs } from "pinia";
const { user, userComplaints } = storeToRefs(useGeneralStore());
</script>
<style lang="postcss" scoped>
#comp_table {
  > div {
    @apply w-full flex justify-center items-center p-2;
    > div {
      @apply w-1/2;
    }
    &:nth-child(odd) {
      @apply bg-gray-600;
    }
  }
}
</style>
