<template>
  <div class="mx-auto w-1/2 p-4">
    <div v-if="complaint" class="text-center">
      <div class="flex items-center justify-center">
        <button
          @click="$router.push('/technician/complaints')"
          class="px-2 py-1 rounded-lg border border-black bg-primary hover:bg-orange-200"
        >
          back
        </button>
        <div class="uppercase text-4xl font-medium p-10">
          {{ complaint.title }}
        </div>
        <div
          class="flex items-center gap-x-2 p-2 rounded-lg border border-slate-600"
          :class="
            complaint.status === 'pending' ? 'bg-primary' : 'bg-green-400'
          "
        >
          <div class="flex flex-col justify-between">
            <div class="text-slate-700 font-bold cursor-default">Status</div>
            <div class="cursor-default">
              {{ complaint.status }}
            </div>
          </div>
          <button
            v-if="complaint.status === 'pending'"
            class="text-white px-2 h-8 hover:bg-gray-600 text-[10px] bg-filler rounded-xl"
            @click="markComplaintAsComplete(complaint.complaint_id)"
          >
            Mark as Complete
          </button>
        </div>
      </div>
      <div class="border border-filler rounded-full p-6">
        {{ complaint.description }}
      </div>
      <div class="mt-10">
        <div class="font-medium text-xl">Respond to the complaint</div>
        <textarea
          v-model="response"
          class="w-full max-h-20 my-6 p-4 rounded border border-filler outline-none"
          placeholder="Enter your message here"
        />
        <button
          @click="sendResponse"
          class="px-4 py-2 rounded-lg text-white bg-filler hover:bg-gray-600"
        >
          Send
        </button>
      </div>
      <Responses :response="complaint.response" />
    </div>
    <div v-else>Complaint page</div>
  </div>
</template>
<script setup>
import Responses from "@/components/technician/Responses.vue";
import { useGeneralStore } from "@/stores/useGeneral";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const $route = useRoute();
const $router = useRouter();
const { user, userComplaints } = storeToRefs(useGeneralStore());
await useGeneralStore().getTechnicianComplaints();
const complaint = ref(null);
complaint.value = userComplaints.value.find((complaint) => {
  return complaint.complaint_id === Number($route.params.id);
});
const response = ref("");
const markComplaintAsComplete = async () => {
  console.log("Marking complaint as complete");
  // useGeneralStore().markComplaintAsComplete(complaint.value.complaint_id);
  // $router.push("/technician/complaints");
  const apiResp = await fetch(
    `http://localhost:3001/api/technician/complaints/mark_complete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        complaint_id: complaint.value.complaint_id,
      }),
    }
  );
};
const sendResponse = async () => {
  console.log("Sending response");
  const apiResp = await fetch(
    `http://localhost:3001/api/technician/complaints/response`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        complaint_id: complaint.value.complaint_id,
        response: response.value,
      }),
    }
  );
  $router.push("/technician/complaints");
};
</script>
