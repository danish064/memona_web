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
        <div v-if="technicians.length > 0" class="py-10">
          <div class="text-2xl mb-6">Assign Technician</div>
          <div class="flex justify-center gap-x-6">
            <select
              v-model="selectedTechnician"
              class="bg-inherit"
              name=""
              id=""
            >
              <option
                v-for="technician in technicians"
                :value="technician.user_id"
              >
                {{ technician.username }}
              </option>
            </select>
            <button
              @click="assignTechnician"
              class="bg-primary px-2 py-1 rounded-lg text-secondary font-medium"
            >
              Assign
            </button>
          </div>
        </div>
        <div v-else>
          <div class="text-2xl py-10 mb-6">No technicians available</div>
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
const selectedTechnician = ref("");
const technicians = await useGeneralStore().getAvailableTechnicians();
selectedTechnician.value = technicians[0].user_id;
// console.log(technicians);
const assignTechnician = async () => {
  let result = await fetch(
    `http://localhost:3001/api/supervisor/assign_technician`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: selectedTechnician.value,
        complaint_id: complaint.value.complaint_id,
      }),
    }
  );
  result = await result.json();
  console.log(result);
  alert("Technician assigned successfully");
};
</script>
